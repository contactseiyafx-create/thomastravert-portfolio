"use client";

import { useMemo, useRef, useState } from "react";

const PINK = "#FF2E88";
const CYAN = "#00E5FF";
const XP_PER_LEVEL = 500;

const LEVELS: Record<number, string> = {
  1: "JLPT N5",
  2: "JLPT N4",
  3: "JLPT N4-N3",
  4: "JLPT N3",
  5: "Basic Business Japanese",
  6: "Intermediate Interview Japanese",
  7: "Japanese Company Interview",
  8: "Senior Designer Interview",
  9: "Senior Multimedia Designer Interview",
  10: "Executive / Senior Multimedia Designer Interview",
};

const ACHIEVEMENTS: Record<string, string> = {
  first_interview: "First Interview",
  first_answer: "First Japanese Answer",
  jikoshoukai: "Self Introduction Master",
  branding_vocab: "Branding Vocabulary",
  fluent: "Fluent Response",
  survivor: "Interview Survivor",
  level5: "Business Japanese Unlocked",
  level10: "Senior Multimedia Designer",
};

const STAT_KEYS = [
  "Grammar",
  "Vocabulary",
  "Fluency",
  "Confidence",
  "Business Japanese",
] as const;

type StatKey = (typeof STAT_KEYS)[number];

type JPLine = {
  jp: string;
  furigana?: string;
  romaji?: string;
  en?: string;
};

type SurvivalDictionary = {
  vocab: Array<{ jp: string; furigana: string; en: string }>;
  how_to_answer: string;
  useful_sentences: JPLine[];
  template: { jp: string; en: string };
  emergency: Array<{ jp: string; romaji: string; en: string }>;
  hint: string;
};

type Feedback = {
  answer_echo: string;
  grammar_correction: string;
  natural_version: JPLine;
  professional_version: JPLine;
  vocab: Array<{ jp: string; furigana: string; en: string }>;
  business_phrases: JPLine[];
  pronunciation: JPLine;
  scores: Record<string, number>;
  score_notes: string;
  xp: Partial<Record<"Grammar" | "Vocabulary" | "Confidence", number>>;
  achievements: string[];
  weak_answer: boolean;
  level_up: boolean;
  encouragement: string;
  next_question: JPLine;
  survival_dictionary: SurvivalDictionary;
  offline?: boolean;
};

const FIRST_QUESTION: JPLine = {
  jp: "まず、自己紹介をお願いします。",
  furigana: "まず、自己紹介（じこしょうかい）をお願（ねが）いします。",
  romaji: "Mazu, jikoshoukai o onegai shimasu.",
  en: "First, please introduce yourself.",
};

const FIRST_DICTIONARY: SurvivalDictionary = {
  vocab: [
    { jp: "自己紹介", furigana: "じこしょうかい", en: "Self introduction" },
    { jp: "出身", furigana: "しゅっしん", en: "Origin / hometown" },
    { jp: "経験", furigana: "けいけん", en: "Experience" },
    { jp: "仕事", furigana: "しごと", en: "Work / job" },
    { jp: "デザイナー", furigana: "でざいなー", en: "Designer" },
    { jp: "よろしくお願いします", furigana: "よろしくおねがいします", en: "Pleased to meet you" },
  ],
  how_to_answer:
    "Say your name, where you are from, where you live, and what kind of designer you are. Keep it calm and short.",
  useful_sentences: [
    {
      jp: "私はフランス出身です。",
      furigana: "わたし は ふらんす しゅっしん です。",
      romaji: "Watashi wa Furansu shusshin desu.",
      en: "I am from France.",
    },
    {
      jp: "東京に住んでいます。",
      furigana: "とうきょう に すんで います。",
      romaji: "Tokyo ni sunde imasu.",
      en: "I live in Tokyo.",
    },
    {
      jp: "デザイナーとして働いています。",
      furigana: "でざいなー として はたらいて います。",
      romaji: "Dezaina to shite hataraite imasu.",
      en: "I work as a designer.",
    },
  ],
  template: {
    jp: "私は（国）出身です。\n現在（場所）に住んでいます。\n（職業）として働いています。\n（年数）年間デザインの経験があります。",
    en: "I am from (country).\nI currently live in (location).\nI work as a (job title).\nI have (number) years of design experience.",
  },
  emergency: [
    { jp: "もう一度お願いします。", romaji: "Mo ichido onegai shimasu.", en: "Could you repeat that?" },
    { jp: "ゆっくり話していただけますか？", romaji: "Yukkuri hanashite itadakemasu ka?", en: "Could you speak more slowly?" },
    { jp: "質問が少し難しいです。", romaji: "Shitsumon ga sukoshi muzukashii desu.", en: "The question is a little difficult." },
    { jp: "考える時間をいただけますか？", romaji: "Kangaeru jikan o itadakemasu ka?", en: "May I have a moment to think?" },
  ],
  hint:
    "Japanese recruiters value a structured intro. Lead with identity, then experience, and close with よろしくお願いします.",
};

export function ShinshokuInterviewRPG() {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [stats, setStats] = useState<Record<StatKey, number>>({
    Grammar: 20,
    Vocabulary: 20,
    Fluency: 15,
    Confidence: 25,
    "Business Japanese": 10,
  });
  const [unlocked, setUnlocked] = useState<string[]>(["first_interview"]);
  const [question, setQuestion] = useState<JPLine>(FIRST_QUESTION);
  const [dictionary, setDictionary] = useState<SurvivalDictionary>(FIRST_DICTIONARY);
  const [mission, setMission] = useState("Complete your self-introduction in Japanese.");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [turnCount, setTurnCount] = useState(0);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const statTotal = useMemo(
    () => Math.round(STAT_KEYS.reduce((sum, key) => sum + stats[key], 0) / STAT_KEYS.length),
    [stats]
  );

  const addStat = (key: StatKey, amount: number) => {
    setStats((current) => ({
      ...current,
      [key]: Math.min(100, current[key] + amount),
    }));
  };

  const appendAnswer = (text: string) => {
    setInput((current) => [current.trim(), text.trim()].filter(Boolean).join("\n"));
    window.setTimeout(() => answerRef.current?.focus(), 30);
  };

  const useTemplate = () => {
    const nextTemplate = dictionary.template.jp
      .replace("（国）", "フランス")
      .replace("（場所）", "東京")
      .replace("（職業）", "デザイナー")
      .replace("（年数）", "10")
      .replace("（ポイント）", "デザイン経験")
      .replace("（経験）", "ブランドデザインの経験")
      .replace("（貢献）", "貢献");

    setInput(nextTemplate);
    window.setTimeout(() => answerRef.current?.focus(), 30);
  };

  const resetInterview = () => {
    setLevel(1);
    setXp(0);
    setStats({
      Grammar: 20,
      Vocabulary: 20,
      Fluency: 15,
      Confidence: 25,
      "Business Japanese": 10,
    });
    setUnlocked(["first_interview"]);
    setQuestion(FIRST_QUESTION);
    setDictionary(FIRST_DICTIONARY);
    setMission("Complete your self-introduction in Japanese.");
    setInput("");
    setFeedback(null);
    setError(null);
    setTurnCount(0);
  };

  const speak = (text?: string) => {
    if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  async function submit() {
    if (loading) return;

    const answer = input.trim();
    setLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const response = await fetch("/api/shinshoku", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          levelName: LEVELS[level],
          question,
          answer,
          turnCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Interview API failed");
      }

      const nextFeedback = (await response.json()) as Feedback;
      applyFeedback(nextFeedback);
    } catch {
      setError("The recruiter could not answer right now. Your progress was kept; try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  function applyFeedback(nextFeedback: Feedback) {
    const rewards = nextFeedback.xp || {};
    const grammarXp = Number(rewards.Grammar || 0);
    const vocabXp = Number(rewards.Vocabulary || 0);
    const confidenceXp = Number(rewards.Confidence || 0);
    const totalXp = grammarXp + vocabXp + confidenceXp;

    if (grammarXp) addStat("Grammar", grammarXp);
    if (vocabXp) addStat("Vocabulary", vocabXp);
    if (confidenceXp) addStat("Confidence", confidenceXp);
    if (!nextFeedback.weak_answer) addStat("Fluency", 5);

    let nextXp = xp + totalXp;
    let nextLevel = level;

    if (nextFeedback.level_up || nextXp >= XP_PER_LEVEL) {
      nextLevel = Math.min(10, level + 1);
      nextXp = Math.max(0, nextXp - XP_PER_LEVEL);
      addStat("Business Japanese", 8);
    }

    const nextAchievements = new Set(unlocked);
    nextFeedback.achievements?.forEach((achievement) => {
      if (ACHIEVEMENTS[achievement]) nextAchievements.add(achievement);
    });
    if (turnCount === 0) nextAchievements.add("first_answer");
    if (nextLevel >= 5) nextAchievements.add("level5");
    if (nextLevel >= 10) nextAchievements.add("level10");
    if (turnCount >= 4) nextAchievements.add("survivor");

    setXp(nextXp);
    setLevel(nextLevel);
    setUnlocked([...nextAchievements]);
    setFeedback(nextFeedback);
    setQuestion(nextFeedback.next_question || question);
    setDictionary(nextFeedback.survival_dictionary || dictionary);
    setMission(deriveMission(nextFeedback.next_question));
    setTurnCount((current) => current + 1);
    setInput("");
    window.setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }

  return (
    <div className="min-h-full bg-[#060d1a] text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(900px 460px at 82% 0%, rgba(0,229,255,0.15), transparent 62%), radial-gradient(760px 520px at 10% 16%, rgba(255,46,136,0.16), transparent 66%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-6 px-5 py-7 md:px-8 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <header className="rounded-xl border border-white/10 bg-black/25 p-5 backdrop-blur-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
              Japanese Interview RPG
            </p>
            <h1 className="mt-3 font-sans text-[2.35rem] font-bold uppercase leading-[0.9] tracking-[-0.02em]">
              就活
              <span className="block text-[1.7rem]" style={{ color: PINK }}>
                SHINSHOKU
              </span>
            </h1>
            <p className="mt-4 text-sm leading-6 text-white/66">
              Practice Japanese job interviews for creative roles. Answer, earn XP, unlock harder recruiter questions.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => speak(question.jp)}
                className="rounded-lg border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-[#00E5FF] hover:text-white"
              >
                Listen
              </button>
              <button
                type="button"
                onClick={scrollToBottom}
                className="rounded-lg border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-[#00E5FF] hover:text-white"
              >
                Bottom
              </button>
              <button
                type="button"
                onClick={resetInterview}
                className="col-span-2 rounded-lg border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-[#FF2E88] hover:text-white"
              >
                Reset
              </button>
            </div>
          </header>

          <Panel title="Player Status" accent={CYAN}>
            <div className="flex items-baseline justify-between gap-3">
              <div className="font-mono text-lg font-semibold" style={{ color: CYAN }}>
                LV.{level}
              </div>
              <div className="text-right font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                {LEVELS[level]}
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                <span>XP</span>
                <span>{xp} / {XP_PER_LEVEL}</span>
              </div>
              <Bar value={xp} max={XP_PER_LEVEL} color={PINK} />
            </div>
            <div className="mt-5 space-y-3">
              {STAT_KEYS.map((key) => (
                <div key={key}>
                  <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    <span>{key}</span>
                    <span>{stats[key]}</span>
                  </div>
                  <Bar value={stats[key]} color={CYAN} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Achievements" accent={PINK}>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ACHIEVEMENTS).map(([key, label]) => {
                const active = unlocked.includes(key);
                return (
                  <span
                    key={key}
                    className="rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{
                      borderColor: active ? CYAN : "rgba(255,255,255,0.12)",
                      color: active ? "#fff" : "rgba(255,255,255,0.3)",
                      background: active ? "rgba(0,229,255,0.10)" : "transparent",
                    }}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </Panel>

          <Panel title="Interview Run" accent={CYAN}>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="font-mono text-2xl font-semibold" style={{ color: CYAN }}>
                  {turnCount}
                </div>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
                  answers
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="font-mono text-2xl font-semibold" style={{ color: PINK }}>
                  {unlocked.length}
                </div>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
                  badges
                </p>
              </div>
            </div>
          </Panel>
        </aside>

        <main className="space-y-4 pb-12">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <Panel title="Current Mission" accent={PINK}>
              <p className="text-lg leading-7 text-white">{mission}</p>
            </Panel>
            <Panel title="Readiness" accent={CYAN}>
              <div className="text-5xl font-semibold leading-none" style={{ color: CYAN }}>
                {statTotal}
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Overall score
              </p>
            </Panel>
          </div>

          <SurvivalDictionaryPanel
            data={dictionary}
            onAppend={appendAnswer}
            onTemplate={useTemplate}
            onSpeak={speak}
          />

          <Panel title="Recruiter Question" accent={PINK}>
            <JPBlock data={question} big accent={CYAN} />
          </Panel>

          <Panel title="Your Answer" accent={CYAN}>
            <textarea
              ref={answerRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="日本語で答えてください... romaji is OK too"
              rows={4}
              className="min-h-[120px] w-full resize-y rounded-lg border border-white/10 bg-black/35 px-4 py-3 text-[15px] leading-6 text-white placeholder:text-white/30 focus:border-[#00E5FF] focus:outline-none"
            />
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <button
                type="button"
                onClick={useTemplate}
                disabled={loading}
                className="rounded-lg border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 transition-colors hover:border-[#00E5FF] hover:text-white disabled:opacity-40"
              >
                Use template
              </button>
              <button
                type="button"
                onClick={() => appendAnswer(dictionary.useful_sentences[0]?.jp || "")}
                disabled={loading}
                className="rounded-lg border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 transition-colors hover:border-[#00E5FF] hover:text-white disabled:opacity-40"
              >
                Add phrase
              </button>
              <button
                type="button"
                onClick={() => speak(input || question.jp)}
                disabled={loading}
                className="rounded-lg border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 transition-colors hover:border-[#FF2E88] hover:text-white disabled:opacity-40"
              >
                Read aloud
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={submit}
                disabled={loading}
                className="relative flex-1 overflow-hidden rounded-lg px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#06121f] disabled:cursor-wait disabled:opacity-60"
                style={{ background: `linear-gradient(90deg, ${CYAN}, ${PINK})` }}
              >
                {loading ? "Recruiter is thinking..." : "Submit / 提出"}
              </button>
              <button
                type="button"
                onClick={() => setInput("")}
                disabled={loading}
                className="rounded-lg border border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:border-white/30 hover:text-white disabled:opacity-40"
              >
                Clear
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-white/40">
              Click template, vocab, useful sentences, or emergency answers to build your response faster.
            </p>
          </Panel>

          {error && (
            <Panel title="Connection" accent={PINK}>
              <p className="text-sm leading-6 text-[#ffd6e6]">{error}</p>
            </Panel>
          )}

          {feedback && (
            <section ref={feedbackRef} className="space-y-4 pt-5">
              <div className="text-center font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: CYAN }}>
                Debrief
              </div>
              {feedback.offline && (
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/60">
                  Local training mode is active. Add an Anthropic API key on the server to enable live AI coaching.
                </div>
              )}
              <FeedbackPanel feedback={feedback} />
            </section>
          )}

          <div ref={bottomRef} className="pb-24 pt-8 text-center">
            <button
              type="button"
              onClick={() => answerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
              className="rounded-full border border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:border-[#00E5FF] hover:text-white"
            >
              Back to answer
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function FeedbackPanel({ feedback }: { feedback: Feedback }) {
  return (
    <>
      <Panel title="Your Answer" accent={CYAN}>
        <p className="text-sm leading-6 text-white/80">{feedback.answer_echo || "(blank)"}</p>
      </Panel>
      <Panel title="Grammar Correction" accent={PINK}>
        <p className="text-sm leading-6 text-white/80">{feedback.grammar_correction}</p>
      </Panel>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Natural Japanese" accent={CYAN}>
          <JPBlock data={feedback.natural_version} accent={CYAN} />
        </Panel>
        <Panel title="Professional Version" accent={PINK}>
          <JPBlock data={feedback.professional_version} accent={PINK} />
        </Panel>
      </div>
      <Panel title="Training Notes" accent={CYAN}>
        <div className="grid gap-5 lg:grid-cols-2">
          <VocabTable vocab={feedback.vocab} />
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: PINK }}>
              Business Phrases
            </p>
            <div className="space-y-3">
              {feedback.business_phrases?.map((phrase, index) => (
                <JPBlock key={index} data={phrase} accent={PINK} />
              ))}
            </div>
          </div>
        </div>
      </Panel>
      <Panel title="Performance Review" accent={PINK}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            {Object.entries(feedback.scores || {}).map(([key, value]) => (
              <div key={key}>
                <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  <span>{key}</span>
                  <span>{value}/10</span>
                </div>
                <Bar value={Number(value)} max={10} color={CYAN} />
              </div>
            ))}
          </div>
          <div className="space-y-4 text-sm leading-6 text-white/72">
            <p>{feedback.score_notes}</p>
            <JPBlock data={feedback.pronunciation} accent={CYAN} />
            <p className="italic text-white">{feedback.encouragement}</p>
          </div>
        </div>
      </Panel>
    </>
  );
}

function SurvivalDictionaryPanel({
  data,
  onAppend,
  onTemplate,
  onSpeak,
}: {
  data: SurvivalDictionary;
  onAppend: (text: string) => void;
  onTemplate: () => void;
  onSpeak: (text?: string) => void;
}) {
  return (
    <Panel title="Interview Survival Dictionary" accent={CYAN}>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
        <div className="space-y-5">
          <VocabTable vocab={data.vocab} onAppend={onAppend} />
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: PINK }}>
              How to answer
            </p>
            <p className="text-sm leading-6 text-white/75">{data.how_to_answer}</p>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: PINK }}>
              Useful sentences
            </p>
            <div className="space-y-3">
              {data.useful_sentences.map((sentence, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-black/15 p-3">
                  <JPBlock data={sentence} accent={CYAN} />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onAppend(sentence.jp)}
                      className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:border-[#00E5FF] hover:text-white"
                    >
                      Add to answer
                    </button>
                    <button
                      type="button"
                      onClick={() => onSpeak(sentence.jp)}
                      className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:border-[#FF2E88] hover:text-white"
                    >
                      Listen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: PINK }}>
              Answer template
            </p>
            <div className="grid gap-3">
              <MultiLine text={data.template.jp} strong />
              <MultiLine text={data.template.en} />
              <button
                type="button"
                onClick={onTemplate}
                className="rounded-lg border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 transition-colors hover:border-[#00E5FF] hover:text-white"
              >
                Fill answer with template
              </button>
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: PINK }}>
              Emergency answers
            </p>
            <div className="space-y-3">
              {data.emergency.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onAppend(item.jp)}
                  className="block w-full rounded-lg border border-white/10 bg-black/15 p-3 text-left transition-colors hover:border-[#FF2E88]"
                >
                  <p className="text-sm text-white">{item.jp}</p>
                  <p className="text-xs italic text-white/42">{item.romaji}</p>
                  <p className="text-xs" style={{ color: CYAN }}>{item.en}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border p-4" style={{ borderColor: `${PINK}44`, background: `${PINK}12` }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: PINK }}>
              Interview hint
            </p>
            <p className="mt-2 text-sm leading-6 text-white/82">{data.hint}</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Panel({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-xl border bg-[#081426]/80 p-5 shadow-2xl backdrop-blur-md"
      style={{ borderColor: `${accent}33`, boxShadow: `0 20px 60px rgba(0,0,0,0.25)` }}
    >
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-3">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Bar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="h-2.5 overflow-hidden rounded-sm border border-white/10 bg-white/[0.06]">
      <div
        className="h-full rounded-sm"
        style={{
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}, ${PINK})`,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
    </div>
  );
}

function JPBlock({ data, accent, big = false }: { data?: JPLine; accent: string; big?: boolean }) {
  if (!data) return null;

  return (
    <div className="space-y-1">
      <p className={`font-medium leading-relaxed text-white ${big ? "text-2xl" : "text-lg"}`}>{data.jp}</p>
      {data.furigana && <p className="text-sm leading-6" style={{ color: accent }}>{data.furigana}</p>}
      {data.romaji && <p className="text-xs italic leading-5 text-white/45">{data.romaji}</p>}
      {data.en && <p className="text-sm leading-6 text-white/72">{data.en}</p>}
    </div>
  );
}

function VocabTable({
  vocab,
  onAppend,
}: {
  vocab?: Array<{ jp: string; furigana: string; en: string }>;
  onAppend?: (text: string) => void;
}) {
  if (!vocab?.length) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-white/[0.04] font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: CYAN }}>
          <tr>
            <th className="px-3 py-2 font-medium">Japanese</th>
            <th className="px-3 py-2 font-medium">Furigana</th>
            <th className="px-3 py-2 font-medium">English</th>
          </tr>
        </thead>
        <tbody>
          {vocab.map((item, index) => (
            <tr key={`${item.jp}-${index}`} className="border-t border-white/10">
              <td className="px-3 py-2 text-base text-white">
                {onAppend ? (
                  <button
                    type="button"
                    onClick={() => onAppend(item.jp)}
                    className="rounded px-1 text-left transition-colors hover:bg-white/10"
                  >
                    {item.jp}
                  </button>
                ) : (
                  item.jp
                )}
              </td>
              <td className="px-3 py-2" style={{ color: CYAN }}>{item.furigana}</td>
              <td className="px-3 py-2 text-white/72">{item.en}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MultiLine({ text, strong = false }: { text: string; strong?: boolean }) {
  return (
    <div
      className={`rounded-lg border border-white/10 p-3 text-sm leading-7 ${strong ? "bg-black/25 text-white" : "text-white/66"}`}
    >
      {String(text || "")
        .split("\n")
        .map((line, index) => (
          <div key={index}>{line}</div>
        ))}
    </div>
  );
}

function deriveMission(question?: JPLine) {
  if (!question?.en) return "Answer the recruiter's question in Japanese.";

  const text = question.en.toLowerCase();
  if (text.includes("introduc")) return "Introduce yourself clearly in Japanese.";
  if (text.includes("japan")) return "Explain why you came to Japan.";
  if (text.includes("hobb")) return "Talk about your hobbies.";
  if (text.includes("brand")) return "Describe your branding experience.";
  if (text.includes("motion")) return "Explain your motion design work.";
  if (text.includes("portfolio")) return "Present your portfolio.";
  if (text.includes("strength") || text.includes("weak")) return "Discuss your strengths and weaknesses.";
  if (text.includes("company")) return "Explain why you want this company.";
  if (text.includes("team") || text.includes("collab")) return "Describe how you work with a team.";
  return "Answer the recruiter's question in Japanese.";
}

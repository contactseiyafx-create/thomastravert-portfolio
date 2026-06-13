import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";

const SYSTEM_PROMPT = `You are SHINSHOKU, an advanced AI Japanese Job Interview Simulator, Japanese language teacher, career coach, and creative director. You help a beginner-level Japanese learner named Thomas prepare for design job interviews in Japan.

Candidate: Thomas, French, based in Tokyo. Graphic, motion, brand designer and illustrator. 10+ years. Worked on Xbox, Ledger, Sorare, Abelian. Goal: Senior Designer or Creative Lead in Japan.

Teaching rules:
- Beginner Japanese. Short sentences. Teaching matters more than realism.
- Always provide Japanese, furigana, romaji, and English for important content.
- Ask exactly one next recruiter question.
- The survival_dictionary must prepare the next question, not the previous answer.
- Respond only with valid JSON. No markdown, no backticks, no preamble.

Return exactly this shape:
{
  "answer_echo": "",
  "grammar_correction": "",
  "natural_version": {"jp":"","furigana":"","romaji":"","en":""},
  "professional_version": {"jp":"","furigana":"","romaji":"","en":""},
  "vocab": [{"jp":"","furigana":"","en":""}],
  "business_phrases": [{"jp":"","furigana":"","romaji":"","en":""}],
  "pronunciation": {"jp":"","romaji":"","en":""},
  "scores": {"Grammar":0,"Vocabulary":0,"Fluency":0,"Confidence":0,"Professionalism":0},
  "score_notes": "",
  "xp": {"Grammar":0,"Vocabulary":0,"Confidence":0},
  "achievements": ["first_answer"],
  "weak_answer": false,
  "level_up": false,
  "encouragement": "",
  "next_question": {"jp":"","furigana":"","romaji":"","en":""},
  "survival_dictionary": {
    "vocab": [{"jp":"","furigana":"","en":""}],
    "how_to_answer": "",
    "useful_sentences": [{"jp":"","furigana":"","romaji":"","en":""}],
    "template": {"jp":"","en":""},
    "emergency": [{"jp":"","romaji":"","en":""}],
    "hint": ""
  }
}`;

type JPLine = {
  jp: string;
  furigana?: string;
  romaji?: string;
  en?: string;
};

type RequestBody = {
  level?: number;
  levelName?: string;
  question?: JPLine;
  answer?: string;
  turnCount?: number;
};

export async function POST(request: NextRequest) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const answer = String(body.answer || "").trim();
  const level = clamp(Number(body.level || 1), 1, 10);
  const levelName = body.levelName || "JLPT N5";
  const question = body.question || {
    jp: "まず、自己紹介をお願いします。",
    en: "First, please introduce yourself.",
  };

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(createFallbackFeedback(answer, question, Number(body.turnCount || 0)));
  }

  const userPrompt = `LEVEL: ${level} (${levelName})
PREVIOUS QUESTION:
${question.jp} - ${question.en || ""}

THOMAS'S ANSWER:
${answer || "(no answer / left blank)"}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1600,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(createFallbackFeedback(answer, question, Number(body.turnCount || 0)));
    }

    const data = await response.json();
    const text = extractText(data);
    const parsed = parseJSONObject(text);

    if (!parsed) {
      return NextResponse.json(createFallbackFeedback(answer, question, Number(body.turnCount || 0)));
    }

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(createFallbackFeedback(answer, question, Number(body.turnCount || 0)));
  }
}

function extractText(data: unknown) {
  const content = (data as { content?: Array<{ type?: string; text?: string }> }).content;
  if (!Array.isArray(content)) return "";

  return content
    .filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => block.text)
    .join("\n");
}

function parseJSONObject(text: string) {
  const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  try {
    return JSON.parse(clean.slice(start, end + 1));
  } catch {
    return null;
  }
}

function createFallbackFeedback(answer: string, question: JPLine, turnCount: number) {
  const weak = answer.length < 4;
  const mostlyJapanese = /[\u3040-\u30ff\u3400-\u9fff]/.test(answer);
  const next = nextQuestion(turnCount);
  const grammarScore = weak ? 2 : mostlyJapanese ? 6 : 4;
  const vocabScore = weak ? 2 : mostlyJapanese ? 6 : 4;
  const confidenceScore = weak ? 3 : 6;

  return {
    answer_echo: answer,
    grammar_correction: weak
      ? "Try to answer with one short Japanese sentence. Even a simple sentence is enough for practice."
      : mostlyJapanese
        ? "Good attempt. Keep the sentence short and use polite です / ます form for interviews."
        : "Romaji or English is useful for starting, but try adding one Japanese phrase next time.",
    natural_version: {
      jp: "私はフランス出身のデザイナーです。",
      furigana: "私（わたし）はフランス出身（しゅっしん）のデザイナーです。",
      romaji: "Watashi wa Furansu shusshin no dezaina desu.",
      en: "I am a designer from France.",
    },
    professional_version: {
      jp: "フランス出身のデザイナーとして、ブランド、モーション、マーケティング制作に携わってきました。",
      furigana:
        "フランス出身（しゅっしん）のデザイナーとして、ブランド、モーション、マーケティング制作（せいさく）に携（たずさ）わってきました。",
      romaji:
        "Furansu shusshin no dezaina to shite, burando, moshon, maketingu seisaku ni tazusawatte kimashita.",
      en: "As a designer from France, I have worked on branding, motion, and marketing production.",
    },
    vocab: [
      { jp: "面接", furigana: "めんせつ", en: "Interview" },
      { jp: "経験", furigana: "けいけん", en: "Experience" },
      { jp: "制作", furigana: "せいさく", en: "Production / creative work" },
      { jp: "強み", furigana: "つよみ", en: "Strength" },
      { jp: "志望理由", furigana: "しぼうりゆう", en: "Reason for applying" },
    ],
    business_phrases: [
      {
        jp: "どうぞよろしくお願いいたします。",
        furigana: "どうぞよろしくお願（ねが）いいたします。",
        romaji: "Dozo yoroshiku onegai itashimasu.",
        en: "Thank you very much / I look forward to speaking with you.",
      },
      {
        jp: "これまでの経験を活かしたいです。",
        furigana: "これまでの経験（けいけん）を活（い）かしたいです。",
        romaji: "Kore made no keiken o ikashitai desu.",
        en: "I would like to make use of my experience.",
      },
      {
        jp: "御社に貢献したいです。",
        furigana: "御社（おんしゃ）に貢献（こうけん）したいです。",
        romaji: "Onsha ni koken shitai desu.",
        en: "I would like to contribute to your company.",
      },
    ],
    pronunciation: {
      jp: "デザイナー",
      romaji: "dezaina",
      en: "Stretch the final sound slightly: de-za-i-naa.",
    },
    scores: {
      Grammar: grammarScore,
      Vocabulary: vocabScore,
      Fluency: weak ? 2 : 5,
      Confidence: confidenceScore,
      Professionalism: weak ? 3 : 6,
    },
    score_notes:
      "Use short polite sentences, add one concrete design keyword, and close with a calm business phrase.",
    xp: {
      Grammar: weak ? 5 : 12,
      Vocabulary: weak ? 5 : 12,
      Confidence: weak ? 6 : 14,
    },
    achievements: turnCount === 0 ? ["first_answer"] : [],
    weak_answer: weak,
    level_up: !weak && mostlyJapanese && answer.length > 40,
    encouragement: weak
      ? "Start with one simple Japanese sentence. That is enough to keep going."
      : "Good attempt. Keep the structure simple and professional.",
    next_question: next,
    survival_dictionary: dictionaryFor(next),
    offline: true,
    previous_question: question,
  };
}

function nextQuestion(turnCount: number): JPLine {
  const questions: JPLine[] = [
    {
      jp: "日本に来た理由を教えてください。",
      furigana: "日本（にほん）に来（き）た理由（りゆう）を教（おし）えてください。",
      romaji: "Nihon ni kita riyu o oshiete kudasai.",
      en: "Please tell me why you came to Japan.",
    },
    {
      jp: "これまでのデザイン経験について教えてください。",
      furigana: "これまでのデザイン経験（けいけん）について教（おし）えてください。",
      romaji: "Kore made no dezain keiken ni tsuite oshiete kudasai.",
      en: "Please tell me about your design experience so far.",
    },
    {
      jp: "あなたの強みは何ですか。",
      furigana: "あなたの強（つよ）みは何（なん）ですか。",
      romaji: "Anata no tsuyomi wa nan desu ka.",
      en: "What is your strength?",
    },
    {
      jp: "チームで働く時に大切にしていることは何ですか。",
      furigana: "チームで働（はたら）く時（とき）に大切（たいせつ）にしていることは何（なん）ですか。",
      romaji: "Chimu de hataraku toki ni taisetsu ni shite iru koto wa nan desu ka.",
      en: "What do you value when working with a team?",
    },
  ];

  return questions[turnCount % questions.length];
}

function dictionaryFor(question: JPLine) {
  return {
    vocab: [
      { jp: "理由", furigana: "りゆう", en: "Reason" },
      { jp: "経験", furigana: "けいけん", en: "Experience" },
      { jp: "強み", furigana: "つよみ", en: "Strength" },
      { jp: "チーム", furigana: "ちーむ", en: "Team" },
      { jp: "大切", furigana: "たいせつ", en: "Important" },
      { jp: "貢献", furigana: "こうけん", en: "Contribution" },
    ],
    how_to_answer:
      "Answer in two or three short parts. Start with the main point, add one example from your design work, then connect it to the company.",
    useful_sentences: [
      {
        jp: "一番の理由は、デザインの仕事を日本でしたいからです。",
        furigana:
          "一番（いちばん）の理由（りゆう）は、デザインの仕事（しごと）を日本（にほん）でしたいからです。",
        romaji: "Ichiban no riyu wa, dezain no shigoto o Nihon de shitai kara desu.",
        en: "The main reason is that I want to do design work in Japan.",
      },
      {
        jp: "私はブランドデザインの経験があります。",
        furigana: "私（わたし）はブランドデザインの経験（けいけん）があります。",
        romaji: "Watashi wa burando dezain no keiken ga arimasu.",
        en: "I have experience in brand design.",
      },
      {
        jp: "チームで話すことを大切にしています。",
        furigana: "チームで話（はな）すことを大切（たいせつ）にしています。",
        romaji: "Chimu de hanasu koto o taisetsu ni shite imasu.",
        en: "I value talking with the team.",
      },
    ],
    template: {
      jp: "私の答えは（ポイント）です。\n例えば、（経験）があります。\n御社で（貢献）したいです。",
      en: "My answer is (main point).\nFor example, I have (experience).\nAt your company, I want to (contribute).",
    },
    emergency: [
      { jp: "もう一度お願いします。", romaji: "Mo ichido onegai shimasu.", en: "Could you repeat that?" },
      { jp: "ゆっくり話していただけますか？", romaji: "Yukkuri hanashite itadakemasu ka?", en: "Could you speak more slowly?" },
      { jp: "質問が少し難しいです。", romaji: "Shitsumon ga sukoshi muzukashii desu.", en: "The question is a little difficult." },
      { jp: "考える時間をいただけますか？", romaji: "Kangaeru jikan o itadakemasu ka?", en: "May I have a moment to think?" },
    ],
    hint: `For this question, focus on one concrete design example before adding a polite company-focused sentence: ${question.en}`,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

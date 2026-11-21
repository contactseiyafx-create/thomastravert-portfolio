// English / Japanese copy for the three Figma screens + Dream Card.
import { CONFIG } from './config.js';

export const STRINGS = {
  en: {
    langLabel: 'EN',
    brand: 'Sweet Dreams',
    a11y: { soundOn: 'Turn sound off', soundOff: 'Turn sound on', language: 'Language', back: 'Back', close: 'Close' },
    welcome: {
      title: 'Let’s Dream Together',
      subtitle: 'A little magic before bedtime',
      cta: 'Let’s Begin',
      caption: 'Best with sound on · 30 sec experience',
    },
    night: {
      step: 'Step 2 of 3',
      progress: 'Night peace',
      stars: (n) => html2(`<b>${n}</b> / 5 stars`),
      title: 'Make the Night Peaceful',
      instruction: 'Tap the stars and move the moon',
      tapLeft: (n) => [`Tap`, ` ${n} star${n > 1 ? 's' : ''}`],
      starsDone: ['Stars', ' calm ✓'],
      moon: ['Drag', ' the moon'],
      moonDone: ['Moon', ' placed ✓'],
      chipDrag: 'Drag',
      chipTap: 'Tap',
      miss: 'Bring the moon to the glowing ring',
      done: 'The night is peaceful',
      doneSub: 'Nubi is getting sleepy…',
      starLabel: (i, calm) => `Star ${i}${calm ? ', calm' : ', glowing brightly. Tap to dim it'}`,
      moonLabel: 'Moon. Drag it to the glowing ring, or press Enter to move it there',
    },
    dreams: {
      badge: 'Night complete · 5/5 stars',
      meet: 'Meet Pip ✦',
      title: 'Sweet Dreams!',
      subtitle: 'Your magical night is complete',
      cta: 'Discover the Experience',
      replay: 'Replay the Night',
      card: 'Your Dream Card',
    },
    reveal: {
      unlocked: 'You’ve unlocked a Dream Card!',
      tap: 'Tap to Reveal',
      backLabel: 'Mystery Dream Card. Press Enter or tap to reveal it',
      headline: 'Your Dream Is Just Beginning',
      subtitle: 'Keep dreaming beyond the stars.',
      cta: 'Discover Pokémon Sleep',
      save: 'Save Card',
      saveLabel: 'Save My Dream Card',
      share: 'Share Your Dream',
      again: 'Play Again',
      story: 'Save as Story · 1080×1920',
      storyLine: 'I unlocked a Dream Card ✦',
      disclaimer: 'Sweet Dreams is an unofficial, fan-made portfolio concept. Not affiliated with or endorsed by The Pokémon Company, Nintendo, Creatures, GAME FREAK or SELECT BUTTON.',
      storyDisclaimer: 'Unofficial fan-made concept',
      savedBoth: 'Card saved & link copied ✦',
      tiltHint: 'Tilt the card ✦',
    },
    card: {
      title: 'Your Dream Card',
      label: 'Dream Card',
      completed: 'Sweet Dreams Completed',
      names: 'Nubi & Pip',
      night: 'Night',
      save: 'Save Card',
      share: 'Share',
      again: 'Play Again',
      saved: 'Dream Card saved ✦',
      copied: 'Link copied — share it anywhere ✦',
      shareFail: 'Sharing isn’t available here',
      shareTitle: 'Sweet Dreams',
      shareText: 'I helped Nubi fall asleep and met Pip 🌙 Can you make the night peaceful?',
    },
  },
  ja: {
    langLabel: 'JA',
    brand: 'Sweet Dreams',
    a11y: { soundOn: 'サウンドをオフ', soundOff: 'サウンドをオン', language: '言語', back: 'もどる', close: '閉じる' },
    welcome: {
      title: 'いっしょに夢を見よう',
      subtitle: 'おやすみ前の、ちいさな魔法',
      cta: 'はじめよう',
      caption: 'サウンドONがおすすめ · 約30秒',
    },
    night: {
      step: 'ステップ 2 / 3',
      progress: '夜のやすらぎ',
      stars: (n) => html2(`<b>${n}</b> / 5 つの星`),
      title: '静かな夜にしよう',
      instruction: '星をタップして、月を動かそう',
      tapLeft: (n) => [`あと${n}つ`, ' タップ'],
      starsDone: ['星', ' OK ✓'],
      moon: ['月', 'をドラッグ'],
      moonDone: ['月', ' OK ✓'],
      chipDrag: 'ドラッグ',
      chipTap: 'タップ',
      miss: '光る輪まで月を運ぼう',
      done: '静かな夜になりました',
      doneSub: 'ヌビがうとうと…',
      starLabel: (i, calm) => `星 ${i}${calm ? '、おだやか' : '、まぶしく光っています。タップして明かりを落とす'}`,
      moonLabel: '三日月。光る輪までドラッグ、またはEnterキーで移動',
    },
    dreams: {
      badge: 'ナイトクリア · 5/5',
      meet: 'ピップ登場 ✦',
      title: 'おやすみなさい！',
      subtitle: '魔法の夜が完成しました',
      cta: '体験をのぞいてみる',
      replay: 'もう一度遊ぶ',
      card: 'ドリームカード',
    },
    reveal: {
      unlocked: 'ドリームカードをゲット！',
      tap: 'タップしてめくる',
      backLabel: 'ひみつのドリームカード。Enterキーかタップでめくる',
      headline: 'あなたの夢は、\nまだはじまったばかり',
      subtitle: '星の向こうまで、夢をつづけよう。',
      cta: 'Pokémon Sleep をチェック',
      save: 'カードを保存',
      saveLabel: 'ドリームカードを保存',
      share: '夢をシェア',
      again: 'もう一度遊ぶ',
      story: 'ストーリー用に保存 · 1080×1920',
      storyLine: 'ドリームカードをゲットしたよ ✦',
      disclaimer: 'Sweet Dreams は非公式のファンメイド・ポートフォリオ作品です。株式会社ポケモン、任天堂、クリーチャーズ、ゲームフリーク、セレクトボタンとは関係ありません。',
      storyDisclaimer: '非公式ファンメイド作品',
      savedBoth: 'カードを保存し、リンクをコピーしました ✦',
      tiltHint: 'カードを傾けてみて ✦',
    },
    card: {
      title: 'あなたのドリームカード',
      label: 'ドリームカード',
      completed: 'スウィートドリーム達成',
      names: 'ヌビ & ピップ',
      night: 'ナイト',
      save: 'カードを保存',
      share: 'シェア',
      again: 'もう一度遊ぶ',
      saved: 'ドリームカードを保存しました ✦',
      copied: 'リンクをコピーしました ✦',
      shareFail: 'この環境ではシェアできません',
      shareTitle: 'Sweet Dreams',
      shareText: 'ヌビを寝かしつけて、ピップに出会えたよ🌙 あなたも静かな夜をつくってみて！',
    },
  },
};

/** Marks a string that contains trusted inline markup (only <b>) from this file. */
function html2(s) { return { __html: s }; }

export const LANGS = Object.keys(STRINGS);

export function detectLang() {
  if (CONFIG.defaultLang && STRINGS[CONFIG.defaultLang]) return CONFIG.defaultLang;
  try {
    const saved = localStorage.getItem('sd-lang');
    if (saved && STRINGS[saved]) return saved;
  } catch (e) { /* storage blocked */ }
  return (navigator.language || 'en').toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

export function saveLang(lang) {
  try { localStorage.setItem('sd-lang', lang); } catch (e) { /* ignore */ }
}

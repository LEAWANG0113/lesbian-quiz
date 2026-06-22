export interface Character {
  id: string;
  name: string;
  source: string;
  traits: string[];
  quote: string;
  description: string;
  cpPartner?: string;
  cpName?: string;
  emoji: string;
}

export const characters: Character[] = [
  // === The L Word ===
  {
    id: "shane",
    name: "Shane McCutcheon",
    source: "The L Word",
    traits: ["不羁", "万人迷", "承诺恐惧", "忠于自我"],
    quote: "I don't do girlfriends.",
    description:
      "你是人群中最酷的那一个。不需要刻意经营，自然散发吸引力。你害怕承诺但内心柔软，对朋友无比忠诚。你的发型永远是最帅的。",
    cpPartner: "carmen",
    cpName: "Shane & Carmen",
    emoji: "🔥",
  },
  {
    id: "bette",
    name: "Bette Porter",
    source: "The L Word",
    traits: ["强势", "控制欲", "品味极佳", "事业心"],
    quote: "I'm not bossy. I'm the boss.",
    description:
      "你天生就是leader，气场两米八。对艺术和品质有极高要求，工作能力碾压所有人。感情中你很强势，但那是因为你太在意了。",
    cpPartner: "tina",
    cpName: "Bette & Tina",
    emoji: "👑",
  },
  {
    id: "alice",
    name: "Alice Pieszecki",
    source: "The L Word",
    traits: ["话多", "社交达人", "八卦", "热心"],
    quote: "I made a chart!",
    description:
      "你是朋友圈的社交中心，信息中枢。你发明了lesbian chart（六度分隔理论拉拉版）。你热情、好奇、永远有聊不完的话题。你的群聊永远是最活跃的。",
    cpPartner: "dana",
    cpName: "Alice & Dana",
    emoji: "💬",
  },
  {
    id: "dana",
    name: "Dana Fairbanks",
    source: "The L Word",
    traits: ["害羞", "运动健将", "可爱", "深柜挣扎"],
    quote: "I can't be gay. I'm a tennis player.",
    description:
      "你外表阳光运动，内心却是个害羞的小朋友。你可能花了很久才接受自己，但一旦接受了就全力以赴。你是所有人都想保护的那个甜心。",
    cpPartner: "alice",
    cpName: "Dana & Alice",
    emoji: "🎾",
  },
  {
    id: "jenny",
    name: "Jenny Schecter",
    source: "The L Word",
    traits: ["文艺", "戏剧化", "敏感", "自我中心"],
    quote: "I'm a writer. I observe.",
    description:
      "你是最复杂最有争议的人。极度敏感，文艺到骨子里，活在自己的叙事宇宙中。别人觉得你drama，但你只是感受力比常人强十倍。",
    emoji: "✍️",
  },
  {
    id: "tina",
    name: "Tina Kennard",
    source: "The L Word",
    traits: ["温柔", "家庭导向", "隐忍", "成长型"],
    quote: "I need to find out who I am outside of us.",
    description:
      "你是温柔的力量。你重视家庭和关系的稳定，愿意为爱付出。但不要小看你——你在成长中会变得越来越独立和强大。",
    cpPartner: "bette",
    cpName: "Tina & Bette",
    emoji: "🏠",
  },
  {
    id: "carmen",
    name: "Carmen de la Pica Morales",
    source: "The L Word",
    traits: ["热情", "性感", "拉丁风情", "勇敢追爱"],
    quote: "I know what I want.",
    description:
      "你热情似火，敢爱敢恨。你知道自己想要什么，也不怕去追。你的能量感染所有人，是派对上最闪亮的那个。",
    cpPartner: "shane",
    cpName: "Carmen & Shane",
    emoji: "💃",
  },
  {
    id: "helena",
    name: "Helena Peabody",
    source: "The L Word",
    traits: ["富有", "傲慢", "浪漫", "反转魅力"],
    quote: "Money can't buy love, but it can buy everything else.",
    description:
      "你出身优越，一开始可能给人距离感。但你骨子里是个浪漫主义者，愿意为爱放下一切。你的反转魅力让人又恨又爱。",
    emoji: "💎",
  },

  // === 卡罗尔 Carol ===
  {
    id: "carol",
    name: "Carol Aird",
    source: "卡罗尔 Carol (2015)",
    traits: ["优雅", "成熟", "果断", "隐忍的激情"],
    quote: "I love you.",
    description:
      "你是那种走进房间所有人都会看的人。优雅、成熟、克制，但内心燃烧着巨大的热情。你为了爱可以放弃一切，但你永远不会失去你的体面。",
    cpPartner: "therese",
    cpName: "Carol & Therese",
    emoji: "🧤",
  },
  {
    id: "therese",
    name: "Therese Belivet",
    source: "卡罗尔 Carol (2015)",
    traits: ["安静", "好奇", "艺术感", "内敛的勇气"],
    quote: "I didn't know what to ask for.",
    description:
      "你安静但目光锐利，总是在观察。你像一个慢慢被唤醒的人，一旦找到那个人，你的世界就有了颜色。你的勇气是安静的，但无比坚定。",
    cpPartner: "carol",
    cpName: "Therese & Carol",
    emoji: "📷",
  },

  // === 面子 Saving Face ===
  {
    id: "wil",
    name: "Wil",
    source: "面子 Saving Face (2004)",
    traits: ["独立", "直爽", "运动型", "家庭压力"],
    quote: "I'm not hiding. I'm just... not advertising.",
    description:
      "你是华人社区里最酷的那个les。你独立、直爽、不做作，但面对家庭和文化期待时会有自己的挣扎。你在两个世界之间找到了自己的路。",
    cpPartner: "vivian",
    cpName: "Wil & Vivian",
    emoji: "🏀",
  },
  {
    id: "vivian",
    name: "Vivian Shing",
    source: "面子 Saving Face (2004)",
    traits: ["大胆", "自信", "性感", "不怕世俗"],
    quote: "Are you afraid of me?",
    description:
      "你大胆、自信、知道自己的魅力。你不怕挑战社会规则，敢于公开追求你想要的人。你的勇气让所有人佩服。",
    cpPartner: "wil",
    cpName: "Vivian & Wil",
    emoji: "💄",
  },

  // === 燃烧女子的肖像 Portrait of a Lady on Fire ===
  {
    id: "marianne",
    name: "Marianne",
    source: "燃烧女子的肖像 (2019)",
    traits: ["深沉", "观察者", "艺术家", "克制"],
    quote: "Don't regret. Remember.",
    description:
      "你用目光和记忆爱人。你是观察者，是创作者，你把每一个细节都刻在心里。你的爱是深沉的、带着疼痛的、但也是最持久的。",
    cpPartner: "heloise",
    cpName: "Marianne & Héloïse",
    emoji: "🎨",
  },
  {
    id: "heloise",
    name: "Héloïse",
    source: "燃烧女子的肖像 (2019)",
    traits: ["反叛", "真实", "勇敢", "野性"],
    quote: "Do all lovers feel like they're inventing something?",
    description:
      "你拒绝被定义，拒绝被安排。你有一种野性的美，你的真实让人无法忽视。你宁愿痛苦也不愿假装，你的爱是燃烧的。",
    cpPartner: "marianne",
    cpName: "Héloïse & Marianne",
    emoji: "🔥",
  },

  // === 阿黛尔的生活 Blue Is the Warmest Color ===
  {
    id: "adele",
    name: "Adèle",
    source: "阿黛尔的生活 (2013)",
    traits: ["感性", "纯真", "执着", "容易受伤"],
    quote: "I have infinite tenderness for you.",
    description:
      "你用全部的自己去爱，不留退路。你纯真、感性，对生活和爱情有无限的热情。你可能会受伤，但你从不后悔爱过。",
    emoji: "💙",
  },
  {
    id: "emma",
    name: "Emma",
    source: "阿黛尔的生活 (2013)",
    traits: ["艺术家", "自由", "理性", "独立"],
    quote: "You need to live your own life.",
    description:
      "你是艺术家灵魂，追求自由和独立。你对世界有自己的理解，不会为任何人放弃自我。你的蓝发是你的态度。",
    cpPartner: "adele",
    cpName: "Emma & Adèle",
    emoji: "🎭",
  },

  // === 小姐 The Handmaiden ===
  {
    id: "hideko",
    name: "秀子 (Hideko)",
    source: "小姐 The Handmaiden (2016)",
    traits: ["神秘", "聪明", "反转", "隐忍"],
    quote: "从现在开始，我不再是小姐了。",
    description:
      "你看起来温顺优雅，其实内心有一盘大棋。你聪明、隐忍、善于反转局面。不要低估你——你才是最后赢的那个人。",
    cpPartner: "sookhee",
    cpName: "秀子 & 淑姬",
    emoji: "🌸",
  },
  {
    id: "sookhee",
    name: "淑姬 (Sook-hee)",
    source: "小姐 The Handmaiden (2016)",
    traits: ["机灵", "野生", "忠诚", "底层逆袭"],
    quote: "我不是来伺候你的。",
    description:
      "你出身底层但聪明过人，靠自己的能力打天下。你粗中有细，看似随性其实极度忠诚。你是那种一旦爱了就会豁出一切的人。",
    cpPartner: "hideko",
    cpName: "淑姬 & 秀子",
    emoji: "🔓",
  },
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

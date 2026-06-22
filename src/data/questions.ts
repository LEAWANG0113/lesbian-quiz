export interface QuizOption {
  text: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  id: number;
  category: "daily" | "ex" | "meme";
  categoryLabel: string;
  question: string;
  options: QuizOption[];
}

export const questions: QuizQuestion[] = [
  // ========== 日常生活 ==========
  {
    id: 1,
    category: "daily",
    categoryLabel: "日常",
    question: "周六早上醒来，你第一件事想做什么？",
    options: [
      {
        text: "去咖啡馆坐着，看人来人往",
        scores: { carol: 3, marianne: 2, therese: 2 },
      },
      {
        text: "睡到自然醒，旁边换了个人也无所谓",
        scores: { shane: 3, emma: 2 },
      },
      {
        text: "晨跑/健身，保持状态",
        scores: { dana: 3, wil: 2, sookhee: 1 },
      },
      {
        text: "打开手机看看群里又发生了什么drama",
        scores: { alice: 3, vivian: 1 },
      },
      {
        text: "给她做早餐",
        scores: { tina: 3, carmen: 2 },
      },
    ],
  },
  {
    id: 2,
    category: "daily",
    categoryLabel: "日常",
    question: "朋友形容你最常用的词是？",
    options: [
      { text: "酷/帅", scores: { shane: 3, wil: 2, heloise: 1 } },
      { text: "靠谱/强势", scores: { bette: 3, carol: 2 } },
      { text: "有趣/话多", scores: { alice: 3, vivian: 1 } },
      { text: "温柔/体贴", scores: { tina: 3, dana: 2, therese: 1 } },
      { text: "神秘/文艺", scores: { jenny: 2, marianne: 3, hideko: 2 } },
    ],
  },
  {
    id: 3,
    category: "daily",
    categoryLabel: "日常",
    question: "你的穿衣风格更接近？",
    options: [
      {
        text: "黑色T恤+牛仔裤，不需要多想",
        scores: { shane: 3, wil: 2 },
      },
      {
        text: "精致西装/大衣，质感第一",
        scores: { bette: 3, carol: 3, hideko: 1 },
      },
      {
        text: "什么流行穿什么，衣柜爆炸",
        scores: { alice: 2, carmen: 3, vivian: 2 },
      },
      {
        text: "文艺复古，vintage店常客",
        scores: { jenny: 2, therese: 3, marianne: 2 },
      },
      {
        text: "运动休闲，舒服最重要",
        scores: { dana: 3, adele: 2, sookhee: 1 },
      },
    ],
  },
  {
    id: 4,
    category: "daily",
    categoryLabel: "日常",
    question: "你在朋友聚会中通常是什么角色？",
    options: [
      {
        text: "气氛担当，全场都围着你转",
        scores: { alice: 3, carmen: 2, vivian: 2 },
      },
      {
        text: "安静坐角落，但总有人被你吸引过来",
        scores: { shane: 3, marianne: 2, heloise: 1 },
      },
      {
        text: "组织者，从选餐厅到买单都是你",
        scores: { bette: 3, carol: 2 },
      },
      {
        text: "跟最亲的一两个人聊深度话题",
        scores: { dana: 2, therese: 3, tina: 2 },
      },
      {
        text: "观察所有人，回家写日记",
        scores: { jenny: 3, marianne: 2, hideko: 2 },
      },
    ],
  },

  // ========== 前任关系 ==========
  {
    id: 5,
    category: "ex",
    categoryLabel: "前任",
    question: "分手后你通常怎么处理？",
    options: [
      {
        text: "迅速开始下一段，最好的疗伤是新欢",
        scores: { shane: 3, emma: 2 },
      },
      {
        text: "把所有照片删了，假装这个人不存在",
        scores: { bette: 2, heloise: 3 },
      },
      {
        text: "和前任变成朋友，毕竟圈子就这么大",
        scores: { alice: 3, wil: 2 },
      },
      {
        text: "写长文/发ins story暗示，加工成创作素材",
        scores: { jenny: 3, adele: 2 },
      },
      {
        text: "低调消化，不让任何人看出来",
        scores: { carol: 2, tina: 2, marianne: 3, hideko: 2 },
      },
    ],
  },
  {
    id: 6,
    category: "ex",
    categoryLabel: "前任",
    question: "前任突然发消息说想见面，你的反应是？",
    options: [
      {
        text: "已读不回",
        scores: { bette: 3, heloise: 2 },
      },
      {
        text: "秒回，见呗",
        scores: { adele: 3, tina: 2, dana: 1 },
      },
      {
        text: "先截图发群里讨论",
        scores: { alice: 3, vivian: 2 },
      },
      {
        text: '三天后回一个"？"',
        scores: { shane: 3, carol: 2, hideko: 2 },
      },
      {
        text: "写一首诗回复她",
        scores: { jenny: 3, marianne: 2 },
      },
    ],
  },
  {
    id: 7,
    category: "ex",
    categoryLabel: "前任",
    question: "你在感情中最大的问题是？",
    options: [
      {
        text: "太怕承诺，一认真就想跑",
        scores: { shane: 3, emma: 2, helena: 1 },
      },
      {
        text: "太强势，什么都想控制",
        scores: { bette: 3, carol: 1 },
      },
      {
        text: "太容易爱上不该爱的人",
        scores: { adele: 3, carmen: 2, dana: 1 },
      },
      {
        text: "太敏感，容易受伤",
        scores: { jenny: 2, therese: 2, tina: 3 },
      },
      {
        text: "不够坦诚，藏太多",
        scores: { wil: 2, marianne: 2, hideko: 3 },
      },
    ],
  },

  // ========== 圈内梗 ==========
  {
    id: 8,
    category: "meme",
    categoryLabel: "梗",
    question: "经典场景：在lesbian bar里，你最可能在做什么？",
    options: [
      {
        text: "靠在吧台，等别人来搭讪",
        scores: { shane: 3, heloise: 2, emma: 1 },
      },
      {
        text: "跟朋友分析场内每个人的关系图谱",
        scores: { alice: 3, vivian: 1 },
      },
      {
        text: "包场，请所有人喝酒",
        scores: { helena: 3, carol: 2 },
      },
      {
        text: "在角落画速写/写东西",
        scores: { marianne: 3, jenny: 2, therese: 2 },
      },
      {
        text: "跳舞跳到最后一个离开",
        scores: { carmen: 3, sookhee: 2, vivian: 2 },
      },
    ],
  },
  {
    id: 9,
    category: "meme",
    categoryLabel: "梗",
    question: "U-Haul问题：认识多久你觉得可以同居？",
    options: [
      {
        text: "第二次约会就可以搬了（经典lesbian）",
        scores: { adele: 3, tina: 2, carmen: 2 },
      },
      {
        text: "同居？我连过夜都不一定",
        scores: { shane: 3, emma: 2 },
      },
      {
        text: "至少半年，我需要确认这段关系值得",
        scores: { bette: 2, carol: 3, wil: 2 },
      },
      {
        text: "同居可以，但我需要自己的房间/工作室",
        scores: { marianne: 3, jenny: 2, hideko: 2 },
      },
      {
        text: "看感觉，对的人什么时候都行",
        scores: { dana: 2, therese: 2, heloise: 3 },
      },
    ],
  },
  {
    id: 10,
    category: "meme",
    categoryLabel: "梗",
    question: "如果你是The L Word里的角色，你在Alice的chart上会是什么位置？",
    options: [
      {
        text: "chart中心，连线最多的那个",
        scores: { shane: 3, alice: 2, helena: 2 },
      },
      {
        text: "chart制作者本人",
        scores: { alice: 3, vivian: 1 },
      },
      {
        text: "只有一条线，但那条线最长",
        scores: { carol: 3, marianne: 3, tina: 2 },
      },
      {
        text: "不在chart上，谁也不知道我的感情生活",
        scores: { wil: 3, hideko: 3, sookhee: 1 },
      },
      {
        text: "chart上的虚线——暧昧但从未official",
        scores: { therese: 2, dana: 3, jenny: 2 },
      },
    ],
  },
  {
    id: 11,
    category: "meme",
    categoryLabel: "梗",
    question: "哪种约会方式最吸引你？",
    options: [
      {
        text: "高级餐厅，红酒，隔着桌子对视",
        scores: { carol: 3, bette: 2, hideko: 2 },
      },
      {
        text: "一起看一部没人听过的独立电影",
        scores: { therese: 3, jenny: 2, marianne: 2 },
      },
      {
        text: "骑摩托兜风，去一个没计划的地方",
        scores: { shane: 2, heloise: 3, sookhee: 2 },
      },
      {
        text: "在家做饭，窝沙发上聊到天亮",
        scores: { tina: 3, wil: 2, dana: 2 },
      },
      {
        text: "夜店→天台→看日出，一整夜的冒险",
        scores: { carmen: 3, vivian: 2, helena: 2, adele: 1 },
      },
    ],
  },
  {
    id: 12,
    category: "meme",
    categoryLabel: "梗",
    question: "最后一题：选一句最能代表你的话",
    options: [
      {
        text: "爱过，不后悔",
        scores: { adele: 3, heloise: 2, carmen: 2 },
      },
      {
        text: "不要遗憾，要记住",
        scores: { marianne: 3, carol: 2 },
      },
      {
        text: "我不需要被定义",
        scores: { shane: 2, heloise: 2, emma: 3, sookhee: 2 },
      },
      {
        text: "我知道我想要什么",
        scores: { bette: 3, vivian: 3, hideko: 2 },
      },
      {
        text: "陪在你身边就够了",
        scores: { tina: 3, therese: 2, dana: 2, wil: 1 },
      },
    ],
  },
];

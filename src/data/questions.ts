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
        scores: { carol: 4, marianne: 3, therese: 3 },
      },
      {
        text: "睡到自然醒，旁边换了个人也无所谓",
        scores: { shane: 3, emma: 3 },
      },
      {
        text: "晨跑/健身，保持状态",
        scores: { dana: 2, wil: 4, sookhee: 3 },
      },
      {
        text: "打开手机看看群里又发生了什么drama",
        scores: { alice: 3, vivian: 3 },
      },
      {
        text: "给她做早餐",
        scores: { tina: 2, adele: 3, hideko: 2 },
      },
      {
        text: "这跟性取向有什么关系？我就是正常起床",
        scores: { lyt: 5, htt: 4 },
      },
    ],
  },
  {
    id: 2,
    category: "daily",
    categoryLabel: "日常",
    question: "朋友形容你最常用的词是？",
    options: [
      { text: "酷/帅", scores: { shane: 2, wil: 4, heloise: 3 } },
      { text: "靠谱/强势", scores: { bette: 2, carol: 4 } },
      { text: "有趣/话多", scores: { alice: 2, vivian: 3 } },
      { text: "温柔/体贴", scores: { tina: 2, therese: 3, adele: 3 } },
      { text: "神秘/文艺", scores: { marianne: 4, hideko: 4 } },
      {
        text: "正常/普通，我跟其他女生没什么不同",
        scores: { lyt: 5, htt: 4 },
      },
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
        scores: { shane: 2, wil: 4, sookhee: 3 },
      },
      {
        text: "精致西装/大衣，质感第一",
        scores: { bette: 2, carol: 4, hideko: 3 },
      },
      {
        text: "什么流行穿什么，衣柜爆炸",
        scores: { carmen: 2, vivian: 4, alice: 1 },
      },
      {
        text: "文艺复古，vintage店常客",
        scores: { therese: 4, marianne: 3, jenny: 1 },
      },
      {
        text: "运动休闲，舒服最重要",
        scores: { dana: 2, adele: 3, emma: 3 },
      },
      {
        text: "穿衣服跟取向有什么关系啊，别刻板印象",
        scores: { lyt: 5, htt: 4 },
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
        scores: { vivian: 4, carmen: 3, alice: 2 },
      },
      {
        text: "安静坐角落，但总有人被你吸引过来",
        scores: { heloise: 4, marianne: 3, shane: 2 },
      },
      {
        text: "组织者，从选餐厅到买单都是你",
        scores: { bette: 2, carol: 3, hideko: 3 },
      },
      {
        text: "跟最亲的一两个人聊深度话题",
        scores: { therese: 4, adele: 3, wil: 2 },
      },
      {
        text: "观察所有人，回家写日记",
        scores: { marianne: 4, hideko: 3, jenny: 2 },
      },
      {
        text: "我聚会不分男女的，跟谁都能聊",
        scores: { lyt: 5, htt: 4 },
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
        scores: { shane: 3, emma: 3 },
      },
      {
        text: "把所有照片删了，假装这个人不存在",
        scores: { heloise: 4, sookhee: 3 },
      },
      {
        text: "和前任变成朋友，毕竟圈子就这么大",
        scores: { alice: 2, wil: 4 },
      },
      {
        text: "写长文/发ins story暗示，加工成创作素材",
        scores: { adele: 4, jenny: 2 },
      },
      {
        text: "低调消化，不让任何人看出来",
        scores: { carol: 4, marianne: 4, hideko: 3 },
      },
      {
        text: "我没有前任（女朋友），我是直的",
        scores: { lyt: 6, htt: 5 },
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
        scores: { heloise: 4, sookhee: 3 },
      },
      {
        text: "秒回，见呗",
        scores: { adele: 4, therese: 3 },
      },
      {
        text: "先截图发群里讨论",
        scores: { alice: 2, vivian: 4 },
      },
      {
        text: '三天后回一个"？"',
        scores: { carol: 4, hideko: 4, shane: 2 },
      },
      {
        text: "写一首诗回复她",
        scores: { marianne: 4, jenny: 2 },
      },
      {
        text: "我说了我没有女的前任，她只是我以前的好闺蜜",
        scores: { lyt: 6, htt: 5 },
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
        scores: { shane: 3, emma: 4 },
      },
      {
        text: "太强势，什么都想控制",
        scores: { bette: 3, carol: 2 },
      },
      {
        text: "太容易爱上不该爱的人",
        scores: { adele: 4, carmen: 2, therese: 3 },
      },
      {
        text: "太敏感，容易受伤",
        scores: { jenny: 1, heloise: 3, tina: 2 },
      },
      {
        text: "不够坦诚，藏太多",
        scores: { wil: 4, hideko: 4, marianne: 3 },
      },
      {
        text: "我对女生没有感情问题，我们就是普通朋友关系",
        scores: { lyt: 6, htt: 5 },
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
        scores: { heloise: 4, emma: 3, shane: 2 },
      },
      {
        text: "跟朋友分析场内每个人的关系图谱",
        scores: { alice: 2, vivian: 3 },
      },
      {
        text: "包场，请所有人喝酒",
        scores: { helena: 2, carol: 4 },
      },
      {
        text: "在角落画速写/写东西",
        scores: { marianne: 4, therese: 4 },
      },
      {
        text: "跳舞跳到最后一个离开",
        scores: { sookhee: 4, carmen: 2, vivian: 3 },
      },
      {
        text: "我为什么会去lesbian bar？我是被朋友拉去的",
        scores: { lyt: 6, htt: 5 },
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
        scores: { adele: 4, sookhee: 3, carmen: 2 },
      },
      {
        text: "同居？我连过夜都不一定",
        scores: { shane: 3, emma: 3 },
      },
      {
        text: "至少半年，我需要确认这段关系值得",
        scores: { carol: 4, wil: 3, bette: 1 },
      },
      {
        text: "同居可以，但我需要自己的房间/工作室",
        scores: { marianne: 4, hideko: 3, jenny: 1 },
      },
      {
        text: "看感觉，对的人什么时候都行",
        scores: { heloise: 4, therese: 3, dana: 1 },
      },
      {
        text: "跟女生同居？那就是合租室友吧，很正常啊",
        scores: { lyt: 6, htt: 5 },
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
        scores: { shane: 2, vivian: 3, alice: 1, helena: 1 },
      },
      {
        text: "chart制作者本人",
        scores: { alice: 3, vivian: 2 },
      },
      {
        text: "只有一条线，但那条线最长",
        scores: { carol: 4, marianne: 4, tina: 1 },
      },
      {
        text: "不在chart上，谁也不知道我的感情生活",
        scores: { wil: 4, hideko: 4, sookhee: 3 },
      },
      {
        text: "chart上的虚线——暧昧但从未official",
        scores: { therese: 4, adele: 3, dana: 1 },
      },
      {
        text: "什么chart？我没看过这个剧（但我搜过）",
        scores: { lyt: 5, htt: 5 },
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
        scores: { carol: 4, hideko: 4, bette: 1 },
      },
      {
        text: "一起看一部没人听过的独立电影",
        scores: { therese: 4, marianne: 3, emma: 3 },
      },
      {
        text: "骑摩托兜风，去一个没计划的地方",
        scores: { heloise: 4, sookhee: 4, shane: 1 },
      },
      {
        text: "在家做饭，窝沙发上聊到天亮",
        scores: { wil: 4, adele: 3, tina: 2 },
      },
      {
        text: "夜店→天台→看日出，一整夜的冒险",
        scores: { vivian: 4, carmen: 3, helena: 1 },
      },
      {
        text: "这不叫约会吧，跟好朋友出去玩而已",
        scores: { lyt: 5, htt: 5 },
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
        scores: { adele: 4, heloise: 4, carmen: 1 },
      },
      {
        text: "不要遗憾，要记住",
        scores: { marianne: 4, carol: 4 },
      },
      {
        text: "我不需要被定义",
        scores: { emma: 4, sookhee: 4, heloise: 2 },
      },
      {
        text: "我知道我想要什么",
        scores: { vivian: 4, hideko: 4, bette: 1 },
      },
      {
        text: "陪在你身边就够了",
        scores: { therese: 4, wil: 3, adele: 3 },
      },
      {
        text: "我们真的只是好朋友",
        scores: { lyt: 7, htt: 6 },
      },
    ],
  },
];

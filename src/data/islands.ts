import { Island } from '../types';

const islands: Island[] = [
  {
    id: 'island_arabic',
    title: 'جزيرة اللغة العربية',
    description: 'تعلم الكلمات وحروف اللغة العربية عبر ألغاز ممتعة.',
    artwork: 'assets/islands/island_illustration_1.svg',
    levels: [
      {
        id: 'level_1_ar',
        title: 'المستوى 1',
        description: 'أساسيات الحروف والكلمات البسيطة.',
        unlocked: true,
        stars: 0,
        puzzles: [
          {
            id: 'puzzle_ar_mc_1',
            type: 'multiple_choice',
            prompt: 'ما صورة كلمة "قلم"؟',
            choices: ['قلم', 'كتاب', 'باب'],
            answer: 'قلم',
          },
          {
            id: 'puzzle_ar_ml_1',
            type: 'missing_letters',
            prompt: 'أكمل الكلمة: _بـل',
            data: { pattern: '_بـل', missing: ['ق'] },
            answer: 'قبل',
          },
        ],
      },
      {
        id: 'level_2_ar',
        title: 'المستوى 2',
        description: 'كلمات أكثر تنوعًا.',
        unlocked: false,
        stars: 0,
        puzzles: [
          {
            id: 'puzzle_ar_ws_1',
            type: 'word_search',
            prompt: 'ابحث عن الكلمات: قلم، كتاب، مدرسة',
            data: { words: ['قلم', 'كتاب', 'مدرسة'] },
            answer: [],
          },
        ],
      },
    ],
  },
  {
    id: 'island_heritage',
    title: 'جزيرة التراث',
    description: 'ألغاز ومعالم من التراث العربي الإسلامي.',
    artwork: 'assets/islands/island_illustration_2.svg',
    levels: [
      {
        id: 'level_heritage_1',
        title: 'المستوى 1',
        description: 'معالم بسيطة للتعرف عليها.',
        unlocked: true,
        stars: 0,
        puzzles: [
          {
            id: 'puzzle_heritage_mc_1',
            type: 'multiple_choice',
            prompt: 'ما اسم هذا المعلم؟',
            choices: ['الجامع الأموي', 'المنارة', 'المدرسة'],
            answer: 'الجامع الأموي',
          },
        ],
      },
    ],
  },
  {
    id: 'island_world',
    title: 'ج��يرة العالم',
    description: 'استكشف معالم عالمية ضمن ألغاز مسلية.',
    artwork: 'assets/islands/island_illustration_3.svg',
    levels: [
      {
        id: 'level_world_1',
        title: 'المستوى 1',
        description: 'معالم ومفاهيم عامة.',
        unlocked: false,
        stars: 0,
        puzzles: [],
      },
    ],
  },
];

export default islands;

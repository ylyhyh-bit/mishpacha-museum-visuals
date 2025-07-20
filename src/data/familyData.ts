export interface FamilyMember {
  id: string;
  name: string;
  hebrewName?: string;
  birthYear?: number;
  deathYear?: number;
  role: string;
  photo?: string;
  biography?: string;
  spouse?: string;
  children?: string[];
  achievements?: string[];
  cultural?: string[];
  generation: number;
  position: { x: number; y: number };
  parentIds?: string[];
}

export const sampleFamilyData: FamilyMember[] = [
  // Generation 0 - Great Grandparents
  {
    id: 'gg1',
    name: 'משה כהן',
    hebrewName: 'משה בן אברהם',
    birthYear: 1885,
    deathYear: 1962,
    role: 'סבא רבא',
    spouse: 'רחל כהן',
    children: ['g1', 'g2'],
    achievements: [
      'ייסד בית כנסת ברובע היהודי',
      'חבר מועצת הקהילה',
      'מורה לתלמוד'
    ],
    cultural: ['תלמוד', 'קבלה', 'חזנות'],
    generation: 0,
    position: { x: 300, y: 150 },
    parentIds: []
  },
  {
    id: 'gg2',
    name: 'רחל כהן',
    hebrewName: 'רחל בת יצחק',
    birthYear: 1890,
    deathYear: 1968,
    role: 'סבתא רבא',
    spouse: 'משה כהן',
    children: ['g1', 'g2'],
    achievements: [
      'הקימה חדר לבנות',
      'פעילה בארגון נשים',
      'ידועה בבישול מסורתי'
    ],
    cultural: ['בישול יהודי', 'תפילה', 'חינוך'],
    generation: 0,
    position: { x: 600, y: 150 },
    parentIds: []
  },

  // Generation 1 - Grandparents
  {
    id: 'g1',
    name: 'אברהם כהן',
    hebrewName: 'אברהם בן משה',
    birthYear: 1915,
    deathYear: 1995,
    role: 'סבא',
    spouse: 'שרה כהן',
    children: ['p1', 'p2', 'p3'],
    achievements: [
      'וותיק מלחמת העצמאות',
      'בעל עסק מצליח',
      'פעיל קהילתי'
    ],
    cultural: ['ציונות', 'עברית', 'מסחר'],
    generation: 1,
    position: { x: 200, y: 350 },
    parentIds: ['gg1', 'gg2']
  },
  {
    id: 'g2',
    name: 'יעקב כהן',
    hebrewName: 'יעקב בן משה',
    birthYear: 1918,
    deathYear: 1998,
    role: 'דוד גדול',
    spouse: 'מרים כהן',
    children: ['p4'],
    achievements: [
      'רופא מוערך',
      'חבר הכנסת',
      'כותב ספרי רפואה'
    ],
    cultural: ['רפואה', 'מדע', 'פוליטיקה'],
    generation: 1,
    position: { x: 700, y: 350 },
    parentIds: ['gg1', 'gg2']
  },
  {
    id: 'g3',
    name: 'שרה כהן',
    hebrewName: 'שרה בת דוד',
    birthYear: 1920,
    deathYear: 2000,
    role: 'סבתא',
    spouse: 'אברהם כהן',
    children: ['p1', 'p2', 'p3'],
    achievements: [
      'מורה לעברית',
      'מתנדבת בבית חולים',
      'משוררת מקומית'
    ],
    cultural: ['שירה', 'חינוך', 'התנדבות'],
    generation: 1,
    position: { x: 450, y: 350 },
    parentIds: []
  },

  // Generation 2 - Parents
  {
    id: 'p1',
    name: 'דוד כהן',
    hebrewName: 'דוד בן אברהם',
    birthYear: 1945,
    role: 'אבא',
    spouse: 'רות כהן',
    children: ['c1', 'c2'],
    achievements: [
      'מהנדס בכיר בתעשייה',
      'פיתח פטנטים',
      'מרצה באוניברסיטה'
    ],
    cultural: ['הנדסה', 'חדשנות', 'אקדמיה'],
    generation: 2,
    position: { x: 150, y: 550 },
    parentIds: ['g1', 'g3']
  },
  {
    id: 'p2',
    name: 'מרים לוי',
    hebrewName: 'מרים בת אברהם',
    birthYear: 1947,
    role: 'דודה',
    spouse: 'יוסף לוי',
    children: ['c3'],
    achievements: [
      'עורכת דין מצליחה',
      'פעילה למען זכויות נשים',
      'כותבת משפטית'
    ],
    cultural: ['משפטים', 'פמיניזם', 'כתיבה'],
    generation: 2,
    position: { x: 350, y: 550 },
    parentIds: ['g1', 'g3']
  },
  {
    id: 'p3',
    name: 'יצחק כהן',
    hebrewName: 'יצחק בן אברהם',
    birthYear: 1950,
    role: 'דוד',
    spouse: 'רבקה כהן',
    children: ['c4', 'c5'],
    achievements: [
      'אמן ציור מוכר',
      'מייסד גלריה',
      'מורה לאמנות'
    ],
    cultural: ['אמנות', 'ציור', 'חינוך אמנותי'],
    generation: 2,
    position: { x: 550, y: 550 },
    parentIds: ['g1', 'g3']
  },
  {
    id: 'p4',
    name: 'רות כהן',
    hebrewName: 'רות בת שמואל',
    birthYear: 1948,
    role: 'אמא',
    spouse: 'דוד כהן',
    children: ['c1', 'c2'],
    achievements: [
      'פסיכולוגית קלינית',
      'מחברת ספרי עזרה עצמית',
      'מרפאה במוסיקה'
    ],
    cultural: ['פסיכולוגיה', 'מוסיקה', 'כתיבה'],
    generation: 2,
    position: { x: 750, y: 550 },
    parentIds: []
  },

  // Generation 3 - Current Generation
  {
    id: 'c1',
    name: 'שירה כהן גולדברג',
    hebrewName: 'שירה בת דוד',
    birthYear: 1975,
    role: 'בת',
    spouse: 'אמיר גולדברג',
    children: ['gc1', 'gc2'],
    achievements: [
      'רופאה ילדים מובילה',
      'חוקרת ברפואת ילדים',
      'פעילה בארגוני בריאות'
    ],
    cultural: ['רפואה', 'מחקר', 'בריאות ציבור'],
    generation: 3,
    position: { x: 100, y: 750 },
    parentIds: ['p1', 'p4']
  },
  {
    id: 'c2',
    name: 'מיכאל כהן',
    hebrewName: 'מיכאל בן דוד',
    birthYear: 1978,
    role: 'בן',
    spouse: 'נועה כהן',
    children: ['gc3'],
    achievements: [
      'יזם הייטק מצליח',
      'מייסד 3 חברות',
      'מנטור לעסקים חדשים'
    ],
    cultural: ['טכנולוגיה', 'יזמות', 'חדשנות'],
    generation: 3,
    position: { x: 300, y: 750 },
    parentIds: ['p1', 'p4']
  },
  {
    id: 'c3',
    name: 'תמר לוי שפירא',
    hebrewName: 'תמר בת מרים',
    birthYear: 1980,
    role: 'בת דודה',
    spouse: 'אלי שפירא',
    children: ['gc4'],
    achievements: [
      'אדריכלית מובילה',
      'זוכת פרסי עיצוב',
      'מרצה באוניברסיטה'
    ],
    cultural: ['אדריכלות', 'עיצוב', 'אקדמיה'],
    generation: 3,
    position: { x: 500, y: 750 },
    parentIds: ['p2']
  },
  {
    id: 'c4',
    name: 'אורי כהן',
    hebrewName: 'אורי בן יצחק',
    birthYear: 1982,
    role: 'בן דוד',
    spouse: 'ליאור כהן',
    children: ['gc5', 'gc6'],
    achievements: [
      'מוסיקאי ומלחין',
      'הקליט 5 אלבומים',
      'מנצח תזמורת'
    ],
    cultural: ['מוסיקה', 'הלחנה', 'תרבות'],
    generation: 3,
    position: { x: 700, y: 750 },
    parentIds: ['p3']
  },
  {
    id: 'c5',
    name: 'גילה כהן רוזן',
    hebrewName: 'גילה בת יצחק',
    birthYear: 1985,
    role: 'בת דודה',
    spouse: 'יונתן רוזן',
    children: [],
    achievements: [
      'עיתונאית חוקרת',
      'זוכת פרס עיתונות',
      'כותבת ספרי תחקיר'
    ],
    cultural: ['עיתונות', 'תחקיר', 'כתיבה'],
    generation: 3,
    position: { x: 900, y: 750 },
    parentIds: ['p3']
  },

  // Generation 4 - Next Generation
  {
    id: 'gc1',
    name: 'אליה גולדברג',
    hebrewName: 'אליה בן שירה',
    birthYear: 2005,
    role: 'נכד',
    achievements: [
      'תלמיד מצטיין במתמטיקה',
      'זוכה באולימפיאדה',
      'מתנדב בארגון נוער'
    ],
    cultural: ['מתמטיקה', 'מדע', 'התנדבות'],
    generation: 4,
    position: { x: 50, y: 950 },
    parentIds: ['c1']
  },
  {
    id: 'gc2',
    name: 'טליה גולדברג',
    hebrewName: 'טליה בת שירה',
    birthYear: 2008,
    role: 'נכדה',
    achievements: [
      'זמרת צעירה מוכשרת',
      'משתתפת בתחרויות',
      'מנהיגה בבית ספר'
    ],
    cultural: ['מוסיקה', 'שירה', 'מנהיגות'],
    generation: 4,
    position: { x: 150, y: 950 },
    parentIds: ['c1']
  },
  {
    id: 'gc3',
    name: 'איתי כהן',
    hebrewName: 'איתי בן מיכאל',
    birthYear: 2010,
    role: 'נכד',
    achievements: [
      'ילד מוכשר בתכנות',
      'בונה אפליקציות',
      'חבר בקבוצת רובוטיקה'
    ],
    cultural: ['תכנות', 'רובוטיקה', 'טכנולוgiה'],
    generation: 4,
    position: { x: 350, y: 950 },
    parentIds: ['c2']
  },
  {
    id: 'gc4',
    name: 'מיה שפירא',
    hebrewName: 'מיה בת תמר',
    birthYear: 2012,
    role: 'נכדה',
    achievements: [
      'ילדה אמנותית מוכשרת',
      'זוכת תחרויות ציור',
      'אוהבת ספרות'
    ],
    cultural: ['אמנות', 'ציור', 'ספרות'],
    generation: 4,
    position: { x: 550, y: 950 },
    parentIds: ['c3']
  },
  {
    id: 'gc5',
    name: 'נועם כהן',
    hebrewName: 'נועם בן אורי',
    birthYear: 2014,
    role: 'נכד',
    achievements: [
      'נגן פסנתר צעיר',
      'חבר במקהלה',
      'ילד חברותי ואוהב'
    ],
    cultural: ['מוסיקה', 'פסנתר', 'מקהלה'],
    generation: 4,
    position: { x: 700, y: 950 },
    parentIds: ['c4']
  },
  {
    id: 'gc6',
    name: 'זוהר כהן',
    hebrewName: 'זוהר בת אורי',
    birthYear: 2016,
    role: 'נכדה',
    achievements: [
      'ילדה סקרנית ופעילה',
      'אוהבת בעלי חיים',
      'תלמידה מצטיינת'
    ],
    cultural: ['טבע', 'בעלי חיים', 'סקרנות'],
    generation: 4,
    position: { x: 850, y: 950 },
    parentIds: ['c4']
  }
];
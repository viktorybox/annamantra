export type ChakraId =
  | 'muladhara'
  | 'svadhisthana'
  | 'manipura'
  | 'anahata'
  | 'vishuddha'
  | 'ajna'
  | 'sahasrara';

export type QuizLocale = 'ru' | 'fr';

export type QuizOption = {
  text: string;
  chakra: ChakraId;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
};

export type QuizResult = {
  name: string;
  label: string;
  color: string;
  image: string;
  statement: string;
  practice: string;
};

const resultImages: Record<ChakraId, string> = {
  muladhara: '/images/quiz/muladhara.jpg',
  svadhisthana: '/images/quiz/svadhisthana.jpg',
  manipura: '/images/quiz/manipura.jpg',
  anahata: '/images/quiz/anahata.jpg',
  vishuddha: '/images/quiz/vishuddha.jpg',
  ajna: '/images/quiz/ajna.jpg',
  sahasrara: '/images/quiz/sahasrara.jpg',
};

const russianQuestions: QuizQuestion[] = [
  {
    question: 'Чего тебе больше всего не хватает в последнее время?',
    options: [
      { text: 'Поддержки, стабильности и чувства безопасности', chakra: 'muladhara' },
      { text: 'Лёгкости, удовольствия и живых эмоций', chakra: 'svadhisthana' },
      { text: 'Уверенности и решимости действовать', chakra: 'manipura' },
      { text: 'Тепла, близости и чувства связи', chakra: 'anahata' },
    ],
  },
  {
    question: 'Что чаще всего мешает тебе двигаться вперёд?',
    options: [
      { text: 'Я подавляю желания и откладываю радость', chakra: 'svadhisthana' },
      { text: 'Я сомневаюсь в себе и боюсь неверного шага', chakra: 'manipura' },
      { text: 'Мне трудно открываться и доверять людям', chakra: 'anahata' },
      { text: 'Я не решаюсь говорить то, что действительно думаю', chakra: 'vishuddha' },
    ],
  },
  {
    question: 'Если прислушаться к себе, чего хочется прямо сейчас?',
    options: [
      { text: 'Почувствовать внутреннюю силу и смелее проявляться', chakra: 'manipura' },
      { text: 'Разрешить себе любовь, нежность и принятие', chakra: 'anahata' },
      { text: 'Свободно выражать мысли, чувства и творчество', chakra: 'vishuddha' },
      { text: 'Яснее увидеть ситуацию и услышать интуицию', chakra: 'ajna' },
    ],
  },
  {
    question: 'Какая ситуация тебе сейчас наиболее знакома?',
    options: [
      { text: 'Я много отдаю другим и забываю о своих потребностях', chakra: 'anahata' },
      { text: 'Я многое чувствую, но не могу выразить словами', chakra: 'vishuddha' },
      { text: 'У меня много мыслей, и трудно понять, чего я хочу', chakra: 'ajna' },
      { text: 'Мне хочется больше смысла и связи', chakra: 'sahasrara' },
    ],
  },
  {
    question: 'Что ты хотела бы изменить в своём внутреннем состоянии?',
    options: [
      { text: 'Свободнее выражать себя и меньше сдерживаться', chakra: 'vishuddha' },
      { text: 'Уменьшить внутреннюю путаницу и яснее принимать решения', chakra: 'ajna' },
      { text: 'Найти больше смысла, доверия и духовной наполненности', chakra: 'sahasrara' },
      { text: 'Чувствовать больше устойчивости и спокойствия', chakra: 'muladhara' },
    ],
  },
  {
    question: 'Как ты обычно реагируешь на перемены?',
    options: [
      { text: 'Я долго анализирую и стараюсь всё предусмотреть', chakra: 'ajna' },
      { text: 'Я ищу более глубокий смысл и учусь доверять жизни', chakra: 'sahasrara' },
      { text: 'Мне нужна определённость, иначе я теряю спокойствие', chakra: 'muladhara' },
      { text: 'Когда всё меняется, я теряю контакт с желаниями и эмоциями', chakra: 'svadhisthana' },
    ],
  },
  {
    question: 'Какой подарок самой себе был бы сейчас самым ценным?',
    options: [
      { text: 'Тишина, медитация и единение с собой', chakra: 'sahasrara' },
      { text: 'Внутренняя опора и ощущение земли под ногами', chakra: 'muladhara' },
      { text: 'Больше радости, чувствительности и удовольствия', chakra: 'svadhisthana' },
      { text: 'Смелость выбрать себя и реализовать намерения', chakra: 'manipura' },
    ],
  },
];

const frenchQuestions: QuizQuestion[] = [
  {
    question: 'De quoi as-tu le plus besoin en ce moment ?',
    options: [
      { text: 'De soutien, de stabilité et de sécurité', chakra: 'muladhara' },
      { text: 'De légèreté, de plaisir et d’émotions vivantes', chakra: 'svadhisthana' },
      { text: 'De confiance et de détermination', chakra: 'manipura' },
      { text: 'De chaleur, de proximité et de lien', chakra: 'anahata' },
    ],
  },
  {
    question: 'Qu’est-ce qui t’empêche le plus souvent d’avancer ?',
    options: [
      { text: 'Je retiens mes désirs et je reporte la joie', chakra: 'svadhisthana' },
      { text: 'Je doute de moi et j’ai peur de me tromper', chakra: 'manipura' },
      { text: 'J’ai du mal à m’ouvrir et à faire confiance', chakra: 'anahata' },
      { text: 'Je n’ose pas dire ce que je pense vraiment', chakra: 'vishuddha' },
    ],
  },
  {
    question: 'Si tu t’écoutes, de quoi as-tu envie maintenant ?',
    options: [
      { text: 'Sentir ma force intérieure et oser davantage', chakra: 'manipura' },
      { text: 'Accueillir l’amour, la douceur et l’acceptation', chakra: 'anahata' },
      { text: 'Exprimer librement mes pensées, mes émotions et ma créativité', chakra: 'vishuddha' },
      { text: 'Voir plus clair et entendre mon intuition', chakra: 'ajna' },
    ],
  },
  {
    question: 'Quelle situation te ressemble le plus aujourd’hui ?',
    options: [
      { text: 'Je donne beaucoup aux autres et j’oublie mes besoins', chakra: 'anahata' },
      { text: 'Je ressens beaucoup sans trouver les mots', chakra: 'vishuddha' },
      { text: 'J’ai beaucoup de pensées et du mal à savoir ce que je veux', chakra: 'ajna' },
      { text: 'J’ai envie de plus de sens et de connexion', chakra: 'sahasrara' },
    ],
  },
  {
    question: 'Que voudrais-tu changer dans ton état intérieur ?',
    options: [
      { text: 'M’exprimer plus librement et moins me retenir', chakra: 'vishuddha' },
      { text: 'Réduire la confusion et comprendre mes décisions', chakra: 'ajna' },
      { text: 'Trouver plus de sens, de confiance et de profondeur', chakra: 'sahasrara' },
      { text: 'Me sentir plus stable et calme', chakra: 'muladhara' },
    ],
  },
  {
    question: 'Comment réagis-tu habituellement aux changements ?',
    options: [
      { text: 'J’analyse longtemps et j’essaie de tout prévoir', chakra: 'ajna' },
      { text: 'Je cherche un sens plus profond et j’apprends à faire confiance', chakra: 'sahasrara' },
      { text: 'J’ai besoin de certitude pour rester calme', chakra: 'muladhara' },
      { text: 'Quand tout change, je perds le contact avec mes désirs', chakra: 'svadhisthana' },
    ],
  },
  {
    question: 'Quel cadeau pourrais-tu t’offrir maintenant ?',
    options: [
      { text: 'Du silence, de la méditation et un retour à soi', chakra: 'sahasrara' },
      { text: 'Un soutien intérieur et les pieds sur terre', chakra: 'muladhara' },
      { text: 'Plus de joie, de sensibilité et de plaisir', chakra: 'svadhisthana' },
      { text: 'Le courage de me choisir et de réaliser mes intentions', chakra: 'manipura' },
    ],
  },
];

const russianResults: Record<ChakraId, QuizResult> = {
  muladhara: { name: 'Муладхара', label: 'Опора', color: '#d95d52', image: resultImages.muladhara, statement: 'Я имею право чувствовать себя в безопасности.', practice: 'Заземление, дыхание и мягкая практика для возвращения устойчивости.' },
  svadhisthana: { name: 'Свадхиштхана', label: 'Жизнь', color: '#e98b50', image: resultImages.svadhisthana, statement: 'Я разрешаю себе чувствовать, желать и радоваться.', practice: 'Движение, дыхание и медитация, возвращающие живость и удовольствие.' },
  manipura: { name: 'Манипура', label: 'Сила', color: '#d9ad36', image: resultImages.manipura, statement: 'Я могу выбрать себя и сделать следующий шаг.', practice: 'Крийя для воли и концентрации, а затем один бережный шаг навстречу намерению.' },
  anahata: { name: 'Анахата', label: 'Сердце', color: '#6aa56b', image: resultImages.anahata, statement: 'Я могу быть с собой бережно и с любовью.', practice: 'Медитация сердца, мягкое дыхание и маленький жест заботы о себе.' },
  vishuddha: { name: 'Вишудха', label: 'Голос', color: '#4b9eb6', image: resultImages.vishuddha, statement: 'Мой голос и моё выражение имеют значение.', practice: 'Мантра, звук и практика, которая помогает выразить то, что просится наружу.' },
  ajna: { name: 'Аджна', label: 'Ясность', color: '#4e5aa8', image: resultImages.ajna, statement: 'В тишине я могу услышать свой следующий шаг.', practice: 'Концентрация, наблюдение и внутреннее молчание.' },
  sahasrara: { name: 'Сахасрара', label: 'Связь', color: '#8d63bd', image: resultImages.sahasrara, statement: 'Я могу чувствовать глубину, смысл и связь.', practice: 'Мантра, медитация и созерцание того, что даёт тебе ощущение смысла.' },
};

const frenchResults: Record<ChakraId, QuizResult> = {
  muladhara: { name: 'Muladhara', label: 'Ancrage', color: '#d95d52', image: resultImages.muladhara, statement: 'J’ai le droit de me sentir en sécurité.', practice: 'Ancrage, respiration et pratique douce pour retrouver la stabilité.' },
  svadhisthana: { name: 'Svadhisthana', label: 'Vie', color: '#e98b50', image: resultImages.svadhisthana, statement: 'Je m’autorise à ressentir, désirer et me réjouir.', practice: 'Mouvement, respiration et méditation pour retrouver l’élan et le plaisir.' },
  manipura: { name: 'Manipura', label: 'Force', color: '#d9ad36', image: resultImages.manipura, statement: 'Je peux me choisir et faire le prochain pas.', practice: 'Une pratique de volonté et de concentration, puis un pas vers ton intention.' },
  anahata: { name: 'Anahata', label: 'Cœur', color: '#6aa56b', image: resultImages.anahata, statement: 'Je peux être douce et aimante avec moi-même.', practice: 'Méditation du cœur, respiration douce et geste de soin envers soi.' },
  vishuddha: { name: 'Vishuddha', label: 'Voix', color: '#4b9eb6', image: resultImages.vishuddha, statement: 'Ma voix et mon expression comptent.', practice: 'Mantra, son et pratique pour exprimer ce qui demande à être entendu.' },
  ajna: { name: 'Ajna', label: 'Clarté', color: '#4e5aa8', image: resultImages.ajna, statement: 'Dans le silence, je peux entendre mon prochain pas.', practice: 'Concentration, observation et silence intérieur.' },
  sahasrara: { name: 'Sahasrara', label: 'Connexion', color: '#8d63bd', image: resultImages.sahasrara, statement: 'Je peux ressentir la profondeur, le sens et le lien.', practice: 'Mantra, méditation et contemplation de ce qui donne du sens.' },
};

export const quizCopy = {
  ru: {
    eyebrow: '2 минуты для себя',
    title: 'Какая чакра просит твоего внимания?',
    intro: '7 вопросов, чтобы мягко заметить тему, которая сильнее всего откликается сейчас.',
    next: 'Дальше',
    back: 'Назад',
    finish: 'Узнать результат',
    restart: 'Пройти ещё раз',
    channel: 'Перейти в Telegram-канал',
    resultEyebrow: 'Твой результат',
    disclaimer: 'Это инструмент саморефлексии, а не диагностика и не оценка энергетического состояния.',
    storageNotice: 'Ответы сохраняются только в этом браузере, чтобы можно было вернуться к квизу.',
  },
  fr: {
    eyebrow: '2 minutes pour toi',
    title: 'Quel chakra demande ton attention ?',
    intro: '7 questions pour remarquer doucement le thème qui résonne le plus en toi aujourd’hui.',
    next: 'Suivant',
    back: 'Retour',
    finish: 'Voir mon résultat',
    restart: 'Recommencer',
    channel: 'Rejoindre le canal Telegram',
    resultEyebrow: 'Ton résultat',
    disclaimer: 'Cet outil invite à la réflexion personnelle. Il ne constitue ni un diagnostic ni une évaluation énergétique.',
    storageNotice: 'Tes réponses restent dans ce navigateur pour te permettre de reprendre le quiz.',
  },
} as const;

export const getQuizData = (locale: QuizLocale) => ({
  questions: locale === 'ru' ? russianQuestions : frenchQuestions,
  results: locale === 'ru' ? russianResults : frenchResults,
  copy: quizCopy[locale],
});

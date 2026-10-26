import type { Locale } from './site';

// FAQ is intentionally versioned with the site, outside the CMS.
export const faq = {
  ru: {
    eyebrow: 'Частые вопросы',
    title: 'Перед первой практикой',
    intro: 'Короткие ответы помогут понять формат участия. Подробности конкретной встречи появятся при открытии записи.',
    items: [
      { question: 'Нужно ли иметь опыт Кундалини-йоги?', answer: 'Нет. Для знакомства с форматом не требуется предварительный опыт. Перед встречей Анна объяснит, как она проходит.' },
      { question: 'Чем активация Кундалини отличается от Кундалини-йоги?', answer: 'В йоге используются движения, дыхательные упражнения, медитации и мантры. Активация в подходе Анны строится вокруг музыкального процесса и внимания к внутренним ощущениям.' },
      { question: 'Как подготовиться к онлайн-сессии?', answer: 'Выдели время без спешки, найди спокойное место и проверь подключение к интернету. Точные рекомендации будут указаны перед конкретной встречей.' },
      { question: 'Что понадобится для участия?', answer: 'Место, где тебе удобно расположиться, и устройство для подключения к онлайн-встрече. Остальные детали Анна сообщит при записи.' },
      { question: 'Обязательно ли что-то чувствовать во время практики?', answer: 'Нет. Ощущения и переживания индивидуальны. Не нужно сравнивать свой опыт с чужим или ожидать определённого результата.' },
      { question: 'Как записаться на групповую активацию?', answer: 'Когда откроется набор, здесь появятся даты и ссылка на регистрацию через Telegram-бота. Перед подтверждением записи ты увидишь условия участия.' },
      { question: 'Как проходит индивидуальная сессия?', answer: 'Формат обсуждается с Анной с учётом твоего запроса. Время, стоимость и условия участия будут известны до подтверждения записи.' },
      { question: 'Как работает донат за групповую практику?', answer: 'Участие предполагает добровольный донат. Способ перевода и условия будут опубликованы до открытия записи; платёж на этом сайте не проводится.' },
      { question: 'Есть ли ограничения по здоровью?', answer: 'Если у тебя есть заболевание, травма, беременность или сомнения в безопасности практики, обсуди участие со своим врачом и сообщи Анне о своих потребностях. Практика не заменяет медицинскую помощь.' },
    ],
  },
  fr: {
    eyebrow: 'Questions fréquentes',
    title: 'Avant ta première pratique',
    intro: 'Ces réponses présentent les formats. Les détails de chaque rencontre seront communiqués à l’ouverture des inscriptions.',
    items: [
      { question: 'Faut-il avoir déjà pratiqué le yoga Kundalini ?', answer: 'Non. Une expérience préalable n’est pas nécessaire pour découvrir ce format. Anna expliquera le déroulement avant la séance.' },
      { question: 'Quelle est la différence entre l’activation et le yoga Kundalini ?', answer: 'Le yoga utilise le mouvement, la respiration, la méditation et les mantras. Dans l’approche d’Anna, l’activation s’appuie sur un parcours musical et l’attention aux sensations intérieures.' },
      { question: 'Comment préparer une séance en ligne ?', answer: 'Réserve un moment sans précipitation, installe-toi dans un endroit calme et vérifie ta connexion. Les consignes précises seront fournies avant la rencontre.' },
      { question: 'De quoi ai-je besoin pour participer ?', answer: 'D’un endroit où tu peux t’installer confortablement et d’un appareil pour rejoindre la séance en ligne. Anna précisera le reste lors de l’inscription.' },
      { question: 'Dois-je ressentir quelque chose pendant la pratique ?', answer: 'Non. Chaque expérience est personnelle. Il n’y a ni sensation obligatoire ni résultat garanti.' },
      { question: 'Comment rejoindre une activation en groupe ?', answer: 'Les dates et le lien d’inscription via le bot Telegram seront affichés ici à l’ouverture des réservations. Tu connaîtras les conditions avant de confirmer.' },
      { question: 'Comment se déroule une séance individuelle ?', answer: 'Le format est discuté avec Anna selon ta demande. L’horaire, le tarif et les conditions seront connus avant la confirmation.' },
      { question: 'Comment fonctionne le don libre pour le groupe ?', answer: 'La participation se fait sur la base d’un don volontaire. Les modalités seront publiées avant les inscriptions ; aucun paiement n’est traité sur ce site.' },
      { question: 'Y a-t-il des précautions de santé ?', answer: 'Si tu as une maladie, une blessure, si tu es enceinte ou si tu as un doute, parle de ta participation avec un professionnel de santé et informe Anna de tes besoins. La pratique ne remplace pas des soins médicaux.' },
    ],
  },
} as const;

export const getFaq = (locale: Locale) => faq[locale];

import { defineField, defineType } from 'sanity';

const language = () => defineField({
  name: 'language', title: 'Язык', type: 'string', initialValue: 'ru',
  options: { list: [{ title: 'Русский', value: 'ru' }, { title: 'Français', value: 'fr' }], layout: 'radio' },
  validation: (Rule) => Rule.required(),
});
const externalUrl = (name: string, title: string) => defineField({
  name, title, type: 'url', validation: (Rule) => Rule.uri({ scheme: ['https'] }),
});
const text = (name: string, title: string, rows = 3) => defineField({ name, title, type: 'text', rows });

export const schemaTypes = [
  defineType({
    name: 'siteSettings', title: 'Ссылки, цена и контакты', type: 'document',
    fields: [
      externalUrl('groupRegistration', 'Telegram-бот: групповая запись'),
      externalUrl('individualRegistration', 'Telegram-бот: индивидуальная запись'),
      externalUrl('telegramChannel', 'Бесплатный Telegram-канал'),
      externalUrl('donation', 'Добровольный донат'),
      defineField({ name: 'individualPrice', title: 'Стоимость индивидуальной сессии', description: 'С валютой, например: 60 €', type: 'string' }),
      defineField({ name: 'contactEmail', title: 'Контактный email', type: 'string', validation: (Rule) => Rule.email() }),
    ],
    preview: { prepare: () => ({ title: 'Ссылки, цена и контакты' }) },
  }),
  defineType({
    name: 'homePage', title: 'Тексты главной', type: 'document',
    fields: [
      language(),
      defineField({ name: 'heroTitle', title: 'Первый экран: заголовок', type: 'string' }),
      defineField({ name: 'heroAccent', title: 'Первый экран: бирюзовая строка', type: 'string' }),
      text('heroBody', 'Первый экран: описание'),
      defineField({ name: 'heroImage', title: 'Портрет Анны', type: 'image', options: { hotspot: true } }),
      defineField({ name: 'aboutTitle', title: 'Об Анне: заголовок', type: 'string' }),
      text('aboutBody', 'Об Анне: вводный текст'),
      defineField({ name: 'practiceGroupTitle', title: 'Групповой формат: название', type: 'string' }),
      text('practiceGroupBody', 'Групповой формат: описание'),
      defineField({ name: 'practiceIndividualTitle', title: 'Индивидуальный формат: название', type: 'string' }),
      text('practiceIndividualBody', 'Индивидуальный формат: описание'),
      text('activationBody', 'Об активации: основной текст', 5),
      text('yogaBody', 'О йоге: основной текст', 5),
      text('finalBody', 'Финальное приглашение'),
    ],
    preview: { select: { language: 'language' }, prepare: ({ language: value }) => ({ title: value === 'fr' ? 'Главная — Français' : 'Главная — Русский' }) },
  }),
  defineType({
    name: 'blogPost', title: 'Статья', type: 'document',
    fields: [
      language(),
      defineField({ name: 'title', title: 'Заголовок', type: 'string', validation: (Rule) => Rule.required() }),
      defineField({ name: 'slug', title: 'Адрес статьи', type: 'slug', options: { source: 'title', maxLength: 100 }, validation: (Rule) => Rule.required().custom((value) => !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) ? true : 'Используй латинские буквы, цифры и дефисы') }),
      defineField({ name: 'seoTitle', title: 'Title для поисковиков', type: 'string', validation: (Rule) => Rule.required().max(90) }),
      defineField({ name: 'description', title: 'Описание для поисковиков', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(180) }),
      defineField({ name: 'excerpt', title: 'Краткое описание в списке статей', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
      defineField({ name: 'publishedAt', title: 'Дата публикации', type: 'datetime', validation: (Rule) => Rule.required() }),
      defineField({ name: 'body', title: 'Текст статьи', type: 'array', of: [
        { type: 'block', styles: [{ title: 'Абзац', value: 'normal' }, { title: 'Заголовок 2', value: 'h2' }, { title: 'Заголовок 3', value: 'h3' }, { title: 'Цитата', value: 'blockquote' }],
          marks: { decorators: [{ title: 'Жирный', value: 'strong' }, { title: 'Курсив', value: 'em' }], annotations: [{ name: 'link', title: 'Ссылка', type: 'object', fields: [externalUrl('href', 'URL')] }] } },
        { type: 'image', fields: [{ name: 'alt', title: 'Описание изображения', type: 'string', validation: (Rule) => Rule.required() }] },
      ], validation: (Rule) => Rule.required().min(1) }),
      defineField({ name: 'translation', title: 'Соответствующая статья на другом языке', type: 'reference', to: [{ type: 'blogPost' }] }),
    ],
    preview: { select: { title: 'title', subtitle: 'language' } },
  }),
  defineType({
    name: 'sessionSlot', title: 'Дата сессии', type: 'document',
    fields: [
      language(),
      defineField({ name: 'title', title: 'Название', type: 'string', validation: (Rule) => Rule.required() }),
      defineField({ name: 'startsAt', title: 'Начало', type: 'datetime', validation: (Rule) => Rule.required() }),
      defineField({ name: 'timeZone', title: 'Часовой пояс', description: 'Например: Europe/Paris', type: 'string', initialValue: 'Europe/Paris', validation: (Rule) => Rule.required().custom((value) => { try { new Intl.DateTimeFormat('fr', { timeZone: value }); return true; } catch { return 'Нужен действительный часовой пояс IANA'; } }) }),
      defineField({ name: 'status', title: 'Статус', type: 'string', initialValue: 'available', options: { list: [{ title: 'Открыта запись', value: 'available' }, { title: 'Мест нет', value: 'full' }, { title: 'Отменена', value: 'cancelled' }] }, validation: (Rule) => Rule.required() }),
      externalUrl('registrationUrl', 'Запись на эту дату через бота'),
    ],
    preview: { select: { title: 'title', subtitle: 'startsAt' } },
  }),
  defineType({
    name: 'testimonial', title: 'Отзыв', type: 'document',
    fields: [
      language(),
      defineField({ name: 'name', title: 'Имя участника', type: 'string', validation: (Rule) => Rule.required() }),
      text('quote', 'Текст отзыва', 5),
      defineField({ name: 'video', title: 'Видеоотзыв MP4', type: 'file', options: { accept: 'video/mp4' } }),
      defineField({ name: 'poster', title: 'Обложка видео', type: 'image' }),
      defineField({ name: 'approved', title: 'Есть разрешение участника на публикацию', type: 'boolean', initialValue: false }),
      defineField({ name: 'orderRank', title: 'Порядок', type: 'number', initialValue: 0 }),
    ],
    preview: { select: { title: 'name', subtitle: 'language' } },
  }),
];

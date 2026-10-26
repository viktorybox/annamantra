import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId) throw new Error('Укажи SANITY_STUDIO_PROJECT_ID в studio/.env');

export default defineConfig({
  name: 'anna-mantra',
  title: 'Анна Мантра — содержимое сайта',
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({
    structure: (S) => S.list().title('Сайт').items([
      S.listItem().title('Ссылки, цена и контакты').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.documentTypeListItem('homePage').title('Тексты главной'),
      S.documentTypeListItem('blogPost').title('Статьи'),
      S.documentTypeListItem('sessionSlot').title('Расписание'),
      S.documentTypeListItem('testimonial').title('Отзывы'),
    ]),
  })],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (previous) => previous.filter((item) => item.templateId !== 'siteSettings'),
    actions: (previous, context) => context.schemaType === 'siteSettings'
      ? previous.filter((item) => item.action !== 'delete' && item.action !== 'duplicate') : previous,
  },
});

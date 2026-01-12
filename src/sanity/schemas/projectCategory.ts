import { defineType, defineField } from 'sanity';

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Category Key',
      type: 'string',
      description: 'Unique identifier (e.g., kitchen, bathroom, flooring, decking)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ko', title: '한국어', type: 'string' },
        { name: 'zh', title: '中文', type: 'string' },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ko', title: '한국어', type: 'text' },
        { name: 'zh', title: '中文', type: 'text' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      key: 'key',
    },
    prepare({ title, key }) {
      return {
        title: title || key,
        subtitle: key,
      };
    },
  },
});

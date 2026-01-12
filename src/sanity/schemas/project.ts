import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // 기본 정보
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'object',
      description: '다국어 프로젝트 제목',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'ko', title: '한국어', type: 'string' },
        { name: 'zh', title: '中文', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      description: '다국어 프로젝트 설명',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'ko', title: '한국어', type: 'text', rows: 3 },
        { name: 'zh', title: '中文', type: 'text', rows: 3 },
      ],
    }),

    // 카테고리
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Bathroom', value: 'bathroom' },
          { title: 'Flooring', value: 'flooring' },
          { title: 'Decking', value: 'decking' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // 위치 및 기간
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Bethesda, MD',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g., 2024',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ko', title: '한국어', type: 'string' },
        { name: 'zh', title: '中文', type: 'string' },
      ],
    }),

    // 이미지
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: '대표 이미지',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'ko', title: '한국어', type: 'string' },
                { name: 'zh', title: '中文', type: 'string' },
              ],
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'ko', title: '한국어', type: 'string' },
                { name: 'zh', title: '中文', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),

    // 상세 정보
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'ko', title: '한국어', type: 'string' },
            { name: 'zh', title: '中文', type: 'string' },
          ],
        },
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'ko', title: '한국어', type: 'string' },
            { name: 'zh', title: '中文', type: 'string' },
          ],
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'text', rows: 2 },
            { name: 'ko', title: '한국어', type: 'text', rows: 2 },
            { name: 'zh', title: '中文', type: 'text', rows: 2 },
          ],
        },
      ],
    }),

    // 표시 순서
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),

    // 게시 상태
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: '체크하면 웹사이트에 표시됩니다',
      initialValue: true,
    }),
  ],

  // 미리보기 설정
  preview: {
    select: {
      title: 'title.en',
      category: 'category',
      location: 'location',
      media: 'mainImage',
      isPublished: 'isPublished',
    },
    prepare({ title, category, location, media, isPublished }) {
      return {
        title: title || 'Untitled Project',
        subtitle: `${category} • ${location} ${isPublished ? '✓' : '(Draft)'}`,
        media,
      };
    },
  },

  // 정렬
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
    {
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
});

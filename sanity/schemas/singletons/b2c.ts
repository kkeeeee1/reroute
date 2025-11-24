import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'b2c',
  title: 'Labs(B2C)',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO 설정',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: '메타 제목',
          type: 'string',
          description: '검색 엔진용 제목입니다 (기본값: 페이지 제목)',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: '메타 설명',
          type: 'string',
          description: '검색 엔진용 설명입니다',
          validation: (rule) => rule.required().max(160),
        }),
        defineField({
          name: 'keywords',
          title: '키워드',
          type: 'array',
          of: [{type: 'string'}],
          description: 'SEO 키워드입니다 (선택사항)',
        }),
        defineField({
          name: 'ogImage',
          title: '오픈 그래프 이미지',
          type: 'image',
          description: '소셜 미디어 공유용 이미지입니다',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Labs(B2C)',
        subtitle: 'SEO 설정',
      }
    },
  },
})

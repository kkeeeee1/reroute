import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'defaultSeo',
      title: '기본 SEO 정보',
      type: 'object',
      description: 'SEO 정보를 입력하지 않은 페이지에 적용될 기본 값입니다.',
      fields: [
        defineField({
          name: 'metaTitle',
          title: '기본 메타 제목',
          type: 'string',
          description: '검색 엔진에 표시될 기본 제목입니다.',
        }),
        defineField({
          name: 'metaDescription',
          title: '기본 메타 설명',
          type: 'string',
          description: '검색 엔진에 표시될 기본 설명입니다.',
        }),
        defineField({
          name: 'keywords',
          title: '기본 키워드',
          type: 'array',
          of: [{type: 'string'}],
          description: '기본 SEO 키워드입니다.',
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: '기본 오픈 그래프 이미지',
      type: 'image',
      description: '페이지에 자체 OG 이미지가 없을 때 소셜 카드에 표시되는 기본 이미지입니다.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
        subtitle: '기본 SEO 정보 및 이미지 설정',
      }
    },
  },
})

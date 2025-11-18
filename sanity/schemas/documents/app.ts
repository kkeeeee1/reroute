import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'app',
  title: 'App',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'appId',
      title: '앱 ID',
      type: 'string',
      description: '자동으로 생성되는 고유한 ID입니다.',
      initialValue: () => Math.random().toString(36).substring(2, 11),
      readOnly: true,
    }),
    defineField({
      name: 'name',
      title: '앱 이름',
      type: 'string',
      description: '앱의 공식 이름입니다.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: '앱 한줄 요약',
      type: 'string',
      description: '리스트에서 보여줄 한줄 요약 설명입니다.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: '앱 대표 이미지',
      type: 'image',
      description: '대표 이미지입니다. 없는 경우 기본 이미지가 표시됩니다.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: '앱 상세 설명',
      type: 'array',
      description: '텍스트와 이미지를 혼합하여 상세 콘텐츠를 작성합니다.',
      of: [
        defineArrayMember({
          lists: [
            {title: '목록', value: 'bullet'},
            {title: '번호 매기기', value: 'number'},
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: '링크',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
            decorators: [
              {
                title: '굵게',
                value: 'strong',
              },
              {
                title: '이탤릭',
                value: 'em',
              },
              {
                title: '밑줄',
                value: 'underline',
              },
              {
                title: '취소선',
                value: 'strike-through',
              },
              {
                title: '코드',
                value: 'code',
              },
            ],
          },
          styles: [
            {title: '일반 텍스트', value: 'normal'},
            {title: '제목 1', value: 'h1'},
            {title: '제목 2', value: 'h2'},
            {title: '제목 3', value: 'h3'},
            {title: '인용문', value: 'blockquote'},
          ],
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'createdAt',
      title: '작성 시각',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'thumbnail',
    },
    prepare({title, media}) {
      return {
        title,
        media,
        subtitle: 'App',
      }
    },
  },
})

import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'workId',
      title: '작업 ID',
      type: 'string',
      description: '자동으로 생성되는 고유한 ID입니다.',
      initialValue: () => Math.random().toString(36).substring(2, 11),
      readOnly: true,
    }),
    defineField({
      name: 'name',
      title: '프로젝트 이름',
      type: 'string',
      description: '프로젝트의 이름입니다.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: '프로젝트 한줄 요약',
      type: 'string',
      description: '리스트에서 보여줄 한줄 요약 설명입니다.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: '프로젝트 대표 이미지',
      type: 'image',
      description: '대표 이미지입니다. 없는 경우 기본 이미지가 표시됩니다.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'startDate',
      title: '프로젝트 시작 시점',
      type: 'date',
      description: '시작일입니다. 월(month)까지만 표시됩니다.',
      options: {
        dateFormat: 'YYYY-MM',
        calendarTodayLabel: '오늘',
      },
    }),
    defineField({
      name: 'endDate',
      title: '프로젝트 종료 시점',
      type: 'date',
      description: '종료일입니다. 월(month)까지만 표시됩니다.',
      options: {
        dateFormat: 'YYYY-MM',
        calendarTodayLabel: '오늘',
      },
    }),
    defineField({
      name: 'role',
      title: '역할',
      type: 'text',
      description: '리루트에서 맡은 역할을 기록합니다.',
    }),
    defineField({
      name: 'content',
      title: '프로젝트 상세 설명',
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
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({title, media, startDate, endDate}) {
      const dateRange = [startDate, endDate].filter(Boolean).join(' - ')

      return {
        title,
        media,
        subtitle: dateRange || 'Work',
      }
    },
  },
})

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'milestone',
  title: 'Milestone',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: '제목',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'description',
      title: '설명',
    }),
    defineField({
      name: 'image',
      title: '이미지',
      type: 'image',
      description: '이 이미지는 마일스톤의 커버 이미지로 사용됩니다.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      title: '태그',
      type: 'array',
      description:
        '마일스톤을 분류하는 데 도움이 되는 태그입니다. 예: 대학 과정명, 프로젝트명, 프로젝트 내 직책 등',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      type: 'duration',
      name: 'duration',
      title: '기간',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      duration: 'duration',
      image: 'image',
      title: 'title',
    },
    prepare({duration, image, title}) {
      return {
        media: image,
        subtitle: [
          duration?.start && new Date(duration.start).getFullYear(),
          duration?.end && new Date(duration.end).getFullYear(),
        ]
          .filter(Boolean)
          .join(' - '),
        title,
      }
    },
  },
})

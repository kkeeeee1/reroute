import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'object',
  fields: [
    {
      name: 'items',
      title: '항목',
      description:
        '페이지 본문에 표시할 타임라인을 생성할 수 있습니다 (최대 2개)',
      type: 'array',
      validation: (Rule) => Rule.max(2),
      of: [
        {
          name: 'item',
          title: '항목',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: '제목',
              type: 'string',
            }),
            {
              name: 'milestones',
              title: '마일스톤',
              type: 'array',
              of: [
                defineField({
                  name: 'milestone',
                  title: '마일스톤',
                  type: 'milestone',
                }),
              ],
            },
          ],
          preview: {
            select: {
              items: 'milestones',
              title: 'title',
            },
            prepare({items, title}) {
              const hasItems = items && items.length > 0
              const milestoneNames = hasItems && items.map((timeline) => timeline.title).join(', ')

              return {
                subtitle: hasItems
                  ? `${milestoneNames} (${items.length} item${items.length > 1 ? 's' : ''})`
                  : 'No milestones',
                title,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}: {items: {title: string}[]}) {
      const hasItems = items && items.length > 0
      const timelineNames = hasItems && items.map((timeline) => timeline.title).join(', ')

      return {
        title: 'Timelines',
        subtitle: hasItems
          ? `${timelineNames} (${items.length} item${items.length > 1 ? 's' : ''})`
          : 'No timelines',
      }
    },
  },
})

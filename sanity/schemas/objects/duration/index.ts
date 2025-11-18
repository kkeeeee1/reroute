import {defineField} from 'sanity'
import {DurationInput} from './DurationInput'

export default defineField({
  type: 'object',
  name: 'duration',
  title: '기간',
  components: {
    input: DurationInput,
  },
  fields: [
    defineField({
      type: 'datetime',
      name: 'start',
      title: '시작',
    }),
    defineField({
      type: 'datetime',
      name: 'end',
      title: '종료',
    }),
  ],
})

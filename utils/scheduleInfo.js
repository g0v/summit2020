import dayjs from 'dayjs'

export const VALID_DATE_LIST = ['2020-12-03', '2020-12-04', '2020-12-05', '2020-12-06']

const today = dayjs().format('YYYY-MM-DD')
let defaultDate = '2020-12-04'
// during Day 1 ~ Day 3, set default day as current date
if (VALID_DATE_LIST.slice(1).includes(today)) {
  defaultDate = today
}
export const DEFAULT_DATE = defaultDate

let startDate = dayjs(VALID_DATE_LIST[1])
let endDate = dayjs(VALID_DATE_LIST[VALID_DATE_LIST.length - 1]).add(1, 'day')

if (!process.env.SITE_BASE.endsWith('/2020')) {
  startDate = dayjs()
  endDate = startDate.add('3', 'day')
}

const dayBeforeStart = startDate.subtract(1, 'day')

const now = dayjs()

export const ALLOW_DECL_HEALTH = (now >= dayBeforeStart && now <= endDate)
export const ALLOW_CHECK_IN = (now >= startDate && now <= endDate)

import dayjs from 'dayjs'

export const DEFAULT_DATE = '2020-12-04'
export const VALID_DATE_LIST = ['2020-12-04', '2020-12-05', '2020-12-06']

let startDate = dayjs(VALID_DATE_LIST[0])
let endDate = dayjs(VALID_DATE_LIST[VALID_DATE_LIST.length - 1]).add(1, 'day')

if (!process.env.SITE_BASE.endsWith('/2020')) {
  startDate = dayjs()
  endDate = startDate.add('2', 'day')
}

const dayBeforeStart = startDate.subtract(1, 'day')

const now = dayjs()

export const ALLOW_DECL_HEALTH = (now >= dayBeforeStart && now <= endDate)
export const ALLOW_CHECK_IN = (now >= startDate && now <= endDate)

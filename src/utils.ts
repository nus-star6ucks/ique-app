import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { QueueApi, StoreApi, UserApi } from './api'

dayjs.extend(relativeTime)

const API_BASEURL = 'https://mock.apifox.cn/m1/1701091-0-default'
const API_UMS_URL = 'https://mock.apifox.cn/m1/1701091-0-9ec0a847'

const accessToken = localStorage.getItem('token') || ''

export const storeApi = new StoreApi({
  accessToken,
}, API_BASEURL)
export const queueApi = new QueueApi({
  accessToken,
}, API_BASEURL)
export const userApi = new UserApi({
  accessToken,
}, API_UMS_URL)

export const humanEstimateTime = (secs: number) => {
  const HOUR = 60 * 60
  const MIN = 60
  if (secs > HOUR)
    return `${(secs / HOUR).toFixed(1)} hrs`
  if (secs > MIN && secs < HOUR)
    return `${(secs / MIN).toFixed(1)} mins`
  return '1 min'
}

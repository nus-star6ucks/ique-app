import axios from 'axios'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { NotificationApi, QueueApi, StoreApi, UserApi } from './api'

dayjs.extend(relativeTime)

// const API_BASEURL = 'https://mock.apifox.cn/m1/1701091-0-default'
// const API_UMS_URL = 'https://mock.apifox.cn/m1/1701091-0-9ec0a847'
// const API_SMS_URL = 'https://mock.apifox.cn/m1/1701091-0-b519d081'

const API_BASEURL = '/api'
const API_UMS_URL = '/api'
const API_SMS_URL = '/api'

const accessToken = localStorage.getItem('token') || ''
if (accessToken.trim())
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401 && accessToken) {
    localStorage.removeItem('token')
    return error.response
  }

  return Promise.reject(error)
})

export const storeApi = new StoreApi({}, API_SMS_URL)
export const queueApi = new QueueApi({}, API_BASEURL)
export const notificationApi = new NotificationApi({}, API_BASEURL)
export const userApi = new UserApi({}, API_UMS_URL)

export const humanEstimateTime = (secs: number) => {
  const HOUR = 60 * 60
  const MIN = 60
  if (secs > HOUR)
    return `${(secs / HOUR).toFixed(1)} hrs`
  if (secs > MIN && secs < HOUR)
    return `${(secs / MIN).toFixed(1)} mins`
  return '1 min'
}

export const generateULong = () => +`${+Date.now()}${Math.floor(Math.random() * 1000)}`

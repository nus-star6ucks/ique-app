import axios from 'axios'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import xss from 'xss'
import argon2 from 'argon2-wasm-esm'
import { NotificationApi, QueueApi, StoreApi, UserApi } from './api'
dayjs.extend(relativeTime)

// const API_BASEURL = 'https://mock.apifox.cn/m1/1701091-0-default'
// const API_UMS_URL = 'https://mock.apifox.cn/m1/1701091-0-9ec0a847'
// const API_SMS_URL = 'https://mock.apifox.cn/m1/1701091-0-b519d081'

const API_BASEURL = '/api'
const API_UMS_URL = '/api'
const API_SMS_URL = '/api'

const storeApi = new StoreApi({}, API_SMS_URL)
const queueApi = new QueueApi({}, API_BASEURL)
const notificationApi = new NotificationApi({}, API_BASEURL)
const userApi = new UserApi({}, API_UMS_URL)

const accessToken = localStorage.getItem('token') || ''
if (accessToken.trim())
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`

axios.interceptors.response.use((response) => {
  return response
}, async (error) => {
  if (error.response.status === 401 && accessToken) {
    try {
      const { data: refreshTokenData }: any = await userApi.usersRefreshGet()
      if (refreshTokenData?.token) {
        localStorage.setItem('token', refreshTokenData.token)
        window.location.reload()
      }
    }
    catch {
      localStorage.removeItem('token')
    }
    return error.response
  }

  return Promise.reject(error)
})

const humanEstimateTime = (mins: number) => {
  const HOUR = 60
  if (mins > HOUR)
    return `${(mins / HOUR).toFixed(1)} hrs`
  if (mins > 1)
    return `${mins} mins`
  return '1 min'
}

const generateULong = () => Number(`${Number(Date.now())}${Math.floor(Math.random() * 1000)}`)

const sanitize = (payload: Record<string, unknown>) => Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, typeof v === 'string' ? xss(v) : v]))

const hash = async (plain: string) => (await argon2.hash({ pass: plain, salt: import.meta.env.VITE_HASH_SALT })).encoded

export { storeApi, queueApi, notificationApi, userApi, humanEstimateTime, generateULong, sanitize, hash }

import { QueueApi, StoreApi, UserApi } from './api'

const API_BASEURL = 'https://mock.apifox.cn/m1/1701091-0-default'

const accessToken = localStorage.getItem('token') || ''

export const storeApi = new StoreApi({
  accessToken,
}, API_BASEURL)
export const queueApi = new QueueApi({
  accessToken,
}, API_BASEURL)
export const userApi = new UserApi({
  accessToken,
}, API_BASEURL)


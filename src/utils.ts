import { QueueApi, StoreApi, UserApi } from './api'

const API_BASEURL = 'https://mock.apifox.cn/m1/1701091-0-default'

export const storeApi = new StoreApi({}, API_BASEURL)
export const queueApi = new QueueApi({}, API_BASEURL)
export const userApi = new UserApi({}, API_BASEURL)

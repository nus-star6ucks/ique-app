import { QueueApi, StoreApi } from './api'

const API_BASEURL = 'https://mock.apifox.cn/m1/1701091-0-default'

export const storeApi = new StoreApi({}, API_BASEURL)
export const queueApi = new QueueApi({}, API_BASEURL)

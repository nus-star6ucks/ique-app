// tslint:disable
/**
 * iQueue
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as globalImportUrl from 'url';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { InlineObject3 } from '../models';
// @ts-ignore
import { InlineObject4 } from '../models';
// @ts-ignore
import { InlineResponse2003 } from '../models';
// @ts-ignore
import { InlineResponse2005 } from '../models';
// @ts-ignore
import { InlineResponse2011 } from '../models';
// @ts-ignore
import { InlineResponse401 } from '../models';
// @ts-ignore
import { InlineResponse409 } from '../models';
// @ts-ignore
import { Store } from '../models';
/**
 * StoreApi - axios parameter creator
 * @export
 */
export const StoreApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Delete Store
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesDelete: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling storesDelete.');
            }
            const localVarPath = `/stores`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Stores
         * @param {number} [userId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesGet: async (userId?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/stores`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (userId !== undefined) {
                localVarQueryParameter['userId'] = userId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Stores List (Home)
         * @param {number} [userId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesListGet: async (userId?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/stores/list`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (userId !== undefined) {
                localVarQueryParameter['userId'] = userId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Create Store
         * @param {InlineObject4} [inlineObject4] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesPost: async (inlineObject4?: InlineObject4, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/stores`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject4 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject4 !== undefined ? inlineObject4 : {}) : (inlineObject4 || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update Store Info
         * @param {InlineObject3} [inlineObject3] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesPut: async (inlineObject3?: InlineObject3, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/stores`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject3 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject3 !== undefined ? inlineObject3 : {}) : (inlineObject3 || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Start Service
         * @param {number} storeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesStartPost: async (storeId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            if (storeId === null || storeId === undefined) {
                throw new RequiredError('storeId','Required parameter storeId was null or undefined when calling storesStartPost.');
            }
            const localVarPath = `/stores/start`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (storeId !== undefined) {
                localVarQueryParameter['storeId'] = storeId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Stop Service
         * @param {number} storeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesStopPost: async (storeId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            if (storeId === null || storeId === undefined) {
                throw new RequiredError('storeId','Required parameter storeId was null or undefined when calling storesStopPost.');
            }
            const localVarPath = `/stores/stop`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (storeId !== undefined) {
                localVarQueryParameter['storeId'] = storeId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Store Detail
         * @param {number} storeId storeId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesStoreIdGet: async (storeId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            if (storeId === null || storeId === undefined) {
                throw new RequiredError('storeId','Required parameter storeId was null or undefined when calling storesStoreIdGet.');
            }
            const localVarPath = `/stores/{storeId}`
                .replace(`{${"storeId"}}`, encodeURIComponent(String(storeId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * StoreApi - functional programming interface
 * @export
 */
export const StoreApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Delete Store
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storesDelete(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await StoreApiAxiosParamCreator(configuration).storesDelete(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Get Stores
         * @param {number} [userId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storesGet(userId?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Store>>> {
            const localVarAxiosArgs = await StoreApiAxiosParamCreator(configuration).storesGet(userId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Get Stores List (Home)
         * @param {number} [userId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storesListGet(userId?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Store>>> {
            const localVarAxiosArgs = await StoreApiAxiosParamCreator(configuration).storesListGet(userId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Create Store
         * @param {InlineObject4} [inlineObject4] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storesPost(inlineObject4?: InlineObject4, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2011>> {
            const localVarAxiosArgs = await StoreApiAxiosParamCreator(configuration).storesPost(inlineObject4, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Update Store Info
         * @param {InlineObject3} [inlineObject3] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storesPut(inlineObject3?: InlineObject3, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2003>> {
            const localVarAxiosArgs = await StoreApiAxiosParamCreator(configuration).storesPut(inlineObject3, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Start Service
         * @param {number} storeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storesStartPost(storeId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await StoreApiAxiosParamCreator(configuration).storesStartPost(storeId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Stop Service
         * @param {number} storeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storesStopPost(storeId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await StoreApiAxiosParamCreator(configuration).storesStopPost(storeId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Get Store Detail
         * @param {number} storeId storeId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storesStoreIdGet(storeId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2005>> {
            const localVarAxiosArgs = await StoreApiAxiosParamCreator(configuration).storesStoreIdGet(storeId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * StoreApi - factory interface
 * @export
 */
export const StoreApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Delete Store
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesDelete(id: number, options?: any): AxiosPromise<object> {
            return StoreApiFp(configuration).storesDelete(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Stores
         * @param {number} [userId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesGet(userId?: number, options?: any): AxiosPromise<Array<Store>> {
            return StoreApiFp(configuration).storesGet(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Stores List (Home)
         * @param {number} [userId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesListGet(userId?: number, options?: any): AxiosPromise<Array<Store>> {
            return StoreApiFp(configuration).storesListGet(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Create Store
         * @param {InlineObject4} [inlineObject4] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesPost(inlineObject4?: InlineObject4, options?: any): AxiosPromise<InlineResponse2011> {
            return StoreApiFp(configuration).storesPost(inlineObject4, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update Store Info
         * @param {InlineObject3} [inlineObject3] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesPut(inlineObject3?: InlineObject3, options?: any): AxiosPromise<InlineResponse2003> {
            return StoreApiFp(configuration).storesPut(inlineObject3, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Start Service
         * @param {number} storeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesStartPost(storeId: number, options?: any): AxiosPromise<object> {
            return StoreApiFp(configuration).storesStartPost(storeId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Stop Service
         * @param {number} storeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesStopPost(storeId: number, options?: any): AxiosPromise<object> {
            return StoreApiFp(configuration).storesStopPost(storeId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Store Detail
         * @param {number} storeId storeId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storesStoreIdGet(storeId: number, options?: any): AxiosPromise<InlineResponse2005> {
            return StoreApiFp(configuration).storesStoreIdGet(storeId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * StoreApi - object-oriented interface
 * @export
 * @class StoreApi
 * @extends {BaseAPI}
 */
export class StoreApi extends BaseAPI {
    /**
     * 
     * @summary Delete Store
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StoreApi
     */
    public storesDelete(id: number, options?: any) {
        return StoreApiFp(this.configuration).storesDelete(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Stores
     * @param {number} [userId] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StoreApi
     */
    public storesGet(userId?: number, options?: any) {
        return StoreApiFp(this.configuration).storesGet(userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Stores List (Home)
     * @param {number} [userId] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StoreApi
     */
    public storesListGet(userId?: number, options?: any) {
        return StoreApiFp(this.configuration).storesListGet(userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Create Store
     * @param {InlineObject4} [inlineObject4] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StoreApi
     */
    public storesPost(inlineObject4?: InlineObject4, options?: any) {
        return StoreApiFp(this.configuration).storesPost(inlineObject4, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update Store Info
     * @param {InlineObject3} [inlineObject3] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StoreApi
     */
    public storesPut(inlineObject3?: InlineObject3, options?: any) {
        return StoreApiFp(this.configuration).storesPut(inlineObject3, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Start Service
     * @param {number} storeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StoreApi
     */
    public storesStartPost(storeId: number, options?: any) {
        return StoreApiFp(this.configuration).storesStartPost(storeId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Stop Service
     * @param {number} storeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StoreApi
     */
    public storesStopPost(storeId: number, options?: any) {
        return StoreApiFp(this.configuration).storesStopPost(storeId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Store Detail
     * @param {number} storeId storeId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StoreApi
     */
    public storesStoreIdGet(storeId: number, options?: any) {
        return StoreApiFp(this.configuration).storesStoreIdGet(storeId, options).then((request) => request(this.axios, this.basePath));
    }

}

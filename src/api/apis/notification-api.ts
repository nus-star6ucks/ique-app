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
import { DirectNotification } from '../models';
/**
 * NotificationApi - axios parameter creator
 * @export
 */
export const NotificationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Notification
         * @param {DirectNotification} [directNotification] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        notificationPost: async (directNotification?: DirectNotification, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/notification`;
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
            const needsSerialization = (typeof directNotification !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(directNotification !== undefined ? directNotification : {}) : (directNotification || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * NotificationApi - functional programming interface
 * @export
 */
export const NotificationApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Notification
         * @param {DirectNotification} [directNotification] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async notificationPost(directNotification?: DirectNotification, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await NotificationApiAxiosParamCreator(configuration).notificationPost(directNotification, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * NotificationApi - factory interface
 * @export
 */
export const NotificationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Notification
         * @param {DirectNotification} [directNotification] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        notificationPost(directNotification?: DirectNotification, options?: any): AxiosPromise<string> {
            return NotificationApiFp(configuration).notificationPost(directNotification, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * NotificationApi - object-oriented interface
 * @export
 * @class NotificationApi
 * @extends {BaseAPI}
 */
export class NotificationApi extends BaseAPI {
    /**
     * 
     * @summary Notification
     * @param {DirectNotification} [directNotification] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NotificationApi
     */
    public notificationPost(directNotification?: DirectNotification, options?: any) {
        return NotificationApiFp(this.configuration).notificationPost(directNotification, options).then((request) => request(this.axios, this.basePath));
    }

}
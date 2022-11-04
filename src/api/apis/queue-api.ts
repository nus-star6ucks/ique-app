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

import * as globalImportUrl from "url";
import globalAxios, { AxiosPromise, AxiosInstance } from "axios";
import { Configuration } from "../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
// @ts-ignore
import { InlineResponse2004 } from "../models";
// @ts-ignore
import { InlineResponse2012 } from "../models";
// @ts-ignore
import { InlineResponse401 } from "../models";
// @ts-ignore
import { QueueTicket } from "../models";
/**
 * QueueApi - axios parameter creator
 * @export
 */
export const QueueApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Call for customer
     * @param {number} [ticketId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesCallPost: async (
      ticketId?: number,
      options: any = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/queues/call`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (ticketId !== undefined) {
        localVarQueryParameter["ticketId"] = ticketId;
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Checkin for customer
     * @param {number} [ticketId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesCheckinPost: async (
      ticketId?: number,
      options: any = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/queues/checkin`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (ticketId !== undefined) {
        localVarQueryParameter["ticketId"] = ticketId;
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Skip customer
     * @param {number} [ticketId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesSkipPost: async (
      ticketId?: number,
      options: any = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/queues/skip`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (ticketId !== undefined) {
        localVarQueryParameter["ticketId"] = ticketId;
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 1. get tickets by storeId: 用户获取某家商店的排队信息 2. get tickets by userId：用户获取自己的所有取号的 ticket 信息 3. get tickets by userId & storeId：用户获取自己取号的某家商店的 ticket 信息
     * @summary Get Queue Tickets
     * @param {number} [userId]
     * @param {number} [storeId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesTicketsGet: async (
      userId?: number,
      storeId?: number,
      options: any = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/queues/tickets`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (userId !== undefined) {
        localVarQueryParameter["userId"] = userId;
      }

      if (storeId !== undefined) {
        localVarQueryParameter["storeId"] = storeId;
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 用户取号
     * @summary Create Queue Ticket
     * @param {number} queueId
     * @param {number} customerId
     * @param {number} storeId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesTicketsPost: async (
      queueId: number,
      customerId: number,
      storeId: number,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'queueId' is not null or undefined
      if (queueId === null || queueId === undefined) {
        throw new RequiredError(
          "queueId",
          "Required parameter queueId was null or undefined when calling queuesTicketsPost."
        );
      }
      // verify required parameter 'customerId' is not null or undefined
      if (customerId === null || customerId === undefined) {
        throw new RequiredError(
          "customerId",
          "Required parameter customerId was null or undefined when calling queuesTicketsPost."
        );
      }
      // verify required parameter 'storeId' is not null or undefined
      if (storeId === null || storeId === undefined) {
        throw new RequiredError(
          "storeId",
          "Required parameter storeId was null or undefined when calling queuesTicketsPost."
        );
      }
      const localVarPath = `/queues/tickets`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (queueId !== undefined) {
        localVarQueryParameter["queueId"] = queueId;
      }

      if (customerId !== undefined) {
        localVarQueryParameter["customerId"] = customerId;
      }

      if (storeId !== undefined) {
        localVarQueryParameter["storeId"] = storeId;
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * get a ticket by ticketId：用户获取取号详细信息，获取在当前队列中自己前面还有多少人排队
     * @summary Get Queue Ticket Detail
     * @param {number} ticketId ticketId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesTicketsTicketIdGet: async (
      ticketId: number,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'ticketId' is not null or undefined
      if (ticketId === null || ticketId === undefined) {
        throw new RequiredError(
          "ticketId",
          "Required parameter ticketId was null or undefined when calling queuesTicketsTicketIdGet."
        );
      }
      const localVarPath = `/queues/tickets/{ticketId}`.replace(
        `{${"ticketId"}}`,
        encodeURIComponent(String(ticketId))
      );
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * QueueApi - functional programming interface
 * @export
 */
export const QueueApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Call for customer
     * @param {number} [ticketId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async queuesCallPost(
      ticketId?: number,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<InlineResponse401>
    > {
      const localVarAxiosArgs = await QueueApiAxiosParamCreator(
        configuration
      ).queuesCallPost(ticketId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Checkin for customer
     * @param {number} [ticketId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async queuesCheckinPost(
      ticketId?: number,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<InlineResponse401>
    > {
      const localVarAxiosArgs = await QueueApiAxiosParamCreator(
        configuration
      ).queuesCheckinPost(ticketId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Skip customer
     * @param {number} [ticketId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async queuesSkipPost(
      ticketId?: number,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<InlineResponse401>
    > {
      const localVarAxiosArgs = await QueueApiAxiosParamCreator(
        configuration
      ).queuesSkipPost(ticketId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 1. get tickets by storeId: 用户获取某家商店的排队信息 2. get tickets by userId：用户获取自己的所有取号的 ticket 信息 3. get tickets by userId & storeId：用户获取自己取号的某家商店的 ticket 信息
     * @summary Get Queue Tickets
     * @param {number} [userId]
     * @param {number} [storeId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async queuesTicketsGet(
      userId?: number,
      storeId?: number,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<Array<QueueTicket>>
    > {
      const localVarAxiosArgs = await QueueApiAxiosParamCreator(
        configuration
      ).queuesTicketsGet(userId, storeId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 用户取号
     * @summary Create Queue Ticket
     * @param {number} queueId
     * @param {number} customerId
     * @param {number} storeId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async queuesTicketsPost(
      queueId: number,
      customerId: number,
      storeId: number,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<InlineResponse2012>
    > {
      const localVarAxiosArgs = await QueueApiAxiosParamCreator(
        configuration
      ).queuesTicketsPost(queueId, customerId, storeId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * get a ticket by ticketId：用户获取取号详细信息，获取在当前队列中自己前面还有多少人排队
     * @summary Get Queue Ticket Detail
     * @param {number} ticketId ticketId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async queuesTicketsTicketIdGet(
      ticketId: number,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<InlineResponse2004>
    > {
      const localVarAxiosArgs = await QueueApiAxiosParamCreator(
        configuration
      ).queuesTicketsTicketIdGet(ticketId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * QueueApi - factory interface
 * @export
 */
export const QueueApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     *
     * @summary Call for customer
     * @param {number} [ticketId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesCallPost(
      ticketId?: number,
      options?: any
    ): AxiosPromise<InlineResponse401> {
      return QueueApiFp(configuration)
        .queuesCallPost(ticketId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Checkin for customer
     * @param {number} [ticketId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesCheckinPost(
      ticketId?: number,
      options?: any
    ): AxiosPromise<InlineResponse401> {
      return QueueApiFp(configuration)
        .queuesCheckinPost(ticketId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Skip customer
     * @param {number} [ticketId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesSkipPost(
      ticketId?: number,
      options?: any
    ): AxiosPromise<InlineResponse401> {
      return QueueApiFp(configuration)
        .queuesSkipPost(ticketId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * 1. get tickets by storeId: 用户获取某家商店的排队信息 2. get tickets by userId：用户获取自己的所有取号的 ticket 信息 3. get tickets by userId & storeId：用户获取自己取号的某家商店的 ticket 信息
     * @summary Get Queue Tickets
     * @param {number} [userId]
     * @param {number} [storeId]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesTicketsGet(
      userId?: number,
      storeId?: number,
      options?: any
    ): AxiosPromise<Array<QueueTicket>> {
      return QueueApiFp(configuration)
        .queuesTicketsGet(userId, storeId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * 用户取号
     * @summary Create Queue Ticket
     * @param {number} queueId
     * @param {number} customerId
     * @param {number} storeId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesTicketsPost(
      queueId: number,
      customerId: number,
      storeId: number,
      options?: any
    ): AxiosPromise<InlineResponse2012> {
      return QueueApiFp(configuration)
        .queuesTicketsPost(queueId, customerId, storeId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * get a ticket by ticketId：用户获取取号详细信息，获取在当前队列中自己前面还有多少人排队
     * @summary Get Queue Ticket Detail
     * @param {number} ticketId ticketId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    queuesTicketsTicketIdGet(
      ticketId: number,
      options?: any
    ): AxiosPromise<InlineResponse2004> {
      return QueueApiFp(configuration)
        .queuesTicketsTicketIdGet(ticketId, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * QueueApi - object-oriented interface
 * @export
 * @class QueueApi
 * @extends {BaseAPI}
 */
export class QueueApi extends BaseAPI {
  /**
   *
   * @summary Call for customer
   * @param {number} [ticketId]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof QueueApi
   */
  public queuesCallPost(ticketId?: number, options?: any) {
    return QueueApiFp(this.configuration)
      .queuesCallPost(ticketId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Checkin for customer
   * @param {number} [ticketId]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof QueueApi
   */
  public queuesCheckinPost(ticketId?: number, options?: any) {
    return QueueApiFp(this.configuration)
      .queuesCheckinPost(ticketId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Skip customer
   * @param {number} [ticketId]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof QueueApi
   */
  public queuesSkipPost(ticketId?: number, options?: any) {
    return QueueApiFp(this.configuration)
      .queuesSkipPost(ticketId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * 1. get tickets by storeId: 用户获取某家商店的排队信息 2. get tickets by userId：用户获取自己的所有取号的 ticket 信息 3. get tickets by userId & storeId：用户获取自己取号的某家商店的 ticket 信息
   * @summary Get Queue Tickets
   * @param {number} [userId]
   * @param {number} [storeId]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof QueueApi
   */
  public queuesTicketsGet(userId?: number, storeId?: number, options?: any) {
    return QueueApiFp(this.configuration)
      .queuesTicketsGet(userId, storeId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * 用户取号
   * @summary Create Queue Ticket
   * @param {number} queueId
   * @param {number} customerId
   * @param {number} storeId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof QueueApi
   */
  public queuesTicketsPost(
    queueId: number,
    customerId: number,
    storeId: number,
    options?: any
  ) {
    return QueueApiFp(this.configuration)
      .queuesTicketsPost(queueId, customerId, storeId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * get a ticket by ticketId：用户获取取号详细信息，获取在当前队列中自己前面还有多少人排队
   * @summary Get Queue Ticket Detail
   * @param {number} ticketId ticketId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof QueueApi
   */
  public queuesTicketsTicketIdGet(ticketId: number, options?: any) {
    return QueueApiFp(this.configuration)
      .queuesTicketsTicketIdGet(ticketId, options)
      .then((request) => request(this.axios, this.basePath));
  }
}

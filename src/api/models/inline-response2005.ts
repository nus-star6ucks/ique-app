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


import { QueueInfo } from './queue-info';
import { SeatType } from './seat-type';
import { StoresResources } from './stores-resources';

/**
 * 
 * @export
 * @interface InlineResponse2005
 */
export interface InlineResponse2005 {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005
     */
    merchantId: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005
     */
    name: string;
    /**
     * StoreType
     * @type {string}
     * @memberof InlineResponse2005
     */
    type: InlineResponse2005TypeEnum;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005
     */
    address: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof InlineResponse2005
     */
    phoneNumbers: Array<string>;
    /**
     * Store Status
     * @type {string}
     * @memberof InlineResponse2005
     */
    status: InlineResponse2005StatusEnum;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005
     */
    registerTime: number;
    /**
     * 
     * @type {Array<QueueInfo>}
     * @memberof InlineResponse2005
     */
    queuesInfo: Array<QueueInfo>;
    /**
     * 
     * @type {StoresResources}
     * @memberof InlineResponse2005
     */
    resources: StoresResources;
    /**
     * 
     * @type {Array<SeatType>}
     * @memberof InlineResponse2005
     */
    seatTypes: Array<SeatType>;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineResponse2005TypeEnum {
    Restaurant = 'Restaurant',
    Cafe = 'Cafe'
}
/**
    * @export
    * @enum {string}
    */
export enum InlineResponse2005StatusEnum {
    OnService = 'onService',
    StopService = 'stopService'
}




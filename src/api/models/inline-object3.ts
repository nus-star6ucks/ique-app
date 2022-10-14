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


import { SeatType } from './seat-type';
import { StoresResources } from './stores-resources';

/**
 * 
 * @export
 * @interface InlineObject3
 */
export interface InlineObject3 {
    /**
     * 
     * @type {number}
     * @memberof InlineObject3
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof InlineObject3
     */
    merchantId?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineObject3
     */
    name?: string;
    /**
     * StoreType
     * @type {string}
     * @memberof InlineObject3
     */
    type?: InlineObject3TypeEnum;
    /**
     * 
     * @type {string}
     * @memberof InlineObject3
     */
    address?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof InlineObject3
     */
    phoneNumbers?: Array<string>;
    /**
     * queue ids
     * @type {Array<SeatType>}
     * @memberof InlineObject3
     */
    seatTypes?: Array<SeatType>;
    /**
     * Store Status
     * @type {string}
     * @memberof InlineObject3
     */
    status?: InlineObject3StatusEnum;
    /**
     * 
     * @type {StoresResources}
     * @memberof InlineObject3
     */
    resources?: StoresResources;
    /**
     * 
     * @type {number}
     * @memberof InlineObject3
     */
    registerTime?: number;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObject3TypeEnum {
    Restaurant = 'Restaurant',
    Cafe = 'Cafe'
}
/**
    * @export
    * @enum {string}
    */
export enum InlineObject3StatusEnum {
    OnService = 'onService',
    StopService = 'stopService'
}




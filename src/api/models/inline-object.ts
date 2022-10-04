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



/**
 * 
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
    /**
     * 
     * @type {number}
     * @memberof InlineObject
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    password?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    userType: InlineObjectUserTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    phoneNumber?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    status?: InlineObjectStatusEnum;
    /**
     * timestamp
     * @type {number}
     * @memberof InlineObject
     */
    createTime?: number;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObjectUserTypeEnum {
    Customer = 'customer',
    Merchant = 'merchant'
}
/**
    * @export
    * @enum {string}
    */
export enum InlineObjectStatusEnum {
    Active = 'active',
    Cancelled = 'cancelled'
}



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
 * @interface InlineResponse2006
 */
export interface InlineResponse2006 {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2006
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006
     */
    userType: InlineResponse2006UserTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006
     */
    status: InlineResponse2006StatusEnum;
    /**
     * timestamp
     * @type {number}
     * @memberof InlineResponse2006
     */
    createTime: number;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineResponse2006UserTypeEnum {
    Customer = 'customer',
    Merchant = 'merchant'
}
/**
    * @export
    * @enum {string}
    */
export enum InlineResponse2006StatusEnum {
    Active = 'active',
    Cancelled = 'cancelled'
}




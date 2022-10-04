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
 * @interface QueueTicket
 */
export interface QueueTicket {
    /**
     * 
     * @type {number}
     * @memberof QueueTicket
     */
    ticketId: number;
    /**
     * 
     * @type {number}
     * @memberof QueueTicket
     */
    storeId: number;
    /**
     * 
     * @type {number}
     * @memberof QueueTicket
     */
    customerId: number;
    /**
     * 
     * @type {number}
     * @memberof QueueTicket
     */
    queueNumber: number;
    /**
     * 
     * @type {number}
     * @memberof QueueTicket
     */
    queueId: number;
    /**
     * 
     * @type {number}
     * @memberof QueueTicket
     */
    startTime: number;
    /**
     * 
     * @type {number}
     * @memberof QueueTicket
     */
    endTime: number;
    /**
     * 
     * @type {string}
     * @memberof QueueTicket
     */
    status: QueueTicketStatusEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum QueueTicketStatusEnum {
    Pending = 'pending',
    Seated = 'seated',
    Skipped = 'skipped'
}



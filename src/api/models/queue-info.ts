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

import { SeatType } from "./seat-type";

/**
 *
 * @export
 * @interface QueueInfo
 */
export interface QueueInfo {
  /**
   *
   * @type {number}
   * @memberof QueueInfo
   */
  queueId: number;
  /**
   *
   * @type {SeatType}
   * @memberof QueueInfo
   */
  seatType: SeatType;
  /**
   *
   * @type {number}
   * @memberof QueueInfo
   */
  waitingSize: number;
  /**
   *
   * @type {number}
   * @memberof QueueInfo
   */
  estimateWaitingTime: number;
}

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

import { QueueInfo } from "./queue-info";

/**
 *
 * @export
 * @interface InlineResponse2004
 */
export interface InlineResponse2004 {
  /**
   *
   * @type {number}
   * @memberof InlineResponse2004
   */
  id: number;
  /**
   *
   * @type {number}
   * @memberof InlineResponse2004
   */
  storeId: number;
  /**
   *
   * @type {number}
   * @memberof InlineResponse2004
   */
  customerId: number;
  /**
   *
   * @type {number}
   * @memberof InlineResponse2004
   */
  queueNumber: number;
  /**
   *
   * @type {number}
   * @memberof InlineResponse2004
   */
  startTime: number;
  /**
   *
   * @type {number}
   * @memberof InlineResponse2004
   */
  endTime: number;
  /**
   *
   * @type {string}
   * @memberof InlineResponse2004
   */
  status: string;
  /**
   *
   * @type {QueueInfo}
   * @memberof InlineResponse2004
   */
  queueInfo: QueueInfo;
}

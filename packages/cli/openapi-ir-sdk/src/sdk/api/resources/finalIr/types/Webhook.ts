/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernOpenapiIr from "../../..";

export interface Webhook extends FernOpenapiIr.WithDescription {
    sdkName: FernOpenapiIr.EndpointSdkName | undefined;
    method: FernOpenapiIr.WebhookHttpMethod;
    summary: string | undefined;
    operationId: string;
    tags: FernOpenapiIr.TagId[];
    headers: FernOpenapiIr.Header[];
    /** Populated as ${operationId}Payload */
    generatedPayloadName: string;
    payload: FernOpenapiIr.Schema;
    examples: FernOpenapiIr.WebhookExampleCall[];
}

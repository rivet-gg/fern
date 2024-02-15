/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../..";
import * as core from "../../../../../../core";

export const Request: core.serialization.Schema<serializers.endpoints.primitive.getAndReturnBool.Request.Raw, boolean> =
    core.serialization.boolean();

export declare namespace Request {
    type Raw = boolean;
}

export const Response: core.serialization.Schema<
    serializers.endpoints.primitive.getAndReturnBool.Response.Raw,
    boolean
> = core.serialization.boolean();

export declare namespace Response {
    type Raw = boolean;
}

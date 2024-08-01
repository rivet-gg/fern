/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedTrace from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const GetFunctionSignatureRequest: core.serialization.ObjectSchema<
    serializers.v2.GetFunctionSignatureRequest.Raw,
    SeedTrace.v2.GetFunctionSignatureRequest
> = core.serialization.object({
    functionSignature: core.serialization.lazy(() => serializers.v2.FunctionSignature),
});

export declare namespace GetFunctionSignatureRequest {
    interface Raw {
        functionSignature: serializers.v2.FunctionSignature.Raw;
    }
}

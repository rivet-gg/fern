/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as SeedTrace from "../../../../../api/index";
import * as core from "../../../../../core";

export const GetDefaultStarterFilesRequest: core.serialization.Schema<
    serializers.GetDefaultStarterFilesRequest.Raw,
    SeedTrace.GetDefaultStarterFilesRequest
> = core.serialization.object({
    inputParams: core.serialization.list(core.serialization.lazyObject(() => serializers.VariableTypeAndName)),
    outputType: core.serialization.lazy(() => serializers.VariableType),
    methodName: core.serialization.string(),
});

export declare namespace GetDefaultStarterFilesRequest {
    interface Raw {
        inputParams: serializers.VariableTypeAndName.Raw[];
        outputType: serializers.VariableType.Raw;
        methodName: string;
    }
}

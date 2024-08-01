/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../../index";
import * as SeedTrace from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";

export const NonVoidFunctionDefinition: core.serialization.ObjectSchema<
    serializers.v2.v3.NonVoidFunctionDefinition.Raw,
    SeedTrace.v2.v3.NonVoidFunctionDefinition
> = core.serialization.object({
    signature: core.serialization.lazyObject(() => serializers.v2.v3.NonVoidFunctionSignature),
    code: core.serialization.lazyObject(() => serializers.v2.v3.FunctionImplementationForMultipleLanguages),
});

export declare namespace NonVoidFunctionDefinition {
    interface Raw {
        signature: serializers.v2.v3.NonVoidFunctionSignature.Raw;
        code: serializers.v2.v3.FunctionImplementationForMultipleLanguages.Raw;
    }
}

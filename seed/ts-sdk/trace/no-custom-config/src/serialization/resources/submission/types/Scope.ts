/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const Scope: core.serialization.ObjectSchema<serializers.Scope.Raw, SeedTrace.Scope> = core.serialization.object(
    {
        variables: core.serialization.record(
            core.serialization.string(),
            core.serialization.lazy(() => serializers.DebugVariableValue)
        ),
    }
);

export declare namespace Scope {
    interface Raw {
        variables: Record<string, serializers.DebugVariableValue.Raw>;
    }
}

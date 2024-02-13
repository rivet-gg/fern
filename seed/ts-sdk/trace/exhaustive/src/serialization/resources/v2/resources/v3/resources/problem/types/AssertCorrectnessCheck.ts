/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../..";
import * as SeedTrace from "../../../../../../../../api";
import * as core from "../../../../../../../../core";

export const AssertCorrectnessCheck: core.serialization.Schema<
    serializers.v2.v3.AssertCorrectnessCheck.Raw,
    SeedTrace.v2.v3.AssertCorrectnessCheck
> = core.serialization
    .union("type", {
        deepEquality: core.serialization.lazyObject(
            async () => (await import("../../../../../../..")).v2.v3.DeepEqualityCorrectnessCheck
        ),
        custom: core.serialization.lazyObject(
            async () => (await import("../../../../../../..")).v2.v3.VoidFunctionDefinitionThatTakesActualResult
        ),
    })
    .transform<SeedTrace.v2.v3.AssertCorrectnessCheck>({
        transform: (value) => {
            switch (value.type) {
                case "deepEquality":
                    return SeedTrace.v2.v3.AssertCorrectnessCheck.deepEquality(value);
                case "custom":
                    return SeedTrace.v2.v3.AssertCorrectnessCheck.custom(value);
                default:
                    return SeedTrace.v2.v3.AssertCorrectnessCheck._unknown(value);
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace AssertCorrectnessCheck {
    type Raw = AssertCorrectnessCheck.DeepEquality | AssertCorrectnessCheck.Custom;

    interface DeepEquality extends serializers.v2.v3.DeepEqualityCorrectnessCheck.Raw {
        type: "deepEquality";
    }

    interface Custom extends serializers.v2.v3.VoidFunctionDefinitionThatTakesActualResult.Raw {
        type: "custom";
    }
}
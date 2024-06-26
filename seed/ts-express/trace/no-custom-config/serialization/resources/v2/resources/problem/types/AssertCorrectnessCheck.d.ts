/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../..";
import * as SeedTrace from "../../../../../../api";
import * as core from "../../../../../../core";
export declare const AssertCorrectnessCheck: core.serialization.Schema<serializers.v2.AssertCorrectnessCheck.Raw, SeedTrace.v2.AssertCorrectnessCheck>;
export declare namespace AssertCorrectnessCheck {
    type Raw = AssertCorrectnessCheck.DeepEquality | AssertCorrectnessCheck.Custom;
    interface DeepEquality extends serializers.v2.DeepEqualityCorrectnessCheck.Raw {
        type: "deepEquality";
    }
    interface Custom extends serializers.v2.VoidFunctionDefinitionThatTakesActualResult.Raw {
        type: "custom";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";
export declare const LightweightStackframeInformation: core.serialization.ObjectSchema<serializers.LightweightStackframeInformation.Raw, SeedTrace.LightweightStackframeInformation>;
export declare namespace LightweightStackframeInformation {
    interface Raw {
        numStackFrames: number;
        topStackFrameMethodName: string;
    }
}

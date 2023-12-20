/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";
export declare const ExecutionSessionResponse: core.serialization.ObjectSchema<serializers.ExecutionSessionResponse.Raw, SeedTrace.ExecutionSessionResponse>;
export declare namespace ExecutionSessionResponse {
    interface Raw {
        sessionId: string;
        executionSessionUrl?: string | null;
        language: serializers.Language.Raw;
        status: serializers.ExecutionSessionStatus.Raw;
    }
}

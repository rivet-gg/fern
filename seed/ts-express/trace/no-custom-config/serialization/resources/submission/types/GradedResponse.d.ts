/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";
export declare const GradedResponse: core.serialization.ObjectSchema<serializers.GradedResponse.Raw, SeedTrace.GradedResponse>;
export declare namespace GradedResponse {
    interface Raw {
        submissionId: serializers.SubmissionId.Raw;
        testCases: Record<string, serializers.TestCaseResultWithStdout.Raw>;
    }
}

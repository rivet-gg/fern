/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";
export declare const GradedResponseV2: core.serialization.ObjectSchema<serializers.GradedResponseV2.Raw, SeedTrace.GradedResponseV2>;
export declare namespace GradedResponseV2 {
    interface Raw {
        submissionId: serializers.SubmissionId.Raw;
        testCases: Record<serializers.v2.TestCaseId.Raw, serializers.TestCaseGrade.Raw>;
    }
}

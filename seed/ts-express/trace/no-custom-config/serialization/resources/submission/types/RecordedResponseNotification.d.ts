/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";
export declare const RecordedResponseNotification: core.serialization.ObjectSchema<serializers.RecordedResponseNotification.Raw, SeedTrace.RecordedResponseNotification>;
export declare namespace RecordedResponseNotification {
    interface Raw {
        submissionId: serializers.SubmissionId.Raw;
        traceResponsesSize: number;
        testCaseId?: string | null;
    }
}

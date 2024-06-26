/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";

export const ExistingSubmissionExecuting: core.serialization.ObjectSchema<
    serializers.ExistingSubmissionExecuting.Raw,
    SeedTrace.ExistingSubmissionExecuting
> = core.serialization.object({
    submissionId: core.serialization.lazy(async () => (await import("../../..")).SubmissionId),
});

export declare namespace ExistingSubmissionExecuting {
    interface Raw {
        submissionId: serializers.SubmissionId.Raw;
    }
}

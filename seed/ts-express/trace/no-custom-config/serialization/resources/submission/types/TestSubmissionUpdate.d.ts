/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";
export declare const TestSubmissionUpdate: core.serialization.ObjectSchema<serializers.TestSubmissionUpdate.Raw, SeedTrace.TestSubmissionUpdate>;
export declare namespace TestSubmissionUpdate {
    interface Raw {
        updateTime: string;
        updateInfo: serializers.TestSubmissionUpdateInfo.Raw;
    }
}

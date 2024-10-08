/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../index";

export type TestSubmissionStatus = 
    | SeedTrace.TestSubmissionStatus.Stopped
    | SeedTrace.TestSubmissionStatus.Errored
    | SeedTrace.TestSubmissionStatus.Running
    | SeedTrace.TestSubmissionStatus.TestCaseIdToState;

export declare namespace TestSubmissionStatus {
    interface Stopped {
        type: "stopped";
    }

    interface Errored {
        type: "errored";
        value: SeedTrace.ErrorInfo;
    }

    interface Running {
        type: "running";
        value: SeedTrace.RunningSubmissionState;
    }

    interface TestCaseIdToState {
        type: "testCaseIdToState";
        value: Record<string, SeedTrace.SubmissionStatusForTestCase>;
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../index";

export type CodeExecutionUpdate = 
    /**
     * Statuses if an executor for the session isn't ready (Before RunningResponse). */
    | SeedTrace.CodeExecutionUpdate.BuildingExecutor
    /**
     * Sent once a test submission is executing. */
    | SeedTrace.CodeExecutionUpdate.Running
    /**
     * Sent if a submission cannot be run (i.e. Compile Error). */
    | SeedTrace.CodeExecutionUpdate.Errored
    /**
     * Sent if a submission is stopped. */
    | SeedTrace.CodeExecutionUpdate.Stopped
    /**
     * Graded testcases without trace information. */
    | SeedTrace.CodeExecutionUpdate.Graded
    /**
     * Graded submission for v2 problems. */
    | SeedTrace.CodeExecutionUpdate.GradedV2
    /**
     * Workspace run without trace information. */
    | SeedTrace.CodeExecutionUpdate.WorkspaceRan
    /**
     * Gives progress about what is being recorded. */
    | SeedTrace.CodeExecutionUpdate.Recording
    /**
     * Graded testcases with trace information. */
    | SeedTrace.CodeExecutionUpdate.Recorded
    /**
     * Sent if an invalid request is sent for a submission. */
    | SeedTrace.CodeExecutionUpdate.InvalidRequest
    /**
     * Sent once a submission is graded and fully recorded. */
    | SeedTrace.CodeExecutionUpdate.Finished;

export declare namespace CodeExecutionUpdate {
    interface BuildingExecutor extends SeedTrace.BuildingExecutorResponse {
        type: "buildingExecutor";
    }

    interface Running extends SeedTrace.RunningResponse {
        type: "running";
    }

    interface Errored extends SeedTrace.ErroredResponse {
        type: "errored";
    }

    interface Stopped extends SeedTrace.StoppedResponse {
        type: "stopped";
    }

    interface Graded extends SeedTrace.GradedResponse {
        type: "graded";
    }

    interface GradedV2 extends SeedTrace.GradedResponseV2 {
        type: "gradedV2";
    }

    interface WorkspaceRan extends SeedTrace.WorkspaceRanResponse {
        type: "workspaceRan";
    }

    interface Recording extends SeedTrace.RecordingResponseNotification {
        type: "recording";
    }

    interface Recorded extends SeedTrace.RecordedResponseNotification {
        type: "recorded";
    }

    interface InvalidRequest extends SeedTrace.InvalidRequestResponse {
        type: "invalidRequest";
    }

    interface Finished extends SeedTrace.FinishedResponse {
        type: "finished";
    }
}

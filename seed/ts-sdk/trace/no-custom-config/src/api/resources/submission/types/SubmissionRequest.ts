/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../index";

export type SubmissionRequest = 
    | SeedTrace.SubmissionRequest.InitializeProblemRequest
    | SeedTrace.SubmissionRequest.InitializeWorkspaceRequest
    | SeedTrace.SubmissionRequest.SubmitV2
    | SeedTrace.SubmissionRequest.WorkspaceSubmit
    | SeedTrace.SubmissionRequest.Stop;

export declare namespace SubmissionRequest {
    interface InitializeProblemRequest extends SeedTrace.InitializeProblemRequest {
        type: "initializeProblemRequest";
    }

    interface InitializeWorkspaceRequest {
        type: "initializeWorkspaceRequest";
    }

    interface SubmitV2 extends SeedTrace.SubmitRequestV2 {
        type: "submitV2";
    }

    interface WorkspaceSubmit extends SeedTrace.WorkspaceSubmitRequest {
        type: "workspaceSubmit";
    }

    interface Stop extends SeedTrace.StopRequest {
        type: "stop";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";

export const SubmissionRequest: core.serialization.Schema<
    serializers.SubmissionRequest.Raw,
    SeedTrace.SubmissionRequest
> = core.serialization
    .union("type", {
        initializeProblemRequest: core.serialization.lazyObject(
            async () => (await import("../../..")).InitializeProblemRequest
        ),
        initializeWorkspaceRequest: core.serialization.object({}),
        submitV2: core.serialization.lazyObject(async () => (await import("../../..")).SubmitRequestV2),
        workspaceSubmit: core.serialization.lazyObject(async () => (await import("../../..")).WorkspaceSubmitRequest),
        stop: core.serialization.lazyObject(async () => (await import("../../..")).StopRequest),
    })
    .transform<SeedTrace.SubmissionRequest>({
        transform: (value) => {
            switch (value.type) {
                case "initializeProblemRequest":
                    return SeedTrace.SubmissionRequest.initializeProblemRequest(value);
                case "initializeWorkspaceRequest":
                    return SeedTrace.SubmissionRequest.initializeWorkspaceRequest();
                case "submitV2":
                    return SeedTrace.SubmissionRequest.submitV2(value);
                case "workspaceSubmit":
                    return SeedTrace.SubmissionRequest.workspaceSubmit(value);
                case "stop":
                    return SeedTrace.SubmissionRequest.stop(value);
                default:
                    return SeedTrace.SubmissionRequest._unknown(value);
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace SubmissionRequest {
    type Raw =
        | SubmissionRequest.InitializeProblemRequest
        | SubmissionRequest.InitializeWorkspaceRequest
        | SubmissionRequest.SubmitV2
        | SubmissionRequest.WorkspaceSubmit
        | SubmissionRequest.Stop;

    interface InitializeProblemRequest extends serializers.InitializeProblemRequest.Raw {
        type: "initializeProblemRequest";
    }

    interface InitializeWorkspaceRequest {
        type: "initializeWorkspaceRequest";
    }

    interface SubmitV2 extends serializers.SubmitRequestV2.Raw {
        type: "submitV2";
    }

    interface WorkspaceSubmit extends serializers.WorkspaceSubmitRequest.Raw {
        type: "workspaceSubmit";
    }

    interface Stop extends serializers.StopRequest.Raw {
        type: "stop";
    }
}

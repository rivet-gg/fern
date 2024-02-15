/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../..";
import * as SeedTrace from "../../../../../../../../api";
import * as core from "../../../../../../../../core";

export const Response: core.serialization.Schema<
    serializers.v2.v3.problem.getLightweightProblems.Response.Raw,
    SeedTrace.v2.v3.LightweightProblemInfoV2[]
> = core.serialization.list(
    core.serialization.lazyObject(async () => (await import("../../../../../../..")).v2.v3.LightweightProblemInfoV2)
);

export declare namespace Response {
    type Raw = serializers.v2.v3.LightweightProblemInfoV2.Raw[];
}

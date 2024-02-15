/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";

export const Request: core.serialization.Schema<
    serializers.admin.storeTracedWorkspaceV2.Request.Raw,
    SeedTrace.TraceResponseV2[]
> = core.serialization.list(core.serialization.lazyObject(async () => (await import("../../..")).TraceResponseV2));

export declare namespace Request {
    type Raw = serializers.TraceResponseV2.Raw[];
}

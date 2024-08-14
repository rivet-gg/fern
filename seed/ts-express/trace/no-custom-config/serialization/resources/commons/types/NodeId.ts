/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const NodeId: core.serialization.Schema<serializers.NodeId.Raw, SeedTrace.NodeId> = core.serialization.string();

export declare namespace NodeId {
    type Raw = string;
}

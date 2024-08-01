/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const UserId: core.serialization.Schema<serializers.UserId.Raw, SeedTrace.UserId> = core.serialization.string();

export declare namespace UserId {
    type Raw = string;
}

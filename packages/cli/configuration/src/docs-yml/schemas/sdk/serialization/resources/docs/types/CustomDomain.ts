/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernDocsConfig from "../../../../api";
import * as core from "../../../../core";

export const CustomDomain: core.serialization.Schema<serializers.CustomDomain.Raw, FernDocsConfig.CustomDomain> =
    core.serialization.undiscriminatedUnion([
        core.serialization.string(),
        core.serialization.list(core.serialization.string()),
    ]);

export declare namespace CustomDomain {
    type Raw = string | string[];
}
/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernDocsConfig from "../../../../api";
import * as core from "../../../../core";

export const FontStyle: core.serialization.Schema<serializers.FontStyle.Raw, FernDocsConfig.FontStyle> =
    core.serialization.enum_(["normal", "italic"]);

export declare namespace FontStyle {
    type Raw = "normal" | "italic";
}

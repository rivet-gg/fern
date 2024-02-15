/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as SeedResponseProperty from "../../api";
import * as core from "../../core";

export const WithMetadata: core.serialization.ObjectSchema<
    serializers.WithMetadata.Raw,
    SeedResponseProperty.WithMetadata
> = core.serialization.object({
    metadata: core.serialization.record(core.serialization.string(), core.serialization.string()),
});

export declare namespace WithMetadata {
    interface Raw {
        metadata: Record<string, string>;
    }
}

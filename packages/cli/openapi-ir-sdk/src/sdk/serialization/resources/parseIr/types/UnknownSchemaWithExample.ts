/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernOpenapiIr from "../../../../api";
import * as core from "../../../../core";

export const UnknownSchemaWithExample: core.serialization.ObjectSchema<
    serializers.UnknownSchemaWithExample.Raw,
    FernOpenapiIr.UnknownSchemaWithExample
> = core.serialization
    .objectWithoutOptionalProperties({
        example: core.serialization.unknown(),
    })
    .extend(core.serialization.lazyObject(async () => (await import("../../..")).WithSdkGroupName))
    .extend(core.serialization.lazyObject(async () => (await import("../../..")).WithName))
    .extend(core.serialization.lazyObject(async () => (await import("../../..")).WithDescription))
    .extend(core.serialization.lazyObject(async () => (await import("../../..")).WithAvailability));

export declare namespace UnknownSchemaWithExample {
    interface Raw
        extends serializers.WithSdkGroupName.Raw,
            serializers.WithName.Raw,
            serializers.WithDescription.Raw,
            serializers.WithAvailability.Raw {
        example?: unknown;
    }
}

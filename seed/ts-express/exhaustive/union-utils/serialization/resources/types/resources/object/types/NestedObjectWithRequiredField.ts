/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedExhaustive from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const NestedObjectWithRequiredField: core.serialization.ObjectSchema<
    serializers.types.NestedObjectWithRequiredField.Raw,
    SeedExhaustive.types.NestedObjectWithRequiredField
> = core.serialization.object({
    string: core.serialization.string(),
    nestedObject: core.serialization.property(
        "NestedObject",
        core.serialization.lazyObject(() => serializers.types.ObjectWithOptionalField)
    ),
});

export declare namespace NestedObjectWithRequiredField {
    interface Raw {
        string: string;
        NestedObject: serializers.types.ObjectWithOptionalField.Raw;
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernIr from "../../../../api";
import * as core from "../../../../core";

export const IntegerValidationRules: core.serialization.ObjectSchema<
    serializers.IntegerValidationRules.Raw,
    FernIr.IntegerValidationRules
> = core.serialization.objectWithoutOptionalProperties({
    min: core.serialization.number().optional(),
    max: core.serialization.number().optional(),
    exclusiveMin: core.serialization.boolean().optional(),
    exclusiveMax: core.serialization.boolean().optional(),
    multipleOf: core.serialization.number().optional(),
});

export declare namespace IntegerValidationRules {
    interface Raw {
        min?: number | null;
        max?: number | null;
        exclusiveMin?: boolean | null;
        exclusiveMax?: boolean | null;
        multipleOf?: number | null;
    }
}

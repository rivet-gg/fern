/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernIr from "../../../../api";
import * as core from "../../../../core";

export const EnumTypeDeclaration: core.serialization.ObjectSchema<
    serializers.EnumTypeDeclaration.Raw,
    FernIr.EnumTypeDeclaration
> = core.serialization.objectWithoutOptionalProperties({
    values: core.serialization.list(core.serialization.lazyObject(async () => (await import("../../..")).EnumValue)),
});

export declare namespace EnumTypeDeclaration {
    interface Raw {
        values: serializers.EnumValue.Raw[];
    }
}

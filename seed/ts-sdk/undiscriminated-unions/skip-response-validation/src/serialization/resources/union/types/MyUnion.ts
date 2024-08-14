/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedUndiscriminatedUnions from "../../../../api/index";
import * as core from "../../../../core";

export const MyUnion: core.serialization.Schema<serializers.MyUnion.Raw, SeedUndiscriminatedUnions.MyUnion> = core.serialization.undiscriminatedUnion([core.serialization.string(), core.serialization.list(core.serialization.string()), core.serialization.number(), core.serialization.list(core.serialization.number()), core.serialization.list(core.serialization.list(core.serialization.number())), core.serialization.set(core.serialization.string())]);

export declare namespace MyUnion {
    type Raw = string | string[] | number | number[] | number[][] | string[];
}

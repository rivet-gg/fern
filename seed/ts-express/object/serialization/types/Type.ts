/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as SeedObject from "../../api/index";
import * as core from "../../core";

export const Type: core.serialization.ObjectSchema<serializers.Type.Raw, SeedObject.Type> = core.serialization.object({
    one: core.serialization.number(),
    two: core.serialization.number(),
    three: core.serialization.string(),
    four: core.serialization.boolean(),
    five: core.serialization.number(),
    six: core.serialization.date(),
    seven: core.serialization.string(),
    eight: core.serialization.string(),
    nine: core.serialization.string(),
    ten: core.serialization.list(core.serialization.number()),
    eleven: core.serialization.set(core.serialization.number()),
    twelve: core.serialization.record(core.serialization.string(), core.serialization.boolean()),
    thirteen: core.serialization.number().optional(),
    fourteen: core.serialization.unknown(),
    fifteen: core.serialization.list(core.serialization.list(core.serialization.number())),
    sixteen: core.serialization.list(
        core.serialization.record(core.serialization.string(), core.serialization.number())
    ),
    seventeen: core.serialization.list(core.serialization.string().optional()),
    eighteen: core.serialization.stringLiteral("eighteen"),
    nineteen: core.serialization.lazyObject(async () => (await import("..")).Name),
});

export declare namespace Type {
    interface Raw {
        one: number;
        two: number;
        three: string;
        four: boolean;
        five: number;
        six: string;
        seven: string;
        eight: string;
        nine: string;
        ten: number[];
        eleven: number[];
        twelve: Record<string, boolean>;
        thirteen?: number | null;
        fourteen?: unknown;
        fifteen: number[][];
        sixteen: Record<string, number>[];
        seventeen: (string | null | undefined)[];
        eighteen: "eighteen";
        nineteen: serializers.Name.Raw;
    }
}
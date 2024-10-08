/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedUnions from "../../../index";

export type UnionWithPrimitive = SeedUnions.UnionWithPrimitive.Integer | SeedUnions.UnionWithPrimitive.String;

export declare namespace UnionWithPrimitive {
    interface Integer {
        type: "integer";
        value: number;
    }

    interface String {
        type: "string";
        value: string;
    }
}

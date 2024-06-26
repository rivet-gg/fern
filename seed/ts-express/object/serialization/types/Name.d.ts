/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "..";
import * as SeedObject from "../../api";
import * as core from "../../core";
export declare const Name: core.serialization.ObjectSchema<serializers.Name.Raw, SeedObject.Name>;
export declare namespace Name {
    interface Raw {
        id: string;
        value: string;
    }
}

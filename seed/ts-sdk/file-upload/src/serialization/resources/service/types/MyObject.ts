/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as SeedFileUpload from "../../../../api";
import * as core from "../../../../core";

export const MyObject: core.serialization.ObjectSchema<serializers.MyObject.Raw, SeedFileUpload.MyObject> =
    core.serialization.object({
        foo: core.serialization.string(),
    });

export declare namespace MyObject {
    interface Raw {
        foo: string;
    }
}

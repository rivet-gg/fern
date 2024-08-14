/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedNurseryApi from "../../../../api/index";
import * as core from "../../../../core";

export const Package: core.serialization.ObjectSchema<serializers.Package.Raw, SeedNurseryApi.Package> = core.serialization.object({
        "name": core.serialization.string()
    });

export declare namespace Package {
    interface Raw {
        "name": string;
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedExtraProperties from "../../../../api/index";
import * as core from "../../../../core";

export const User: core.serialization.ObjectSchema<serializers.User.Raw, SeedExtraProperties.User> = core.serialization.object({
        "name": core.serialization.string()
    });

export declare namespace User {
    interface Raw {
        "name": string;
    }
}

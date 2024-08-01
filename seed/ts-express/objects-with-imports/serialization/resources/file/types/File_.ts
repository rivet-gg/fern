/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedObjectsWithImports from "../../../../api/index";
import * as core from "../../../../core";

export const File_: core.serialization.ObjectSchema<serializers.File_.Raw, SeedObjectsWithImports.File_> =
    core.serialization.object({
        name: core.serialization.string(),
        contents: core.serialization.string(),
        info: core.serialization.lazy(() => serializers.FileInfo),
    });

export declare namespace File_ {
    interface Raw {
        name: string;
        contents: string;
        info: serializers.FileInfo.Raw;
    }
}

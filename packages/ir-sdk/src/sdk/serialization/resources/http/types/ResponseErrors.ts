/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernIr from "../../../../api";
import * as core from "../../../../core";

export const ResponseErrors: core.serialization.Schema<serializers.ResponseErrors.Raw, FernIr.ResponseErrors> =
    core.serialization.list(core.serialization.lazyObject(async () => (await import("../../..")).ResponseError));

export declare namespace ResponseErrors {
    type Raw = serializers.ResponseError.Raw[];
}

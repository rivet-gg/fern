/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../../../errors";
import * as SeedTrace from "../../..";

export class PlaylistIdNotFoundError extends errors.SeedTraceError {
    constructor(body: SeedTrace.PlaylistIdNotFoundErrorBody) {
        super({
            message: "PlaylistIdNotFoundError",
            statusCode: 404,
            body: body,
        });
        Object.setPrototypeOf(this, PlaylistIdNotFoundError.prototype);
    }
}

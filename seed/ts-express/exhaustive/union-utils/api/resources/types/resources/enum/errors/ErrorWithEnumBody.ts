/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../../../../../errors/index";
import * as SeedExhaustive from "../../../../../index";
import express from "express";
import * as serializers from "../../../../../../serialization/index";

export class ErrorWithEnumBody extends errors.SeedExhaustiveError {
    constructor(private readonly body: SeedExhaustive.types.WeatherReport) {
        super("ErrorWithEnumBody");
        Object.setPrototypeOf(this, ErrorWithEnumBody.prototype);
    }

    public async send(res: express.Response): Promise<void> {
        res.status(400).json(
            serializers.types.WeatherReport.jsonOrThrow(this.body, { unrecognizedObjectKeys: "strip" })
        );
    }
}

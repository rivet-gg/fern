/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as errors from "../../../../errors";
import * as SeedErrorProperty from "../../..";
import express from "express";
export declare class PropertyBasedErrorTest extends errors.SeedErrorPropertyError {
    private readonly body;
    constructor(body: SeedErrorProperty.PropertyBasedErrorTestBody);
    send(res: express.Response): Promise<void>;
}

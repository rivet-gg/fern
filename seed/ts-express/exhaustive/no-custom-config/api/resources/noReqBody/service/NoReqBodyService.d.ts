/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as SeedExhaustive from "../../..";
import express from "express";
export interface NoReqBodyServiceMethods {
    getWithNoRequestBody(req: express.Request<never, SeedExhaustive.types.ObjectWithOptionalField, never, never>, res: {
        send: (responseBody: SeedExhaustive.types.ObjectWithOptionalField) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    postWithNoRequestBody(req: express.Request<never, string, never, never>, res: {
        send: (responseBody: string) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class NoReqBodyService {
    private readonly methods;
    private router;
    constructor(methods: NoReqBodyServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}

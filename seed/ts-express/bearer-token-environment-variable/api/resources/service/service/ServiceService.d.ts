/**
 * This file was auto-generated by Fern from our API Definition.
 */
import express from "express";
export interface ServiceServiceMethods {
    getWithBearerToken(req: express.Request<never, string, never, never>, res: {
        send: (responseBody: string) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class ServiceService {
    private readonly methods;
    private router;
    constructor(methods: ServiceServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}
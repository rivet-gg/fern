/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../serialization";
import * as SeedExamples from "../../..";
import express from "express";
export interface ServiceServiceMethods {
    getMovie(req: express.Request<{
        movieId: serializers.MovieId.Raw;
    }, SeedExamples.Movie, never, never>, res: {
        send: (responseBody: SeedExamples.Movie) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    createMovie(req: express.Request<never, SeedExamples.MovieId, SeedExamples.Movie, never>, res: {
        send: (responseBody: SeedExamples.MovieId) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getMetadata(req: express.Request<never, SeedExamples.Metadata, never, {
        shallow?: boolean;
        tag?: string;
    }>, res: {
        send: (responseBody: SeedExamples.Metadata) => Promise<void>;
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

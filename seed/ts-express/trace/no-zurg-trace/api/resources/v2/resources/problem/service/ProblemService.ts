/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../../../index";
import express from "express";
import * as errors from "../../../../../../errors/index";

export interface ProblemServiceMethods {
    getLightweightProblems(
        req: express.Request<never, SeedTrace.v2.LightweightProblemInfoV2[], never, never>,
        res: {
            send: (responseBody: SeedTrace.v2.LightweightProblemInfoV2[]) => Promise<void>;
            cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
            locals: any;
        },
        next: express.NextFunction
    ): void | Promise<void>;
    getProblems(
        req: express.Request<never, SeedTrace.v2.ProblemInfoV2[], never, never>,
        res: {
            send: (responseBody: SeedTrace.v2.ProblemInfoV2[]) => Promise<void>;
            cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
            locals: any;
        },
        next: express.NextFunction
    ): void | Promise<void>;
    getLatestProblem(
        req: express.Request<
            {
                problemId: SeedTrace.ProblemId;
            },
            SeedTrace.v2.ProblemInfoV2,
            never,
            never
        >,
        res: {
            send: (responseBody: SeedTrace.v2.ProblemInfoV2) => Promise<void>;
            cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
            locals: any;
        },
        next: express.NextFunction
    ): void | Promise<void>;
    getProblemVersion(
        req: express.Request<
            {
                problemId: SeedTrace.ProblemId;
                problemVersion: number;
            },
            SeedTrace.v2.ProblemInfoV2,
            never,
            never
        >,
        res: {
            send: (responseBody: SeedTrace.v2.ProblemInfoV2) => Promise<void>;
            cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
            locals: any;
        },
        next: express.NextFunction
    ): void | Promise<void>;
}

export class ProblemService {
    private router;

    constructor(private readonly methods: ProblemServiceMethods, middleware: express.RequestHandler[] = []) {
        this.router = express.Router({ mergeParams: true }).use(
            express.json({
                strict: false,
            }),
            ...middleware
        );
    }

    public addMiddleware(handler: express.RequestHandler): this {
        this.router.use(handler);
        return this;
    }

    public toRouter(): express.Router {
        this.router.get("/lightweight-problem-info", async (req, res, next) => {
            try {
                await this.methods.getLightweightProblems(
                    req as any,
                    {
                        send: async (responseBody) => {
                            res.json(responseBody);
                        },
                        cookie: res.cookie.bind(res),
                        locals: res.locals,
                    },
                    next
                );
                next();
            } catch (error) {
                if (error instanceof errors.SeedTraceError) {
                    console.warn(
                        `Endpoint 'getLightweightProblems' unexpectedly threw ${error.constructor.name}.` +
                            ` If this was intentional, please add ${error.constructor.name} to` +
                            " the endpoint's errors list in your Fern Definition."
                    );
                    await error.send(res);
                } else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        });
        this.router.get("/problem-info", async (req, res, next) => {
            try {
                await this.methods.getProblems(
                    req as any,
                    {
                        send: async (responseBody) => {
                            res.json(responseBody);
                        },
                        cookie: res.cookie.bind(res),
                        locals: res.locals,
                    },
                    next
                );
                next();
            } catch (error) {
                if (error instanceof errors.SeedTraceError) {
                    console.warn(
                        `Endpoint 'getProblems' unexpectedly threw ${error.constructor.name}.` +
                            ` If this was intentional, please add ${error.constructor.name} to` +
                            " the endpoint's errors list in your Fern Definition."
                    );
                    await error.send(res);
                } else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        });
        this.router.get("/problem-info/:problemId", async (req, res, next) => {
            try {
                await this.methods.getLatestProblem(
                    req as any,
                    {
                        send: async (responseBody) => {
                            res.json(responseBody);
                        },
                        cookie: res.cookie.bind(res),
                        locals: res.locals,
                    },
                    next
                );
                next();
            } catch (error) {
                if (error instanceof errors.SeedTraceError) {
                    console.warn(
                        `Endpoint 'getLatestProblem' unexpectedly threw ${error.constructor.name}.` +
                            ` If this was intentional, please add ${error.constructor.name} to` +
                            " the endpoint's errors list in your Fern Definition."
                    );
                    await error.send(res);
                } else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        });
        this.router.get("/problem-info/:problemId/version/:problemVersion", async (req, res, next) => {
            try {
                await this.methods.getProblemVersion(
                    req as any,
                    {
                        send: async (responseBody) => {
                            res.json(responseBody);
                        },
                        cookie: res.cookie.bind(res),
                        locals: res.locals,
                    },
                    next
                );
                next();
            } catch (error) {
                if (error instanceof errors.SeedTraceError) {
                    console.warn(
                        `Endpoint 'getProblemVersion' unexpectedly threw ${error.constructor.name}.` +
                            ` If this was intentional, please add ${error.constructor.name} to` +
                            " the endpoint's errors list in your Fern Definition."
                    );
                    await error.send(res);
                } else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        });
        return this.router;
    }
}

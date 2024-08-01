/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "./core";
import { Dummy } from "./api/resources/dummy/client/Client";

export declare namespace SeedStreamingClient {
    interface Options {
        environment: core.Supplier<string>;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class SeedStreamingClient {
    constructor(protected readonly _options: SeedStreamingClient.Options) {}

    protected _dummy: Dummy | undefined;

    public get dummy(): Dummy {
        return (this._dummy ??= new Dummy(this._options));
    }
}

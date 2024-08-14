/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "../../../../core";
import * as SeedErrorProperty from "../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization/index";
import * as errors from "../../../../errors/index";

export declare namespace PropertyBasedError {
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

export class PropertyBasedError {
    constructor(protected readonly _options: PropertyBasedError.Options) {
    }

    /**
     * GET request that always throws an error
     *
     * @param {PropertyBasedError.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link SeedErrorProperty.PropertyBasedErrorTest}
     *
     * @example
     *     await client.propertyBasedError.throwError()
     */
    public async throwError(requestOptions?: PropertyBasedError.RequestOptions): Promise<string> {
        const _response = await core.fetcher({
            url: urlJoin(await core.Supplier.get(this._options.environment), "property-based-error"),
            method: "GET",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/error-property",
                "X-Fern-SDK-Version": "0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? (requestOptions.timeoutInSeconds * 1000) : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal
        });
        if (_response.ok) {
            return serializers.propertyBasedError.throwError.Response.parseOrThrow(_response.body, { unrecognizedObjectKeys: "passthrough", allowUnrecognizedUnionMembers: true, allowUnrecognizedEnumValues: true, breadcrumbsPrefix: ["response"] });
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as any)?.["errorName"]) {
                case "PropertyBasedErrorTest": throw new SeedErrorProperty.PropertyBasedErrorTest(serializers.PropertyBasedErrorTestBody.parseOrThrow(_response.error.body, { unrecognizedObjectKeys: "passthrough", allowUnrecognizedUnionMembers: true, allowUnrecognizedEnumValues: true, breadcrumbsPrefix: ["response"] }));
                default: throw new errors.SeedErrorPropertyError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.body
                });
            }
        }

        switch (_response.error.reason) {
            case "non-json": throw new errors.SeedErrorPropertyError({
                statusCode: _response.error.statusCode,
                body: _response.error.rawBody
            });
            case "timeout": throw new errors.SeedErrorPropertyTimeoutError;
            case "unknown": throw new errors.SeedErrorPropertyError({
                message: _response.error.errorMessage
            });
        }
    }
}

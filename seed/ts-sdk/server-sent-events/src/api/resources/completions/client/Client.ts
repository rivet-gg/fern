/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "../../../../core";
import * as SeedServerSentEvents from "../../../index";
import * as serializers from "../../../../serialization/index";
import urlJoin from "url-join";
import * as stream from "stream";
import * as errors from "../../../../errors/index";

export declare namespace Completions {
    interface Options {
        environment: core.Supplier<string>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class Completions {
    constructor(protected readonly _options: Completions.Options) {}

    public async stream(
        request: SeedServerSentEvents.StreamCompletionRequest,
        requestOptions?: Completions.RequestOptions
    ): Promise<core.Stream<SeedServerSentEvents.StreamedCompletion>> {
        const _response = await core.fetcher<stream.Readable>({
            url: urlJoin(await core.Supplier.get(this._options.environment), "stream"),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/server-sent-events",
                "X-Fern-SDK-Version": "0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            body: await serializers.StreamCompletionRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            responseType: "streaming",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return new core.Stream({
                stream: _response.body,
                parse: async (data) => {
                    return await serializers.StreamedCompletion.parseOrThrow(data, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        breadcrumbsPrefix: ["response"],
                    });
                },
                eventShape: {
                    type: "sse",
                    streamTerminator: "[[DONE]]",
                },
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedServerSentEventsError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedServerSentEventsError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedServerSentEventsTimeoutError();
            case "unknown":
                throw new errors.SeedServerSentEventsError({
                    message: _response.error.errorMessage,
                });
        }
    }
}
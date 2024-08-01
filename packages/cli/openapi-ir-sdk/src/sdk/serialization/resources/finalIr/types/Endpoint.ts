/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernOpenapiIr from "../../../../api";
import * as core from "../../../../core";

export const Endpoint: core.serialization.ObjectSchema<serializers.Endpoint.Raw, FernOpenapiIr.Endpoint> =
    core.serialization
        .objectWithoutOptionalProperties({
            authed: core.serialization.boolean(),
            internal: core.serialization.boolean().optional(),
            idempotent: core.serialization.boolean().optional(),
            method: core.serialization.lazy(async () => (await import("../../..")).HttpMethod),
            audiences: core.serialization.list(core.serialization.string()),
            path: core.serialization.string(),
            summary: core.serialization.string().optional(),
            operationId: core.serialization.string().optional(),
            tags: core.serialization.list(core.serialization.lazy(async () => (await import("../../..")).TagId)),
            pathParameters: core.serialization.list(
                core.serialization.lazyObject(async () => (await import("../../..")).PathParameter)
            ),
            queryParameters: core.serialization.list(
                core.serialization.lazyObject(async () => (await import("../../..")).QueryParameter)
            ),
            headers: core.serialization.list(
                core.serialization.lazyObject(async () => (await import("../../..")).Header)
            ),
            sdkName: core.serialization.lazyObject(async () => (await import("../../..")).EndpointSdkName).optional(),
            generatedRequestName: core.serialization.string(),
            requestNameOverride: core.serialization.string().optional(),
            request: core.serialization.lazy(async () => (await import("../../..")).Request).optional(),
            response: core.serialization.lazy(async () => (await import("../../..")).Response).optional(),
            errors: core.serialization.record(
                core.serialization.lazy(async () => (await import("../../..")).StatusCode),
                core.serialization.lazyObject(async () => (await import("../../..")).HttpError)
            ),
            server: core.serialization.list(
                core.serialization.lazyObject(async () => (await import("../../..")).Server)
            ),
            examples: core.serialization.list(
                core.serialization.lazy(async () => (await import("../../..")).EndpointExample)
            ),
            pagination: core.serialization.lazy(async () => (await import("../../..")).Pagination).optional(),
        })
        .extend(core.serialization.lazyObject(async () => (await import("../../..")).WithDescription))
        .extend(core.serialization.lazyObject(async () => (await import("../../..")).WithAvailability));

export declare namespace Endpoint {
    interface Raw extends serializers.WithDescription.Raw, serializers.WithAvailability.Raw {
        authed: boolean;
        internal?: boolean | null;
        idempotent?: boolean | null;
        method: serializers.HttpMethod.Raw;
        audiences: string[];
        path: string;
        summary?: string | null;
        operationId?: string | null;
        tags: serializers.TagId.Raw[];
        pathParameters: serializers.PathParameter.Raw[];
        queryParameters: serializers.QueryParameter.Raw[];
        headers: serializers.Header.Raw[];
        sdkName?: serializers.EndpointSdkName.Raw | null;
        generatedRequestName: string;
        requestNameOverride?: string | null;
        request?: serializers.Request.Raw | null;
        response?: serializers.Response.Raw | null;
        errors: Record<serializers.StatusCode.Raw, serializers.HttpError.Raw>;
        server: serializers.Server.Raw[];
        examples: serializers.EndpointExample.Raw[];
        pagination?: serializers.Pagination.Raw | null;
    }
}

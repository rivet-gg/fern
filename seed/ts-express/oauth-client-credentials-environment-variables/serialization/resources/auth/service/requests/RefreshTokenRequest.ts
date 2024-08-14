/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as SeedOauthClientCredentialsEnvironmentVariables from "../../../../../api/index";
import * as core from "../../../../../core";

export const RefreshTokenRequest: core.serialization.Schema<
    serializers.RefreshTokenRequest.Raw,
    SeedOauthClientCredentialsEnvironmentVariables.RefreshTokenRequest
> = core.serialization.object({
    clientId: core.serialization.property("client_id", core.serialization.string()),
    clientSecret: core.serialization.property("client_secret", core.serialization.string()),
    refreshToken: core.serialization.property("refresh_token", core.serialization.string()),
    audience: core.serialization.stringLiteral("https://api.example.com"),
    grantType: core.serialization.property("grant_type", core.serialization.stringLiteral("refresh_token")),
    scope: core.serialization.string().optional(),
});

export declare namespace RefreshTokenRequest {
    interface Raw {
        client_id: string;
        client_secret: string;
        refresh_token: string;
        audience: "https://api.example.com";
        grant_type: "refresh_token";
        scope?: string | null;
    }
}

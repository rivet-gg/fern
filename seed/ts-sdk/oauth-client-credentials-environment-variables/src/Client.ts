/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "./core";
import { Auth } from "./api/resources/auth/client/Client";

export declare namespace SeedOauthClientCredentialsEnvironmentVariablesClient {
    interface Options {
        environment: core.Supplier<string>;
        clientId?: core.Supplier<string>;
        clientSecret?: core.Supplier<string>;
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

export class SeedOauthClientCredentialsEnvironmentVariablesClient {
    private readonly _oauthTokenProvider: core.OAuthTokenProvider;

    constructor(protected readonly _options: SeedOauthClientCredentialsEnvironmentVariablesClient.Options) {


                        
                            const clientId = this._options.clientId ?? process.env["CLIENT_ID"];
                            if (clientId == null) {
                                throw new Error(
                                    "clientId is required; either pass it as an argument or set the CLIENT_ID environment variable"
                                );
                            }
                        

                        
                            const clientSecret = this._options.clientSecret ?? process.env["CLIENT_SECRET"];
                            if (clientSecret == null) {
                                throw new Error(
                                    "clientSecret is required; either pass it as an argument or set the CLIENT_SECRET environment variable"
                                );
                            }
                        

                        this._oauthTokenProvider = new core.OAuthTokenProvider({
                            
                        clientId
                    ,
                            
                        clientSecret
                    ,
                            authClient: new Auth({
                                environment: this._options.environment,
                            }),
                        });
                    
    }

    protected _auth: Auth | undefined;

    public get auth(): Auth {
        return (this._auth ??= new Auth({
            ...this._options,
            token: async () => await this._oauthTokenProvider.getToken()
        }));
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.queryParameters;

import com.seed.queryParameters.core.ClientOptions;
import com.seed.queryParameters.core.Suppliers;
import com.seed.queryParameters.resources.user.UserClient;
import java.util.function.Supplier;

public class SeedQueryParametersClient {
    protected final ClientOptions clientOptions;

    protected final Supplier<UserClient> userClient;

    public SeedQueryParametersClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
        this.userClient = Suppliers.memoize(() -> new UserClient(clientOptions));
    }

    public UserClient user() {
        return this.userClient.get();
    }

    public static SeedQueryParametersClientBuilder builder() {
        return new SeedQueryParametersClientBuilder();
    }
}

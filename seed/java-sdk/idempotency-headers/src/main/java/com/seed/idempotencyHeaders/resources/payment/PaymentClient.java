/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.idempotencyHeaders.resources.payment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seed.idempotencyHeaders.core.ClientOptions;
import com.seed.idempotencyHeaders.core.IdempotentRequestOptions;
import com.seed.idempotencyHeaders.core.MediaTypes;
import com.seed.idempotencyHeaders.core.ObjectMappers;
import com.seed.idempotencyHeaders.core.RequestOptions;
import com.seed.idempotencyHeaders.core.SeedIdempotencyHeadersApiException;
import com.seed.idempotencyHeaders.core.SeedIdempotencyHeadersException;
import com.seed.idempotencyHeaders.resources.payment.requests.CreatePaymentRequest;
import java.io.IOException;
import java.util.UUID;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class PaymentClient {
    protected final ClientOptions clientOptions;

    public PaymentClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
    }

    public UUID create(CreatePaymentRequest request) {
        return create(request, null);
    }

    public UUID create(CreatePaymentRequest request, IdempotentRequestOptions requestOptions) {
        HttpUrl httpUrl = HttpUrl.parse(this.clientOptions.environment().getUrl())
                .newBuilder()
                .addPathSegments("payment")
                .build();
        RequestBody body;
        try {
            body = RequestBody.create(
                    ObjectMappers.JSON_MAPPER.writeValueAsBytes(request), MediaTypes.APPLICATION_JSON);
        } catch (JsonProcessingException e) {
            throw new SeedIdempotencyHeadersException("Failed to serialize request", e);
        }
        Request okhttpRequest = new Request.Builder()
                .url(httpUrl)
                .method("POST", body)
                .headers(Headers.of(clientOptions.headers(requestOptions)))
                .addHeader("Content-Type", "application/json")
                .build();
        OkHttpClient client = clientOptions.httpClient();
        if (requestOptions != null && requestOptions.getTimeout().isPresent()) {
            client = clientOptions.httpClientWithTimeout(requestOptions);
        }
        try (Response response = client.newCall(okhttpRequest).execute()) {
            ResponseBody responseBody = response.body();
            if (response.isSuccessful()) {
                return ObjectMappers.JSON_MAPPER.readValue(responseBody.string(), UUID.class);
            }
            String responseBodyString = responseBody != null ? responseBody.string() : "{}";
            throw new SeedIdempotencyHeadersApiException(
                    "Error with status code " + response.code(),
                    response.code(),
                    ObjectMappers.JSON_MAPPER.readValue(responseBodyString, Object.class));
        } catch (IOException e) {
            throw new SeedIdempotencyHeadersException("Network error executing HTTP request", e);
        }
    }

    public void delete(String paymentId) {
        delete(paymentId, null);
    }

    public void delete(String paymentId, RequestOptions requestOptions) {
        HttpUrl httpUrl = HttpUrl.parse(this.clientOptions.environment().getUrl())
                .newBuilder()
                .addPathSegments("payment")
                .addPathSegment(paymentId)
                .build();
        Request okhttpRequest = new Request.Builder()
                .url(httpUrl)
                .method("DELETE", null)
                .headers(Headers.of(clientOptions.headers(requestOptions)))
                .build();
        OkHttpClient client = clientOptions.httpClient();
        if (requestOptions != null && requestOptions.getTimeout().isPresent()) {
            client = clientOptions.httpClientWithTimeout(requestOptions);
        }
        try (Response response = client.newCall(okhttpRequest).execute()) {
            ResponseBody responseBody = response.body();
            if (response.isSuccessful()) {
                return;
            }
            String responseBodyString = responseBody != null ? responseBody.string() : "{}";
            throw new SeedIdempotencyHeadersApiException(
                    "Error with status code " + response.code(),
                    response.code(),
                    ObjectMappers.JSON_MAPPER.readValue(responseBodyString, Object.class));
        } catch (IOException e) {
            throw new SeedIdempotencyHeadersException("Network error executing HTTP request", e);
        }
    }
}

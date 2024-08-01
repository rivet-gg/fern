/**
 * This file was auto-generated by Fern from our API Definition.
 */

package com.fern.sdk.resources.types.object.errors;

import com.fern.sdk.core.SeedExhaustiveApiException;
import com.fern.sdk.resources.types.object.types.ObjectWithOptionalField;

public final class ObjectWithOptionalFieldError extends SeedExhaustiveApiException {
  /**
   * The body of the response that triggered the exception.
   */
  private final ObjectWithOptionalField body;

  public ObjectWithOptionalFieldError(ObjectWithOptionalField body) {
    super("ObjectWithOptionalFieldError", 400, body);
    this.body = body;
  }

  /**
   * @return the body
   */
  @java.lang.Override
  public ObjectWithOptionalField body() {
    return this.body;
  }
}

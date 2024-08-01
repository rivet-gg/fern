/**
 * This file was auto-generated by Fern from our API Definition.
 */

package com.fern.sdk.resources.types.union.errors;

import com.fern.sdk.core.SeedExhaustiveApiException;
import com.fern.sdk.resources.types.union.types.Animal;

public final class ErrorWithUnionBody extends SeedExhaustiveApiException {
  /**
   * The body of the response that triggered the exception.
   */
  private final Animal body;

  public ErrorWithUnionBody(Animal body) {
    super("ErrorWithUnionBody", 400, body);
    this.body = body;
  }

  /**
   * @return the body
   */
  @java.lang.Override
  public Animal body() {
    return this.body;
  }
}

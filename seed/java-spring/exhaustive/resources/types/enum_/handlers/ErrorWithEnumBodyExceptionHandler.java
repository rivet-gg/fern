/**
 * This file was auto-generated by Fern from our API Definition.
 */

package resources.types.enum_.handlers;

import java.lang.Object;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import resources.types.enum_.exceptions.ErrorWithEnumBody;

@RestControllerAdvice
public final class ErrorWithEnumBodyExceptionHandler {
  @ExceptionHandler(ErrorWithEnumBody.class)
  ResponseEntity<Object> handle(ErrorWithEnumBody errorWithEnumBody) {
    return new ResponseEntity<>(errorWithEnumBody.getBody(), null, ErrorWithEnumBody.STATUS_CODE);
  }
}

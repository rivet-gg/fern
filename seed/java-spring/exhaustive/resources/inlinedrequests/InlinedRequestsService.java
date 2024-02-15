/**
 * This file was auto-generated by Fern from our API Definition.
 */

package resources.inlinedrequests;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.generalerrors.exceptions.BadRequestBody;
import resources.inlinedrequests.requests.PostWithObjectBody;
import resources.types.object.types.ObjectWithOptionalField;

@RequestMapping(
    path = "/req-bodies"
)
public interface InlinedRequestsService {
  @PostMapping(
      value = "/object",
      produces = "application/json",
      consumes = "application/json"
  )
  ObjectWithOptionalField postWithObjectBodyandResponse(@RequestBody PostWithObjectBody body) throws
      BadRequestBody;
}

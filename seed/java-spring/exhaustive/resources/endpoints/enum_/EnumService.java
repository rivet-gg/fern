/**
 * This file was auto-generated by Fern from our API Definition.
 */

package resources.endpoints.enum_;

import core.BearerAuth;
import java.security.Principal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.types.enum_.types.WeatherReport;

@RequestMapping(
    path = "/enum"
)
public interface EnumService {
  @PostMapping(
      value = "",
      produces = "application/json",
      consumes = "application/json"
  )
  WeatherReport getAndReturnEnum(@RequestHeader("Authorization") BearerAuth auth,
      Principal principal, @RequestBody WeatherReport body);
}
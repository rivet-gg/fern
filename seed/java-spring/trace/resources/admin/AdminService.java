/**
 * This file was auto-generated by Fern from our API Definition.
 */

package resources.admin;

import java.lang.String;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import resources.admin.requests.StoreTracedTestCaseRequest;
import resources.admin.requests.StoreTracedWorkspaceRequest;
import resources.submission.types.SubmissionId;
import resources.submission.types.TestSubmissionStatus;
import resources.submission.types.TestSubmissionUpdate;
import resources.submission.types.TraceResponseV2;
import resources.submission.types.WorkspaceSubmissionStatus;
import resources.submission.types.WorkspaceSubmissionUpdate;
import resources.v2.problem.types.TestCaseId;

@RequestMapping(
    path = "/admin"
)
public interface AdminService {
  @PostMapping(
      value = "/store-test-submission-status/{submissionId}",
      produces = "application/json",
      consumes = "application/json"
  )
  void updateTestSubmissionStatus(@RequestHeader("X-Random-Header") Optional<String> xRandomHeader,
      @PathVariable("submissionId") SubmissionId submissionId,
      @RequestBody TestSubmissionStatus body);

  @PostMapping(
      value = "/store-test-submission-status-v2/{submissionId}",
      produces = "application/json",
      consumes = "application/json"
  )
  void sendTestSubmissionUpdate(@RequestHeader("X-Random-Header") Optional<String> xRandomHeader,
      @PathVariable("submissionId") SubmissionId submissionId,
      @RequestBody TestSubmissionUpdate body);

  @PostMapping(
      value = "/store-workspace-submission-status/{submissionId}",
      produces = "application/json",
      consumes = "application/json"
  )
  void updateWorkspaceSubmissionStatus(
      @RequestHeader("X-Random-Header") Optional<String> xRandomHeader,
      @PathVariable("submissionId") SubmissionId submissionId,
      @RequestBody WorkspaceSubmissionStatus body);

  @PostMapping(
      value = "/store-workspace-submission-status-v2/{submissionId}",
      produces = "application/json",
      consumes = "application/json"
  )
  void sendWorkspaceSubmissionUpdate(
      @RequestHeader("X-Random-Header") Optional<String> xRandomHeader,
      @PathVariable("submissionId") SubmissionId submissionId,
      @RequestBody WorkspaceSubmissionUpdate body);

  @PostMapping(
      value = "/store-test-trace/submission/{submissionId}/testCase/{testCaseId}",
      produces = "application/json",
      consumes = "application/json"
  )
  void storeTracedTestCase(@RequestHeader("X-Random-Header") Optional<String> xRandomHeader,
      @PathVariable("submissionId") SubmissionId submissionId,
      @PathVariable("testCaseId") String testCaseId, @RequestBody StoreTracedTestCaseRequest body);

  @PostMapping(
      value = "/store-test-trace-v2/submission/{submissionId}/testCase/{testCaseId}",
      produces = "application/json",
      consumes = "application/json"
  )
  void storeTracedTestCaseV2(@RequestHeader("X-Random-Header") Optional<String> xRandomHeader,
      @PathVariable("submissionId") SubmissionId submissionId,
      @PathVariable("testCaseId") TestCaseId testCaseId, @RequestBody List<TraceResponseV2> body);

  @PostMapping(
      value = "/store-workspace-trace/submission/{submissionId}",
      produces = "application/json",
      consumes = "application/json"
  )
  void storeTracedWorkspace(@RequestHeader("X-Random-Header") Optional<String> xRandomHeader,
      @PathVariable("submissionId") SubmissionId submissionId,
      @RequestBody StoreTracedWorkspaceRequest body);

  @PostMapping(
      value = "/store-workspace-trace-v2/submission/{submissionId}",
      produces = "application/json",
      consumes = "application/json"
  )
  void storeTracedWorkspaceV2(@RequestHeader("X-Random-Header") Optional<String> xRandomHeader,
      @PathVariable("submissionId") SubmissionId submissionId,
      @RequestBody List<TraceResponseV2> body);
}

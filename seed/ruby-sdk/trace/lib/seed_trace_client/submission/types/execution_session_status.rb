# frozen_string_literal: true

module SeedTraceClient
  class Submission
    # @type [EXECUTION_SESSION_STATUS]
    EXECUTION_SESSION_STATUS = {
      creating_container: "CREATING_CONTAINER",
      provisioning_container: "PROVISIONING_CONTAINER",
      pending_container: "PENDING_CONTAINER",
      running_container: "RUNNING_CONTAINER",
      live_container: "LIVE_CONTAINER",
      failed_to_launch: "FAILED_TO_LAUNCH"
    }.freeze
  end
end

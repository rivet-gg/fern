# frozen_string_literal: true

require_relative "../../commons/types/language"
require_relative "execution_session_status"
require "json"

module SeedTraceClient
  class Submission
    class ExecutionSessionState
      attr_reader :last_time_contacted, :session_id, :is_warm_instance, :aws_task_id, :language, :status,
                  :additional_properties

      # @param last_time_contacted [String]
      # @param session_id [String] The auto-generated session id. Formatted as a uuid.
      # @param is_warm_instance [Boolean]
      # @param aws_task_id [String]
      # @param language [LANGUAGE]
      # @param status [EXECUTION_SESSION_STATUS]
      # @param additional_properties [OpenStruct] Additional properties unmapped to the current class definition
      # @return [Submission::ExecutionSessionState]
      def initialize(session_id:, is_warm_instance:, language:, status:, last_time_contacted: nil, aws_task_id: nil,
                     additional_properties: nil)
        # @type [String]
        @last_time_contacted = last_time_contacted
        # @type [String] The auto-generated session id. Formatted as a uuid.
        @session_id = session_id
        # @type [Boolean]
        @is_warm_instance = is_warm_instance
        # @type [String]
        @aws_task_id = aws_task_id
        # @type [LANGUAGE]
        @language = language
        # @type [EXECUTION_SESSION_STATUS]
        @status = status
        # @type [OpenStruct] Additional properties unmapped to the current class definition
        @additional_properties = additional_properties
      end

      # Deserialize a JSON object to an instance of ExecutionSessionState
      #
      # @param json_object [JSON]
      # @return [Submission::ExecutionSessionState]
      def self.from_json(json_object:)
        struct = JSON.parse(json_object, object_class: OpenStruct)
        parsed_json = JSON.parse(json_object)
        last_time_contacted = struct.lastTimeContacted
        session_id = struct.sessionId
        is_warm_instance = struct.isWarmInstance
        aws_task_id = struct.awsTaskId
        language = Commons::LANGUAGE.key(parsed_json["language"]) || parsed_json["language"]
        status = Submission::EXECUTION_SESSION_STATUS.key(parsed_json["status"]) || parsed_json["status"]
        new(last_time_contacted: last_time_contacted, session_id: session_id, is_warm_instance: is_warm_instance,
            aws_task_id: aws_task_id, language: language, status: status, additional_properties: struct)
      end

      # Serialize an instance of ExecutionSessionState to a JSON object
      #
      # @return [JSON]
      def to_json(*_args)
        {
          "lastTimeContacted": @last_time_contacted,
          "sessionId": @session_id,
          "isWarmInstance": @is_warm_instance,
          "awsTaskId": @aws_task_id,
          "language": Commons::LANGUAGE[@language] || @language,
          "status": Submission::EXECUTION_SESSION_STATUS[@status] || @status
        }.to_json
      end

      # Leveraged for Union-type generation, validate_raw attempts to parse the given hash and check each fields type against the current object's property definitions.
      #
      # @param obj [Object]
      # @return [Void]
      def self.validate_raw(obj:)
        obj.last_time_contacted&.is_a?(String) != false || raise("Passed value for field obj.last_time_contacted is not the expected type, validation failed.")
        obj.session_id.is_a?(String) != false || raise("Passed value for field obj.session_id is not the expected type, validation failed.")
        obj.is_warm_instance.is_a?(Boolean) != false || raise("Passed value for field obj.is_warm_instance is not the expected type, validation failed.")
        obj.aws_task_id&.is_a?(String) != false || raise("Passed value for field obj.aws_task_id is not the expected type, validation failed.")
        obj.language.is_a?(Commons::LANGUAGE) != false || raise("Passed value for field obj.language is not the expected type, validation failed.")
        obj.status.is_a?(Submission::EXECUTION_SESSION_STATUS) != false || raise("Passed value for field obj.status is not the expected type, validation failed.")
      end
    end
  end
end

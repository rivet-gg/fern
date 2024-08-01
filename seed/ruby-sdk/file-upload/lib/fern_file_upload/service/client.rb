# frozen_string_literal: true

require_relative "../../requests"
require_relative "types/my_object"
require_relative "../../core/file_utilities"
require "async"

module SeedFileUploadClient
  class ServiceClient
    # @return [SeedFileUploadClient::RequestClient]
    attr_reader :request_client

    # @param request_client [SeedFileUploadClient::RequestClient]
    # @return [SeedFileUploadClient::ServiceClient]
    def initialize(request_client:)
      @request_client = request_client
    end

    # @param maybe_string [String]
    # @param integer [Integer]
    # @param file [String, IO]
    # @param file_list [String, IO]
    # @param maybe_file [String, IO]
    # @param maybe_file_list [String, IO]
    # @param maybe_integer [Integer]
    # @param optional_list_of_strings [Array<String>]
    # @param list_of_objects [Array<Hash>] Request of type Array<SeedFileUploadClient::Service::MyObject>, as a Hash
    #   * :foo (String)
    # @param request_options [SeedFileUploadClient::RequestOptions]
    # @return [Void]
    # @example
    #  file_upload = SeedFileUploadClient::Client.new(base_url: "https://api.example.com")
    #  file_upload.service.post(
    #    file: my_file.txt,
    #    file_list: my_file.txt,
    #    maybe_file: my_file.txt,
    #    maybe_file_list: my_file.txt
    #  )
    def post(integer:, file:, file_list:, list_of_objects:, maybe_string: nil, maybe_file: nil, maybe_file_list: nil, maybe_integer: nil,
             optional_list_of_strings: nil, request_options: nil)
      @request_client.conn.post do |req|
        req.options.timeout = request_options.timeout_in_seconds unless request_options&.timeout_in_seconds.nil?
        req.headers = {
      **(req.headers || {}),
      **@request_client.get_headers,
      **(request_options&.additional_headers || {})
        }.compact
        unless request_options.nil? || request_options&.additional_query_parameters.nil?
          req.params = { **(request_options&.additional_query_parameters || {}) }.compact
        end
        req.body = {
          **(request_options&.additional_body_parameters || {}),
          maybeString: maybe_string,
          integer: integer,
          file: SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: file),
          fileList: SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: file_list),
          maybeFile: unless maybe_file.nil?
                       SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: maybe_file)
                     end,
          maybeFileList: unless maybe_file_list.nil?
                           SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: maybe_file_list)
                         end,
          maybeInteger: maybe_integer,
          optionalListOfStrings: optional_list_of_strings,
          listOfObjects: list_of_objects
        }.compact
        req.url "#{@request_client.get_url(request_options: request_options)}/"
      end
    end

    # @param file [String, IO]
    # @param request_options [SeedFileUploadClient::RequestOptions]
    # @return [Void]
    # @example
    #  file_upload = SeedFileUploadClient::Client.new(base_url: "https://api.example.com")
    #  file_upload.service.just_file(file: my_file.txt)
    def just_file(file:, request_options: nil)
      @request_client.conn.post do |req|
        req.options.timeout = request_options.timeout_in_seconds unless request_options&.timeout_in_seconds.nil?
        req.headers = {
      **(req.headers || {}),
      **@request_client.get_headers,
      **(request_options&.additional_headers || {})
        }.compact
        unless request_options.nil? || request_options&.additional_query_parameters.nil?
          req.params = { **(request_options&.additional_query_parameters || {}) }.compact
        end
        req.body = {
          **(request_options&.additional_body_parameters || {}),
          file: SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: file)
        }.compact
        req.url "#{@request_client.get_url(request_options: request_options)}/just-file"
      end
    end

    # @param maybe_string [String]
    # @param integer [Integer]
    # @param maybe_integer [Integer]
    # @param list_of_strings [String]
    # @param optional_list_of_strings [String]
    # @param file [String, IO]
    # @param request_options [SeedFileUploadClient::RequestOptions]
    # @return [Void]
    # @example
    #  file_upload = SeedFileUploadClient::Client.new(base_url: "https://api.example.com")
    #  file_upload.service.just_file_with_query_params(
    #    maybe_string: "string",
    #    integer: 1,
    #    maybe_integer: 1,
    #    list_of_strings: "string",
    #    optional_list_of_strings: "string",
    #    file: my_file.txt
    #  )
    def just_file_with_query_params(integer:, list_of_strings:, file:, maybe_string: nil, maybe_integer: nil,
                                    optional_list_of_strings: nil, request_options: nil)
      @request_client.conn.post do |req|
        req.options.timeout = request_options.timeout_in_seconds unless request_options&.timeout_in_seconds.nil?
        req.headers = {
      **(req.headers || {}),
      **@request_client.get_headers,
      **(request_options&.additional_headers || {})
        }.compact
        req.params = {
          **(request_options&.additional_query_parameters || {}),
          "maybeString": maybe_string,
          "integer": integer,
          "maybeInteger": maybe_integer,
          "listOfStrings": list_of_strings,
          "optionalListOfStrings": optional_list_of_strings
        }.compact
        req.body = {
          **(request_options&.additional_body_parameters || {}),
          file: SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: file)
        }.compact
        req.url "#{@request_client.get_url(request_options: request_options)}/just-file-with-query-params"
      end
    end
  end

  class AsyncServiceClient
    # @return [SeedFileUploadClient::AsyncRequestClient]
    attr_reader :request_client

    # @param request_client [SeedFileUploadClient::AsyncRequestClient]
    # @return [SeedFileUploadClient::AsyncServiceClient]
    def initialize(request_client:)
      @request_client = request_client
    end

    # @param maybe_string [String]
    # @param integer [Integer]
    # @param file [String, IO]
    # @param file_list [String, IO]
    # @param maybe_file [String, IO]
    # @param maybe_file_list [String, IO]
    # @param maybe_integer [Integer]
    # @param optional_list_of_strings [Array<String>]
    # @param list_of_objects [Array<Hash>] Request of type Array<SeedFileUploadClient::Service::MyObject>, as a Hash
    #   * :foo (String)
    # @param request_options [SeedFileUploadClient::RequestOptions]
    # @return [Void]
    # @example
    #  file_upload = SeedFileUploadClient::Client.new(base_url: "https://api.example.com")
    #  file_upload.service.post(
    #    file: my_file.txt,
    #    file_list: my_file.txt,
    #    maybe_file: my_file.txt,
    #    maybe_file_list: my_file.txt
    #  )
    def post(integer:, file:, file_list:, list_of_objects:, maybe_string: nil, maybe_file: nil, maybe_file_list: nil, maybe_integer: nil,
             optional_list_of_strings: nil, request_options: nil)
      Async do
        @request_client.conn.post do |req|
          req.options.timeout = request_options.timeout_in_seconds unless request_options&.timeout_in_seconds.nil?
          req.headers = {
        **(req.headers || {}),
        **@request_client.get_headers,
        **(request_options&.additional_headers || {})
          }.compact
          unless request_options.nil? || request_options&.additional_query_parameters.nil?
            req.params = { **(request_options&.additional_query_parameters || {}) }.compact
          end
          req.body = {
            **(request_options&.additional_body_parameters || {}),
            maybeString: maybe_string,
            integer: integer,
            file: SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: file),
            fileList: SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: file_list),
            maybeFile: unless maybe_file.nil?
                         SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: maybe_file)
                       end,
            maybeFileList: unless maybe_file_list.nil?
                             SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: maybe_file_list)
                           end,
            maybeInteger: maybe_integer,
            optionalListOfStrings: optional_list_of_strings,
            listOfObjects: list_of_objects
          }.compact
          req.url "#{@request_client.get_url(request_options: request_options)}/"
        end
      end
    end

    # @param file [String, IO]
    # @param request_options [SeedFileUploadClient::RequestOptions]
    # @return [Void]
    # @example
    #  file_upload = SeedFileUploadClient::Client.new(base_url: "https://api.example.com")
    #  file_upload.service.just_file(file: my_file.txt)
    def just_file(file:, request_options: nil)
      Async do
        @request_client.conn.post do |req|
          req.options.timeout = request_options.timeout_in_seconds unless request_options&.timeout_in_seconds.nil?
          req.headers = {
        **(req.headers || {}),
        **@request_client.get_headers,
        **(request_options&.additional_headers || {})
          }.compact
          unless request_options.nil? || request_options&.additional_query_parameters.nil?
            req.params = { **(request_options&.additional_query_parameters || {}) }.compact
          end
          req.body = {
            **(request_options&.additional_body_parameters || {}),
            file: SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: file)
          }.compact
          req.url "#{@request_client.get_url(request_options: request_options)}/just-file"
        end
      end
    end

    # @param maybe_string [String]
    # @param integer [Integer]
    # @param maybe_integer [Integer]
    # @param list_of_strings [String]
    # @param optional_list_of_strings [String]
    # @param file [String, IO]
    # @param request_options [SeedFileUploadClient::RequestOptions]
    # @return [Void]
    # @example
    #  file_upload = SeedFileUploadClient::Client.new(base_url: "https://api.example.com")
    #  file_upload.service.just_file_with_query_params(
    #    maybe_string: "string",
    #    integer: 1,
    #    maybe_integer: 1,
    #    list_of_strings: "string",
    #    optional_list_of_strings: "string",
    #    file: my_file.txt
    #  )
    def just_file_with_query_params(integer:, list_of_strings:, file:, maybe_string: nil, maybe_integer: nil,
                                    optional_list_of_strings: nil, request_options: nil)
      Async do
        @request_client.conn.post do |req|
          req.options.timeout = request_options.timeout_in_seconds unless request_options&.timeout_in_seconds.nil?
          req.headers = {
        **(req.headers || {}),
        **@request_client.get_headers,
        **(request_options&.additional_headers || {})
          }.compact
          req.params = {
            **(request_options&.additional_query_parameters || {}),
            "maybeString": maybe_string,
            "integer": integer,
            "maybeInteger": maybe_integer,
            "listOfStrings": list_of_strings,
            "optionalListOfStrings": optional_list_of_strings
          }.compact
          req.body = {
            **(request_options&.additional_body_parameters || {}),
            file: SeedFileUploadClient::FileUtilities.as_faraday_multipart(file_like: file)
          }.compact
          req.url "#{@request_client.get_url(request_options: request_options)}/just-file-with-query-params"
        end
      end
    end
  end
end

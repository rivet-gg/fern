# frozen_string_literal: true

require_relative "../../requests"
require "async"

module SeedApiClient
  module Folder
    class FolderClient
      # @return [SeedApiClient::RequestClient]
      attr_reader :request_client

      # @param request_client [SeedApiClient::RequestClient]
      # @return [SeedApiClient::Folder::FolderClient]
      def initialize(request_client:)
        @request_client = request_client
      end

      # @param request_options [SeedApiClient::RequestOptions]
      # @return [Void]
      # @example
      #  api = SeedApiClient::Client.new(base_url: "https://api.example.com")
      #  api.folder.foo
      def foo(request_options: nil)
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
          unless request_options.nil? || request_options&.additional_body_parameters.nil?
            req.body = { **(request_options&.additional_body_parameters || {}) }.compact
          end
          req.url "#{@request_client.get_url(request_options: request_options)}/"
        end
      end
    end

    class AsyncFolderClient
      # @return [SeedApiClient::AsyncRequestClient]
      attr_reader :request_client

      # @param request_client [SeedApiClient::AsyncRequestClient]
      # @return [SeedApiClient::Folder::AsyncFolderClient]
      def initialize(request_client:)
        @request_client = request_client
      end

      # @param request_options [SeedApiClient::RequestOptions]
      # @return [Void]
      # @example
      #  api = SeedApiClient::Client.new(base_url: "https://api.example.com")
      #  api.folder.foo
      def foo(request_options: nil)
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
            unless request_options.nil? || request_options&.additional_body_parameters.nil?
              req.body = { **(request_options&.additional_body_parameters || {}) }.compact
            end
            req.url "#{@request_client.get_url(request_options: request_options)}/"
          end
        end
      end
    end
  end
end

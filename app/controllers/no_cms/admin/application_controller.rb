module NoCms
  module Admin
    class ApplicationController < ActionController::Base

      before_filter :initialize_logger

      def initialize_logger
        @logger = NoCms::Admin::Logger.new request
      end
    end
  end
end

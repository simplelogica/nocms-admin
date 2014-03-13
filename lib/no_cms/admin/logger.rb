module NoCms
  module Admin
    class Logger

      # We will need the request if we want to save the messages in flash
      def initialize request
        @request = request
        request.flash[:no_cms_admin_logger] ||= {}
        @messages = request.flash[:no_cms_admin_logger].dup
      end

      def messages_container later=false
        later ? @request.flash[:no_cms_admin_logger] : @messages
      end

      def info message, later=false
        container = messages_container later
        container[:info] ||= []
        container[:info] << message
      end

      def warning message, later=false
        container = messages_container later
        container[:warning] ||= []
        container[:warning] << message
      end

      def error message, later=false
        container = messages_container later
        container[:error] ||= []
        container[:error] << message
      end

      def messages types = []
        types.blank? ?
          @messages :
          @messages.select { |type, _| types.include? type }
      end

    end
  end
end

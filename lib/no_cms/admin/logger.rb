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
        add_message :info, message, later
      end

      def warning message, later=false
        add_message :warning, message, later
      end

      def error message, later=false
        add_message :error, message, later
      end

      def add_message type, message, later=false
        container = messages_container later
        container[type] ||= []
        container[type] << message
      end

      def messages types = []
        types.blank? ?
          @messages :
          @messages.select { |type, _| types.include? type }
      end

    end
  end
end

module NoCms
  module Admin
    class Logger

      # We will need the request if we want to save the messages in flash
      def initialize request
        @request = request
        @messages = {}
      end

      def info message
        @messages[:info] ||= []
        @messages[:info] << message
      end

      def warning message
        @messages[:warning] ||= []
        @messages[:warning] << message
      end

      def error message
        @messages[:error] ||= []
        @messages[:error] << message
      end

      def messages types
        @messages.select { |type, _| types.include? type }
      end

    end
  end
end

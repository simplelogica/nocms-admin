module NoCms
  module Admin
    class BackGenerator < Rails::Generators::Base

      source_root File.expand_path("../templates/", __FILE__)

      argument :plugin_name, :type => :string
      argument :model_name, :type => :string

      def plural_model_name
        model_name.pluralize
      end

      def singular_model_name
        model_name.singularize
      end

      def generate_controllers
        template "application/controllers/no_cms/admin/%plugin_name%/application_controller.rb"
        template "application/controllers/no_cms/admin/%plugin_name%/%plural_model_name%_controller.rb"
      end

      def self.namespace
        "no_cms:admin:back"
      end

    end
  end
end

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

      def locale
        I18n.locale
      end

      def generate_controllers
        template "app/controllers/no_cms/admin/%plugin_name%/application_controller.rb"
        template "app/controllers/no_cms/admin/%plugin_name%/%plural_model_name%_controller.rb"
      end

      def generate_views
        template "app/views/no_cms/admin/%plugin_name%/%plural_model_name%/_%singular_model_name%_listing.html.erb"
        template "app/views/no_cms/admin/%plugin_name%/%plural_model_name%/_%singular_model_name%_listing_item.html.erb"
        template "app/views/no_cms/admin/%plugin_name%/%plural_model_name%/_content_fields.html.erb"
        template "app/views/no_cms/admin/%plugin_name%/%plural_model_name%/_filter.html.erb"
        template "app/views/no_cms/admin/%plugin_name%/%plural_model_name%/_search.html.erb"
        template "app/views/no_cms/admin/%plugin_name%/%plural_model_name%/_toolbar_right.html.erb"
        template "app/views/no_cms/admin/%plugin_name%/%plural_model_name%/edit.html.erb"
        template "app/views/no_cms/admin/%plugin_name%/%plural_model_name%/index.html.erb"
        template "app/views/no_cms/admin/%plugin_name%/%plural_model_name%/new.html.erb"
      end

      def generate_helpers
        template "app/helpers/no_cms/admin/%plugin_name%/%plural_model_name%_helper.rb"
        template "app/helpers/no_cms/admin/%plugin_name%/application_helper.rb"
      end

      def generate_config
        template "config/routes.rb"
        template "config/locales/%locale%.yml"
      end

      def self.namespace
        "no_cms:admin:back"
      end

    end
  end
end

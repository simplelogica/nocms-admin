module NoCms
  module Admin
    module <%= plugin_name.camelize %>
      class ApplicationController < NoCms::Admin::ApplicationController
      end
    end
  end
end

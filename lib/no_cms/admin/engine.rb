module NoCms
  module Admin
    class Engine < ::Rails::Engine
      isolate_namespace NoCms::Admin
    end
  end
end

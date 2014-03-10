module NoCms
  module Admin
    include ActiveSupport::Configurable

    config_accessor :menu_items

    self.menu_items = []

  end
end

module NoCms
  module Admin
    module ApplicationHelper

      def menu_item_url menu_item
        menu_item[:url].is_a?(Proc) ?
          menu_item[:url].call :
          menu_item[:url]
      end

    end
  end
end

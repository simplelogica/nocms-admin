module NoCms
  module Admin
    module ApplicationHelper

      def menu_item_url menu_item
        menu_item[:url].is_a?(Proc) ?
          menu_item[:url].call :
          menu_item[:url]
      end

      def no_cms_admin_form_for(record, options = {}, &block)
        form_for record, options.merge(builder: NoCms::Admin::FormBuilder), &block
      end

    end
  end
end

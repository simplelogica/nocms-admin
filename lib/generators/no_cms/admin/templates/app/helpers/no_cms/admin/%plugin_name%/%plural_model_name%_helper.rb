module NoCms
  module Admin
    module <%= plugin_name.camelize %>
      module <%= plural_model_name.camelize %>Helper
        def <%= singular_model_name %>_listing_item_classes item, current
          classes = []
          classes << 'current' if current == item
          classes
        end
      end
    end
  end
end

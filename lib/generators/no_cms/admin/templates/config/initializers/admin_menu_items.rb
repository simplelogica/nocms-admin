NoCms::Admin.menu_items << {
  name: '<%= plural_model_name %>',
  url: proc { NoCms::Admin::<%= plugin_name.camelize %>::Engine.routes.url_helpers.<%= plural_model_name %>_path }
}

NoCms::Admin::<%= plugin_name.camelize %>::Engine.routes.draw do
  resources :<%= plural_model_name %>
end

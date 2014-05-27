require_dependency "no_cms/admin/plugin_name/application_controller"

module NoCms::Admin::<%= plugin_name.camelize %>
  class <%= model_name.camelize %>Controller < ApplicationController

    before_filter :load_menu_section
    before_filter :load_page, only: [:edit, :update, :destroy]
    before_filter :load_sidebar, only: [:index, :new, :edit]


    def new
      @<%= singular_model_name %> = NoCms::<%= plugin_name.camelize %>::<%= singular_model_name.camelize %>.new
    end

    def create
      @<%= singular_model_name %> = NoCms::<%= plugin_name.camelize %>::<%= singular_model_name.camelize %>.new <%= singular_model_name %>_params
      if @<%= singular_model_name %>.save
        @nocms_logger.info(I18n.t('.no_cms.admin.<%= plugin_name %>.<%= plural_model_name %>.create.success', title: @<%= singular_model_name %>.path), true)
        redirect_to <%= plural_model_name %>_path
      else
        @nocms_logger.error(I18n.t('.no_cms.admin.<%= plugin_name %>.<%= plural_model_name %>.create.error', title: @<%= singular_model_name %>.path))
        load_sidebar
        render :new
      end
    end

    def edit
      @nocms_logger.add_message :<%= plugin_name%>, I18n.t('.no_cms.admin.<%= plugin_name %>.<%= plural_model_name %>.edit.log_messages', title: @<%= singular_model_name %>.path)
    end

    def update
      if @<%= singular_model_name %>.update_attributes <%= singular_model_name %>_params
        @nocms_logger.info(I18n.t('.no_cms.admin.<%= plugin_name %>.<%= plural_model_name %>.update.success', title: @<%= singular_model_name %>.path), true)
        redirect_after_save
      else
        @nocms_logger.error(I18n.t('.no_cms.admin.<%= plugin_name %>.<%= plural_model_name %>.update.error', title: @<%= singular_model_name %>.path))
        load_sidebar
        render :edit
      end
    end

    def destroy
      if @<%= singular_model_name %>.destroy
        @nocms_logger.info(I18n.t('.no_cms.admin.<%= plugin_name %>.<%= plural_model_name %>.destroy.success', title: @<%= singular_model_name %>.path), true)
      else
        @nocms_logger.error(I18n.t('.no_cms.admin.<%= plugin_name %>.<%= plural_model_name %>.destroy.error', title: @<%= singular_model_name %>.path), true)
      end
      redirect_to <%= plural_model_name %>_path
    end

    private

    def load_menu_section
      @current_section = '<%= plugin_name%>'
    end

    def load_<%= singular_model_name %>
      @<%= singular_model_name %> = NoCms::<%= plugin_name.camelize %>::<%= singular_model_name.camelize %>.find(params[:id])
    end

    def load_sidebar
      @<%= plural_model_name %> = NoCms::<%= plugin_name.camelize %>::<%= singular_model_name.camelize %>.scoped
    end

    def <%= singular_model_name %>_params
      <%= singular_model_name %>_params = params.require(:<%= singular_model_name %>).permit(:title, :template, :slug, :body, :parent_id, :draft, :css_class, :css_id)
    end

  end
end

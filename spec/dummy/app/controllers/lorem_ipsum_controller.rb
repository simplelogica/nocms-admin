class LoremIpsumController < NoCms::Admin::ApplicationController

  def new
    @nocms_logger.info('info message now') if params[:later].nil?
    @nocms_logger.info('info message later', true) unless params[:later].nil?
    redirect_to lorem_ipsum_index_path unless params[:later].nil?
  end

end

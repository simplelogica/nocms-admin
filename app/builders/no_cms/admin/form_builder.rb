class NoCms::Admin::FormBuilder < ActionView::Helpers::FormBuilder

  [:text_field, :text_area, :select].each do |helper|
    define_method helper do |attribute, *args|
      html = super attribute, *args
      html += errors_field(attribute)
      html
    end
  end

  def errors_field(attribute)
    error_messages = object.errors.full_messages_for(attribute)
    return '' if error_messages.blank?
     @template.content_tag('ul',
      @template.raw(error_messages.map{|e|  @template.content_tag('li', e)}.join),
      class: 'error')
  end
end

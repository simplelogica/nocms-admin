class NoCms::Admin::FormBuilder < ActionView::Helpers::FormBuilder

  [:text_field, :text_area, :select, :file_field].each do |helper|
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

  def label_with_tooltip(method, text = nil, options = {}, &block)

    # We may receive options in text (because we don't get text)
    if text.is_a?(Hash) && options.empty?
      options = text
      text = nil
    end
    tooltip = options.delete :tooltip
    text = object.class.human_attribute_name(method) if text.nil?
    html = label method, text, options do
      @template.concat @template.info_tooltip(tooltip) unless tooltip.blank?
      if block_given?
        block.call
      else
        @template.concat(text)
      end
    end

    html

  end
end

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

  def fields_for_translations &block
    I18n.available_locales.each { |l| object.translation_for(l) }
    fields_for :translations do |f_translation|
      @template.concat f_translation.hidden_field :locale if f_translation.object.new_record?
      block.call(f_translation)
    end
  end

  def datetime_picker field, options = {}

    options.merge datetime: Time.now.strftime('%Y-%m-%d %H:%M:%S')

    attrs = Hash[options.map { |k, v| ["data-#{k}", v]  }]
    attrs[:class] = "input-group ui-datetimepicker date"

    @template.content_tag('div', attrs) do
      text_field(:published_at, class: "half") +
      @template.content_tag(:span, class: "input-group-addon") do
        @template.content_tag :i, '', class: "icon-th glyphicon glyphicon-calendar"
      end
    end
  end
end

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
      text_field(field, class: "half") +
      @template.content_tag(:span, class: "input-group-addon") do
        @template.content_tag :i, '', class: "icon-th glyphicon glyphicon-calendar"
      end
    end
  end

  def map_field options = {}


    address_options = (options[:address] || {}).reverse_merge(field: :address, class: '', fake: false)
    address_options[:class] += ' address half'
    address_field = address_options.delete(:field)
    fake_address_field = address_options.delete(:fake)

    search_options = (options[:search] || {}).reverse_merge(class: '')
    search_options[:class] += ' search btn'

    latitude_options = (options[:latitude] || {}).reverse_merge(field: :latitude, class: '')
    latitude_options[:class] += ' latitude'
    latitude_field = latitude_options.delete(:field)

    longitude_options = (options[:longitude] || {}).reverse_merge(field: :longitude, class: '')
    longitude_options[:class] += ' longitude'
    longitude_field = longitude_options.delete(:field)


    map_options = (options[:map] || {}).reverse_merge(class: '')
    map_options[:class] += ' address_map'

    @template.content_tag :div, class: "address_field" do
      (fake_address_field ?
        @template.text_field_tag(address_field, '', address_options).to_s :
        text_field(address_field, address_options)) +
      @template.button_tag(:search, search_options) +
      @template.content_tag(:div, "Map", map_options) +
      hidden_field(latitude_field, latitude_options ) +
      hidden_field(longitude_field, longitude_options)
    end
  end

end

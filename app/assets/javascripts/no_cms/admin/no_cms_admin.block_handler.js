// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

NoCMS.Admin.BlockHandler = function(blocks_placeholder_selector) {


    block_placeholder_selector = (typeof(block_placeholder_selector) == 'undefined') ? '.content > .content_blocks_placeholder' : block_placeholder_selector

  var default_layout_block = $(block_placeholder_selector + ' .block.new').first(),
    block_layout_select_selector = '.block_layout_selector',
    block_move_up_selector = '.ico-mini-move-up',
    block_move_down_selector = '.ico-mini-move-down',
    block_hide_selector = '.ico-mini-show-hide',
    block_delete_selector = '.ico-mini-delete',
    new_content_link_selector = '.new_content_block',
    block_templates = $(block_placeholder_selector + ' .new.block'),
    block_placeholder = $(block_placeholder_selector),
    that = this;

  block_placeholder.on('click', new_content_link_selector, function(e){
    e.preventDefault();
    that.createBlock($(this).closest('.content_blocks_placeholder'));
  });

  block_placeholder.on('change', block_layout_select_selector , function(e){
    that.updateBlock($(this).closest('.block'), $(this).val());
  });

  block_placeholder.on('click', block_move_down_selector , function(e){
    e.preventDefault();
    var block = $(this).closest('.block'),
      next_blocks = block.nextAll('.block');

    if(next_blocks.length > 0) {
      that.switchBlockPositions(block, next_blocks.first());
    }
  });

  block_placeholder.on('click', block_move_up_selector, function(e){
    e.preventDefault();
    var block = $(this).closest('.block'),
      previous_blocks = block.prevAll('.block');

    if(previous_blocks.length > 0) {
      that.switchBlockPositions(previous_blocks.first(), block);
    }
  });

  block_placeholder.on('click', block_hide_selector, function(e){
    e.preventDefault();
    that.toggleDraft($(this).closest('.block'));
  });

  block_placeholder.on('click', block_delete_selector, function(e){
    e.preventDefault();
    that.toggleDestroy($(this).closest('.block'));
  });

  this.updateBlock = function(block, new_layout){
    this.saveBlockState(block);

    new_template = block_templates.filter('#new_content_block_' + new_layout)
    block.find('.layout_fields').html(new_template.find('.layout_fields').html());

    var block_layout_field = block.find('.block_layout_selector'),
      name = block_layout_field.attr('name').match(/^(.*)\[[0-9]+\][^0-9]*/)[1],
      position = block_layout_field.attr('id').match(/_([0-9]+)_[^0-9]*$/)[1],
      old_block_layout_field = new_template.find('.block_layout_selector'),
      old_name = old_block_layout_field.attr('name').match(/^(.*\[[0-9]+\])[^0-9]*/)[1];

    this.modifyInputNames(block.find('.layout_fields'), old_name, name, position);

    this.restoreBlockState(block);

    this.activeCustomInputs(block);

    block.trigger('updated_block');

  }

  this.switchBlockPositions = function(block, next_block){
    next_block.after(block);

    next_block.find('> .position').val(next_block.prevAll('.block').length + 1);
    block.find('> .position').val(block.prevAll('.block').length + 1);

  }

  this.createBlock = function(placeholder){
    var position = placeholder.find('> .block').not('.new').length;
    new_block = default_layout_block.clone();
    new_block.removeAttr('id');
    var parent_block_layout_field = placeholder.closest('.block').find('.block_layout_selector');
    var parent_name = '';
    var old_name = new_block.find('.block_layout_selector').attr('name').match(/^(.*\[[0-9]+\])\[[^\[]+\]$/)[1]

    if(parent_block_layout_field.length > 0) {
      parent_name = parent_block_layout_field.attr('name').match(/^(.*)\[[^\[]+\]$/)[1]
      parent_name += '[children_attributes]'
    } else {
      parent_name = old_name.match(/^(.*)\[[0-9]+\]$/)[1];
    }

    this.modifyInputNames(new_block, old_name, parent_name, position);
    new_block.find('.position').val(position);

    placeholder.append(new_block);

    this.filterBlockLayouts(new_block);

    this.activeCustomInputs(new_block);

    new_block.removeClass('new');

    // Block templates may have the destroy field filled and we must unmark them as destroyable
    new_block.find('.destroy').val('0');

    new_block.trigger('created_block');

  }

  this.filterBlockLayouts = function(block) {
    var nest_level = block.parents('.block').length,
      layout_selector = block.find('>.row >.block_layout_selector')

    layout_selector.find('option[data-nest-levels]').each(function(){
      if ($(this).data('nest-levels').indexOf(nest_level) == -1) {
        $(this).remove();
      }
    });

    var layout_options = layout_selector.find('option');

    if(layout_options.length == 0) {
      block.remove();
    } else {
      if(layout_options.length == 1) {
        layout_selector.hide();
      }
      if(block.hasClass('new')) {
        layout_selector.change();
      }
    }
  }

  this.modifyInputNames = function(block, old_name, parent_name, position){

    var parent_id = parent_name.replace(/\]\[/g, '_').replace(/\[/g, '_').replace(/\]/g, '_'),
      old_id = old_name.replace(/\]\[/g, '_').replace(/\[/g, '_').replace(/\]/g, '_');

    block.find('[for]').each(function(){
      $(this).attr('for', $(this).attr('for').replace(old_id, parent_id + position +'_'))
    });
    block.find('[id]').each(function(){
      $(this).attr('id', $(this).attr('id').replace(old_id, parent_id + position+'_'))
    });
    block.find('[name]').each(function(){
      $(this).attr('name', $(this).attr('name').replace(old_name, parent_name + '['+position+']'));
    });

  }

  this.toggleDraft = function(block) {
    var draft_field = block.find('> .draft');
    block.toggleClass('oculto');
    draft_field.val(draft_field.val() == '1' ? '0' : '1');
  }

  this.toggleDestroy = function(block) {
    var draft_field = block.find('.destroy');
    block.toggleClass('to-be-deleted');
    draft_field.val(draft_field.val() == '1' ? '0' : '1');
  }

  this.saveBlockState = function(block) {
    var field_name_regexp = new RegExp(/\[([^\[]*)\]$/),
      block = $(block),
      state = block.attr('data-block-state');

    if(typeof(state) == 'undefined'){
      state = {};
    } else {
      state = JSON.parse(state);
    }

    $(block).find('> .layout_fields > .row').find('> textarea, > input[type="text"], > select').each(function(){
      field_name = field_name_regexp.exec(this.name)[1];
      state[field_name] = $(this).val();
    });

    block.attr('data-block-state', JSON.stringify(state));
  }

  this.restoreBlockState = function(block) {
    var field_name_regexp = new RegExp(/\[([^\[]*)\]$/),
      block = $(block),
      state = block.attr('data-block-state');

    if(typeof(state) == 'undefined'){
      state = {};
    } else {
      state = JSON.parse(state);
    }

    $(block).find('textarea, input[type="text"], select').not('.select2-offscreen, .select2-input').each(function(){
      field_name = field_name_regexp.exec(this.name)[1];
      if((typeof(state[field_name]) != 'undefined') && (state[field_name] != '')){
        $(this).val(state[field_name]);
      }
    });

  }

  this.activeCustomInputs = function(block) {
    block.find('select.select2').select2({
      width: '100%'
    });
    var ckeditor_text_areas = block.find('.ckeditor');
    if (ckeditor_text_areas.length > 0) {
      ckeditor_text_areas.each(function() {
        if(CKEDITOR.instances[$(this).attr('id')] === undefined) {
          CKEDITOR.replace($(this).attr('name'));
        }
      });
    }
  }

  block_templates.each(function() {
    $(this).detach();
  });

  $(block_placeholder_selector + ' .block').not('.new').each(function(){
    that.filterBlockLayouts($(this));
    that.saveBlockState(this);
    // If this block has no selected layout it's because it has an ilegal layout and it will cause troubles saving because a different layout will be send with the fields of the 'ilegal' layout
    // We need to update the block, so the new layout is loaded
    if($(this).find('>.row > .block_layout_selector > option[selected]').length == 0) {
      that.updateBlock($(this), $(this).find('>.row > .block_layout_selector').val());
    }

  })

}

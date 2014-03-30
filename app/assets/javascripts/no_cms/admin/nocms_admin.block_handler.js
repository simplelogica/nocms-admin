// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

NoCMS.Admin.BlockHandler = function() {


  var default_layout_block = $('.block.new').first(),
    block_placeholder_selector = '.content_blocks_placeholder',
    block_layout_select_selector = block_placeholder_selector + ' .block_layout_selector',
    block_move_up_selector = block_placeholder_selector + ' .ico-mini-move-up',
    block_move_down_selector = block_placeholder_selector + ' .ico-mini-move-down',
    block_hide_selector = block_placeholder_selector + ' .ico-mini-show-hide',
    block_delete_selector = block_placeholder_selector + ' .ico-mini-delete',
    new_content_link_selector = '.new_content_block',
    block_templates = $('.new.block'),
    body = $('body'),
    that = this;

  body.on('click', new_content_link_selector, function(e){
    e.preventDefault();
    that.createBlock($(this).closest('.content_blocks_placeholder'));
  });

  body.on('change', block_layout_select_selector , function(e){
    that.updateBlock($(this).closest('.block'), $(this).val());
  });

  body.on('click', block_move_down_selector , function(e){
    e.preventDefault();
    var block = $(this).closest('.block'),
      next_blocks = block.nextAll('.block');

    if(next_blocks.length > 0) {
      that.switchBlockPositions(block, next_blocks.first());
    }
  });

  body.on('click', block_move_up_selector, function(e){
    e.preventDefault();
    var block = $(this).closest('.block'),
      previous_blocks = block.prevAll('.block');

    if(previous_blocks.length > 0) {
      that.switchBlockPositions(previous_blocks.first(), block);
    }
  });

  body.on('click', block_hide_selector, function(e){
    e.preventDefault();
    that.toggleDraft($(this).closest('.block'));
  });

  body.on('click', block_delete_selector, function(e){
    e.preventDefault();
    that.toggleDestroy($(this).closest('.block'));
  });

  this.updateBlock = function(block, new_layout){
    this.saveBlockState(block);

    new_template = block_templates.filter('#new_content_block_' + new_layout)
    block.find('.layout_fields').html(new_template.find('.layout_fields').html());

    var block_layout_field = block.find('.block_layout_selector'),
      name = block_layout_field.attr('name').match(/^(.*)\[[0-9]+\][^0-9]*/)[1],
      position = block_layout_field.attr('id').match(/_([0-9]+)_[^0-9]*$/)[1]

    this.modifyInputNames(block, name, position);

    this.restoreBlockState(block);
  }

  this.switchBlockPositions = function(block, next_block){
    var next_block_position = next_block.find('.position').val();

    next_block.find('.position').val(block.find('.position').val());
    block.find('.position').val(next_block_position);

    next_block.after(block);
  }

  this.createBlock = function(placeholder){
    var position = placeholder.find('> .block').not('.new').length;
    new_block = default_layout_block.clone();
    new_block.removeClass('new');
    new_block.removeAttr('id');
    var parent_block_layout_field = placeholder.closest('.block').find('.block_layout_selector');
    var parent_name = '';

    if(parent_block_layout_field.length > 0) {
      parent_name = parent_block_layout_field.attr('name').match(/^(.*)\[layout\]/)[1]
      parent_name += '[children_attributes]'
    } else {
      parent_name = new_block.find('.block_layout_selector').attr('name').match(/^(.*)\[[0-9]+\]\[layout\]/)[1]
    }

    this.modifyInputNames(new_block, parent_name, position);
    new_block.find('.position').val(position);

    placeholder.append(new_block);

    this.filterBlockLayouts(new_block);
  }

  this.filterBlockLayouts = function(block) {
    var nest_level = block.parents('.block').length;

    block.find('.block_layout_selector option[data-nest-levels]').each(function(){
      if ($(this).data('nest-levels').indexOf(nest_level) == -1) {
        $(this).detach();
      }
    });
  }

  this.modifyInputNames = function(block, parent_name, position){

    var parent_id = parent_name.replace(/\[/g, '_').replace(/\]/g, '_');

    block.find('[for]').each(function(){
      $(this).attr('for', $(this).attr('for').replace(/^.*_[0-9]+_/, parent_id + position +'_'))
    });
    block.find('[id]').each(function(){
      $(this).attr('id', $(this).attr('id').replace(/^.*_[0-9]+_/, parent_id + position+'_'))
    });
    block.find('[name]').each(function(){
      $(this).attr('name', $(this).attr('name').replace(/^.*\[[0-9]+\]/, parent_name + '['+position+']'));
    });

  }

  this.toggleDraft = function(block) {
    var draft_field = block.find('.draft');
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

    $(block).find('textarea, input[type="text"], select').each(function(){
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

    $(block).find('textarea, input[type="text"], select').each(function(){
      field_name = field_name_regexp.exec(this.name)[1];
      if((typeof(state[field_name]) != 'undefined') && (state[field_name] != '')){
        $(this).val(state[field_name]);
      }
    });

  }

  block_templates.each(function() {
    $(this).detach();
  });

  $('.block').each(function(){
    that.filterBlockLayouts($(this));
    that.saveBlockState(this);
  })

}

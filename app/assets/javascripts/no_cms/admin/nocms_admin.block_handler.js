// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

NoCMS.Admin.BlockHandler = function() {


  var default_layout_block = $('.block.new').first(),
    block_placeholder = $('#content_blocks_placeholder'),
    new_content_link = $('#new_content_block'),
    block_templates = $('.new.block'),
    that = this;

  new_content_link.on('click', function(e){
    e.preventDefault();
    that.createBlock();
  });

  block_placeholder.on('change', '.block_layout_selector', function(e){
    that.updateBlock($(this).parents('.block'), $(this).val());
  });

  block_placeholder.on('click', '.ico-mini-move-down', function(e){
    e.preventDefault();
    var block = $(this).parents('.block'),
      next_blocks = block.nextAll('.block');

    if(next_blocks.length > 0) {
      that.switchBlockPositions(block, next_blocks.first());
    }
  });

  block_placeholder.on('click', '.ico-mini-move-up', function(e){
    e.preventDefault();
    var block = $(this).parents('.block'),
      previous_blocks = block.prevAll('.block');

    if(previous_blocks.length > 0) {
      that.switchBlockPositions(previous_blocks.first(), block);
    }
  });

  block_placeholder.on('click', '.ico-mini-show-hide', function(e){
    e.preventDefault();
    that.toggleDraft($(this).parents('.block'));
  });

  block_placeholder.on('click', '.ico-mini-delete', function(e){
    e.preventDefault();
    that.toggleDestroy($(this).parents('.block'));
  });

  this.updateBlock = function(block, new_layout){
    this.saveBlockState(block);
    new_template = block_templates.filter('#new_content_block_' + new_layout)
    block.find('.layout_fields').html(new_template.find('.layout_fields').html());
    this.modifyInputNames(block, block.find('.block_layout_selector').attr('id').match(/_([0-9]*)_/)[1]);
  }

  this.switchBlockPositions = function(block, next_block){
    var next_block_position = next_block.find('.position').val();

    next_block.find('.position').val(block.find('.position').val());
    block.find('.position').val(next_block_position);

    next_block.after(block);
  }

  this.createBlock = function(){
    var position = $('.block').not('.new').length;
    new_block = default_layout_block.clone();
    new_block.removeClass('new');
    new_block.removeAttr('id');
    this.modifyInputNames(new_block, position);
    new_block.find('.position').val(position);

    block_placeholder.append(new_block);
  }

  this.modifyInputNames = function(block, position){

    block.find('[for]').each(function(){
      $(this).attr('for', $(this).attr('for').replace(/_[0-9]*_/, '_'+position+'_'))
    });
    block.find('[id]').each(function(){
      $(this).attr('id', $(this).attr('id').replace(/_[0-9]*_/, '_'+position+'_'))
    });
    block.find('[name]').each(function(){
      $(this).attr('name', $(this).attr('name').replace(/\[[0-9]*\]/, '['+position+']'))
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
    }

    $(block).find('textarea').each(function(){
      field_name = field_name_regexp.exec(this.name)[1];
      state[field_name] = $(this).val();
    });

    block.attr('data-block-state', state);
  }

  block_templates.each(function() {
    $(this).detach();
  });

  $('.block').each(function(){
    that.saveBlockState(this);
  })

}

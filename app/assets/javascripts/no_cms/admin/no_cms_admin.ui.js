
// If not exists create empty object
var NoCMS = NoCMS || {};

// If not exists create empty object
NoCMS.Admin = NoCMS.Admin || {};

//
// All the UI functionallity
//
NoCMS.Admin.UI = {

  // Here will cache the DOM elements
  'DOM': { },

  // Initilizing elements
  init: function () {

    // Cahed DOM elements that we use in this object
    this.DOM.$body = $('body');
    this.DOM.$log_bar = $('#log-bar');
    this.DOM.$aside_col_1 = $('aside#col-1');
    this.DOM.$aside_col_2 = $('aside#col-2');

    // Search panel
    this.DOM.$search_panel = $('.search-bar');
    this.DOM.$search_panel_btn = $('#js-search');

    // Filter panel
    this.DOM.$filter_panel = $('.filter-bar');
    this.DOM.$filter_panel_btn = $('#js-filter');

    // View buttons
    this.DOM.$change_view_btn = $('[data-view]');
    this.DOM.$change_view_btn.on('click', function(e) {
      e.preventDefault();
      var
        view = $(this).data('view');
      NoCMS.Admin.UI.change_to_view(view);
    });

    // Init modules / functionallities
    this.collapsable();
    this.log_bar_init();
    this.mark_parents_in_listings();
    this.search_panel();
    this.filter_panel();
    this.show_datetimepickers();
    this.retrieve_view_settings_from_LS();

  },

  //
  // Change to view
  //
  change_to_view: function(view) {
    switch (view) {
      case 'expand-col-2':
        this.DOM.$body.removeClass('col-1-only');
        this.DOM.$body.toggleClass('col-2-only');
      break;
      case 'full-screen':
        this.DOM.$body.removeClass('col-1-only').toggleClass('go-full-screen');
      break;
      default: // Default view
        this.DOM.$body.removeClass('col-1-only, col-2-only, go-full-screen');
      break;
    }
  },

  //
  // Collapsable blocks
  //
  collapsable: function () {

    // Collapse block
    this.DOM.$body.on('click','.js-collapse-block', function(e) {
      e.preventDefault();
      var row = $(this).closest('.block.row');
      row.toggleClass('collapsed');
      row.trigger(row.hasClass('collapsed') ? 'no_cms:blocks:collapse' : 'no_cms:blocks:expand')
      NoCMS.Admin.UI.store_view_settings_in_LS();
    });

    // Collapse blocks w children
    this.DOM.$body.on('click', '.js-collapse-all-children-blocks',function(e) {
      e.preventDefault();
      $(this).closest('.has-children').find('.block.row').addClass('collapsed');
      NoCMS.Admin.UI.store_view_settings_in_LS();
    });

  },

  //
  // Search pannel functionallity
  //
  search_panel: function () {
    // Show / hide
    this.DOM.$search_panel_btn.on('click', function(e) {
      e.preventDefault();
      $(this).toggleClass('active');
      NoCMS.Admin.UI.DOM.$search_panel.toggle();
    });
  },

  //
  // Filter panel
  //
  filter_panel: function () {
    // Show / hide
    this.DOM.$filter_panel_btn.on('click', function(e) {
      e.preventDefault();
      $(this).toggleClass('active');
      NoCMS.Admin.UI.DOM.$filter_panel.toggle();
    });
  },

  //
  // Mark parents in page / secitons listing
  //
  mark_parents_in_listings: function () {
    // Join two JQuery selector with 'add'
    // Mark list element when clicked
    var
      $all_listing_el = this.DOM.$aside_col_1.add(this.DOM.$aside_col_2);

    $all_listing_el.on('click', 'a', function(e) {
      // e.preventDefault();
      $(this).closest('.content').find('li').removeClass('current');
      $(this).parent().addClass('current');
    });

    // Add parent class
    $all_listing_el.find('li > ul').each(function(){
      $(this).parent().addClass('parent');
    });
  },

  //
  // Store current view settings in Local Storage
  //
  store_view_settings_in_LS: function() {
    // Store current collapsed IDs
    NoCMS.Admin.UI.page_settings.collapsed = [];
    $('#content-area').find('.collapsed').each( function() {
      NoCMS.Admin.UI.page_settings.collapsed.push(this.id);
    });
    localStorage.setItem(document.URL,JSON.stringify(NoCMS.Admin.UI.page_settings));
  },

  //
  // Retrieve current view settings in Local Storage
  //
  retrieve_view_settings_from_LS: function() {
    var
      settings = localStorage.getItem(document.URL);
    if ( settings == null ) {
      // Collapse all
      $('.block.row').addClass('collapsed');
      this.store_view_settings_in_LS();
    } else {
      // Map array of IDs to JQuery selector
      NoCMS.Admin.UI.page_settings = jQuery.parseJSON(settings);
      var
        nodes = $.map(NoCMS.Admin.UI.page_settings.collapsed, function(i) {
          return document.getElementById(i);
        });
      $(nodes).addClass('collapsed');
      $(nodes).find('.block').addClass('collapsed');
      $('.block.row').not('.collapsed').trigger('no_cms:blocks:expand')
    }
  },

  //
  // Log-bar functionallity
  //
  log_bar_init: function () {

    this.DOM.$log_bar.on('click', function(e) {
      e.preventDefault();
      $this = $(this);
      $this.toggleClass('expanded');

      if ($this.hasClass('expanded')) {
        var
          clear_log_button = $('<span id="js-clear-log" title="clear log">Clear</span>');

        clear_log_button.on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          $(this).parent().removeClass('expanded').html('');
          $(this).remove();
        }).appendTo(NoCMS.Admin.UI.DOM.$log_bar);

      } else {
        $('#js-clear-log').remove();
      }
    });
  },

  show_datetimepickers: function() {
    $('.ui-datetimepicker').datetimepicker({format: 'yyyy-mm-dd hh:ii'});
  }
};

//
// Local storage settings
//
NoCMS.Admin.UI.page_settings = {
  collapsed: []
};

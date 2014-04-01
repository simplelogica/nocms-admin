/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
  // Define changes to default configuration here.
  // For the complete reference:
  // http://docs.ckeditor.com/#!/api/CKEDITOR.config

  config.height = 384;

  config.allowedContent = true;

  // Load from a list of definitions.
  config.stylesSet = [
      { name: 'headline-XL', element: 'p', attributes: { 'class': 'headline-XL' } },
      { name: 'headline-L', element: 'p', attributes: { 'class': 'headline-L' } },

  ];

  // The toolbar groups arrangement, optimized for a single toolbar row.
  config.toolbarGroups = [
    { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
    { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
    { name: 'forms' },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
    { name: 'links' },
    { name: 'insert' },
    { name: 'styles' },
    { name: 'colors' },
    { name: 'tools' },
    { name: 'others' },
    { name: 'about' }
  ];

  // The default plugins included in the basic setup define some buttons that
  // we don't want too have in a basic editor. We remove them here.
  config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';

  // Let's have it basic on dialogs as well.
  config.removeDialogTabs = 'link:advanced';

  config.extraPlugins = 'codemirror';

  config.codemirror = {

      // Set this to the theme you wish to use (codemirror themes)
      theme: 'default',

      // Whether or not you want to show line numbers
      lineNumbers: true,

      // Whether or not you want to use line wrapping
      lineWrapping: true,

      // Whether or not you want to highlight matching braces
      matchBrackets: true,

      // Whether or not you want tags to automatically close themselves
      autoCloseTags: true,

      // Whether or not you want Brackets to automatically close themselves
      autoCloseBrackets: true,

      // Whether or not to enable search tools, CTRL+F (Find), CTRL+SHIFT+F (Replace), CTRL+SHIFT+R (Replace All), CTRL+G (Find Next), CTRL+SHIFT+G (Find Previous)
      enableSearchTools: false,

      // Whether or not you wish to enable code folding (requires 'lineNumbers' to be set to 'true')
      enableCodeFolding: true,

      // Whether or not to enable code formatting
      enableCodeFormatting: true,

      // Whether or not to automatically format code should be done when the editor is loaded
      autoFormatOnStart: true,

      // Whether or not to automatically format code should be done every time the source view is opened
      autoFormatOnModeChange: true,

      // Whether or not to automatically format code which has just been uncommented
      autoFormatOnUncomment: true,

      // Whether or not to highlight the currently active line
      highlightActiveLine: true,

      // Define the language specific mode 'htmlmixed' for html including (css, xml, javascript), 'application/x-httpd-php' for php mode including html, or 'text/javascript' for using java script only
      mode: 'htmlmixed',

      // Whether or not to show the search Code button on the toolbar
      showSearchButton: true,

      // Whether or not to show Trailing Spaces
      showTrailingSpace: true,

      // Whether or not to highlight all matches of current word/selection
      highlightMatches: true,

      // Whether or not to show the format button on the toolbar
      showFormatButton: true,

      // Whether or not to show the comment button on the toolbar
      showCommentButton: true,

      // Whether or not to show the uncomment button on the toolbar
      showUncommentButton: true,

      // Whether or not to show the showAutoCompleteButton button on the toolbar
      showAutoCompleteButton: true

    };
};

NoCMS.Admin.Logger = function() {
  var log_messages_container = $('#log-bar'),
    store_log_messages_key = 'no_cms_admin_logger_messages',
    log_messages = store.get(store_log_messages_key),
    that = this;

  if(typeof(log_messages) == 'undefined'){
    log_messages = [];
  }

  return {
    addMessage: function(type, message) {
      log_messages.unshift({'type': type, 'message': message, 'time': new Date()})
      store.set(store_log_messages_key, log_messages);
      this.displayMessage(0);
    },
    displayAllMessages: function() {
      log_messages_container.html('');
      for(var i = log_messages.length-1; i >= 0; i--) {
        this.displayMessage(i)
      }
    },
    displayMessage: function(message_index) {
      var message = log_messages[message_index];
      log_messages_container.prepend('<p class="row msg '+message.type+'"><time>'+message.time+'</time>'+message.message+'</p>')
    }
  };

}

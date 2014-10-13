NoCMS.Admin.Logger = function() {
  this.log_messages_container = $('#log-bar');
  this.store_log_messages_key = 'no_cms_admin_logger_messages';
  this.log_messages = store.get(this.store_log_messages_key);

  that = this;

  if(typeof(this.log_messages) == 'undefined'){
    this.log_messages = [];
  }

  this.displayAllMessages();
}




NoCMS.Admin.Logger.prototype.addMessage = function(type, message) {
  this.log_messages.unshift({'type': type, 'message': message, 'time': new Date()})
  store.set(this.store_log_messages_key, this.log_messages);
  this.displayMessage(0);
}

NoCMS.Admin.Logger.prototype.displayAllMessages = function() {
  for(var i = this.log_messages.length-1; i >= 0; i--) {
    this.displayMessage(i);
  }
}

NoCMS.Admin.Logger.prototype.displayMessage = function(message_index) {
  var message = this.log_messages[message_index];
  this.log_messages_container.prepend('<p class="msg '+message.type+'"><time>'+message.time+'</time>'+message.message+'</p>');
}

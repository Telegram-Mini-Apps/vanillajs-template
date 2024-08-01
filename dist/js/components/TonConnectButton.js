/**
 * @param {{ id: string, class?: string }} options
 */
function TonConnectButton(options) {
  var id = options.id;
  var className = options.class;
  
  this.el = $('<div/>')
    .addClass(className || '')
    .append($('<div style="width: fit-content;"/>').attr('id', id));
}

/**
 * @returns {HTMLDivElement}
 */
TonConnectButton.prototype.element = function() {
  return this.el[0];
};
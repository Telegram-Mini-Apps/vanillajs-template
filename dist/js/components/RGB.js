/**
 * @param {{ color: string; class?: string }} options
 */
function RGB(options) {
  var color = options.color;
  var className = options.class;
  
  this.el = $('<span/>')
    .attr('class', 'rgb')
    .addClass(className || '')
    .append(
      $('<i class="rgb__icon"/>').css('background-color', color),
      color
    );
}

/**
 * @returns {HTMLSpanElement}
 */
RGB.prototype.element = function() {
  return this.el[0];
};
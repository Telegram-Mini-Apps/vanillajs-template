function Link(options, context) {
  var href = options.href;
  var className = options.class;
  
  var targetUrl = new URL(href, window.location.toString());
  var currentUrl = new URL(window.location.toString());
  var isExternal = targetUrl.protocol !== currentUrl.protocol || targetUrl.host !== currentUrl.host;

  this.el = $('<a/>')
    .attr('class', 'link')
    .addClass(className || '')
    .attr('href', isExternal ? href : context.navigator.renderPath(href));

  if (isExternal) {
    this.el.on('click', function(e) {
      e.preventDefault();
      context.utils.openLink(targetUrl.toString());
    });
  }
}

Link.prototype.appendChild = function() {
  var children = Array.prototype.slice.call(arguments);
  this.el.append.apply(this.el, filterChildren(children));
  return this;
};

/**
 * @returns {HTMLAnchorElement}
 */
Link.prototype.element = function() {
  return this.el[0];
};
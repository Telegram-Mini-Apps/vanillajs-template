function Page(options) {
  var title = options.title;
  this.el = $('<div class="page"/>').append($('<h1/>').text(title));
}

Page.prototype.appendChild = function() {
  var children = Array.prototype.slice.call(arguments);
  this.el.append.apply(this.el, filterChildren(children));
  return this;
};

/**
 * @returns {HTMLDivElement}
 */
Page.prototype.element = function() {
  return this.el[0];
};

Page.prototype.setDisclaimer = function(disclaimer) {
  if (this.disclaimer) {
    this.disclaimer.empty().append.apply(this.disclaimer, toArray(disclaimer));
  } else {
    var disclaimerEl = $('<div class="page__disclaimer"/>'); 
    this.disclaimer = disclaimerEl
      .append.apply(disclaimerEl, toArray(disclaimer))
      .insertAfter(this.el.children('h1'));
  }
  return this;
};
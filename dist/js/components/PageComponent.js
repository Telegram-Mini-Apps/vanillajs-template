function PageComponent(page) {
  this.page = page;
}

/**
 * @param {HTMLElement} root
 * @returns {void}
 */
PageComponent.prototype.render = function(root) {
  $(root).empty().append(this.page.element());
};
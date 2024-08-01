function WalletProvider(options) {
  var context = options.context;
  var className = options.class;

  this.context = context;
  this.img = $('<img class="wallet-provider__image" height="60" width="60">')
    .attr('alt', 'Provider logo');
  this.el = $('<div/>')
    .attr('class', 'wallet-provider')
    .addClass(className || '')
    .attr('style', 'display: none;');
}

WalletProvider.prototype.setWallet = function(wallet) {
  if (!wallet) {
    this.el.attr('style', 'display: none;');
    this.el.empty();
    return;
  } else {
    this.el.attr('style', '');
    this.el.append([
      this.img.attr('src', wallet.imageUrl),
      $('<div class="wallet-provider__meta"/>').append([
        $('<p class="wallet-provider__wallet-name"/>')
          .append(wallet.name + '&nbsp;')
          .append($('<span class="wallet-provider__app-name"/>').append('(' + wallet.appName + ')')),
        new Link({ href: wallet.aboutUrl }, this.context)
          .appendChild('About connected wallet')
          .element()
      ])
    ]);
  }
};

/**
 * @returns {HTMLDivElement}
 */
WalletProvider.prototype.element = function() {
  return this.el[0];
};
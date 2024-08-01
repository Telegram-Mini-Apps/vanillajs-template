function ThemeParamsPage(context) {
  PageComponent.call(this, new Page({ title: 'Theme Params' }));
  this.context = context;
  this.dd = new DisplayData({ rows: this.computeRows() });
  this.page
    .setDisclaimer([
      'This page displays current ',
      new Link({ href: 'https://docs.telegram-mini-apps.com/platform/theming' }, this.context)
        .appendChild('theme parameters')
        .element(),
      '. It is reactive, so, changing theme externally will lead to this page updates.',
    ])
    .appendChild(this.dd.element());

  // Bind the onThemeChange method to the current context
  this.onThemeChange = this.onThemeChange.bind(this);
}

ThemeParamsPage.prototype = Object.create(PageComponent.prototype);
ThemeParamsPage.prototype.constructor = ThemeParamsPage;

ThemeParamsPage.prototype.computeRows = function() {
  var themeParams = this.context.themeParams.getState();
  return Object.keys(themeParams).map(function(title) {
    var value = themeParams[title];
    return {
      title: title
        .replace(/[A-Z]/g, function(m) { return `_${m.toLowerCase()}`; })
        .replace(/background/, 'bg'),
      value: value,
    };
  });
};

ThemeParamsPage.prototype.onThemeChange = function() {
  this.dd.setRows(this.computeRows());
};

ThemeParamsPage.prototype.init = function() {
  this.context.themeParams.on('change', this.onThemeChange);
};

ThemeParamsPage.prototype.destroy = function() {
  this.context.themeParams.off('change', this.onThemeChange);
};
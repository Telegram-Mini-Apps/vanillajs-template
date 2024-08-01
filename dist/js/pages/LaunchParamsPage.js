function LaunchParamsPage(context) {
  PageComponent.call(this, new Page({ title: 'Launch Params' }));
  
  var lp = context.launchParams;
  
  this.page
    .setDisclaimer([
      'This page displays application ',
      new Link({
        href: 'https://docs.telegram-mini-apps.com/platform/launch-parameters',
      }, context)
        .appendChild('launch parameters')
        .element(),
      '.',
    ])
    .appendChild(
      new DisplayData({
        rows: [
          { title: 'tgWebAppPlatform', value: lp.platform },
          { title: 'tgWebAppShowSettings', value: lp.showSettings },
          { title: 'tgWebAppVersion', value: lp.version },
          { title: 'tgWebAppBotInline', value: lp.botInline },
          { title: 'tgWebAppStartParam', value: lp.startParam },
          {
            title: 'tgWebAppData',
            value: new Link({ href: '/init-data' }, context)
              .appendChild('View')
              .element(),
          },
          {
            title: 'tgWebAppThemeParams',
            value: new Link({ href: '/theme-params' }, context)
              .appendChild('View')
              .element(),
          }
        ],
      }).element()
    );
}

LaunchParamsPage.prototype = Object.create(PageComponent.prototype);
LaunchParamsPage.prototype.constructor = LaunchParamsPage;
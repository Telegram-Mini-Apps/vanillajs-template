function initComponents() {
  return new Promise(function(resolve, reject) {
    var miniApp = window.telegramApps.sdk.initMiniApp()[0];
    var themeParams = window.telegramApps.sdk.initThemeParams()[0];
    var utils = window.telegramApps.sdk.initUtils();
    var initData = window.telegramApps.sdk.initInitData();
    var viewportPromise = window.telegramApps.sdk.initViewport()[0];

    viewportPromise.then(function(viewport) {
      // Generate Mini Apps related CSS-variables and track their changes.
      window.telegramApps.sdk.bindMiniAppCSSVars(miniApp, themeParams);
      window.telegramApps.sdk.bindThemeParamsCSSVars(themeParams);
      window.telegramApps.sdk.bindViewportCSSVars(viewport);

      resolve({
        initData: initData,
        miniApp: miniApp,
        themeParams: themeParams,
        utils: utils,
        viewport: viewport,
      });
    }).catch(reject);
  });
}
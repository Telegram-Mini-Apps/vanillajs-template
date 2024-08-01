(function() {
  // Uncomment next line for local development outside Telegram Mini App
  mockEnv();

  var launchParams = window.telegramApps.sdk.retrieveLaunchParams();

  // Launch eruda and enable SDK debug mode, if debug mode was requested outside.
  var debug = launchParams.startParam === 'debug';
  if (debug) {
    window.telegramApps.sdk.setDebug(debug);
  }

  // The web version of Telegram is capable of sending some specific CSS styles we would
  // like to catch.
  if (window.telegramApps.sdk.isIframe()) {
    window.telegramApps.sdk.initWeb(true);
  }

  initComponents().then(function(components) {
    var miniApp = components.miniApp;
    var viewport = components.viewport;
    var utils = components.utils;
    var themeParams = components.themeParams;
    var initData = components.initData;

    initNavigator().then(function(navigator) {
      var tonConnectUI = initTonConnectUI();

      var routes = [
        { pathname: '/', Page: HomePage },
        { pathname: '/init-data', Page: InitDataPage, title: 'Init Data' },
        { pathname: '/theme-params', Page: ThemeParamsPage, title: 'Theme Params' },
        { pathname: '/launch-params', Page: LaunchParamsPage, title: 'Launch Params' },
        {
          pathname: '/ton-connect',
          Page: TonConnectPage,
          title: 'TON Connect',
          icon: window.location.origin + window.location.pathname + 'ton.svg'
        },
      ];

      var root = document.getElementById('root');
      var appContext = {
        initData: initData,
        launchParams: launchParams,
        miniApp: miniApp,
        navigator: navigator,
        themeParams: themeParams,
        utils: utils,
        viewport: viewport,
        tonConnectUI: tonConnectUI,
        routes: routes
      };
      var prevPage;

      function renderCurrentRoute() {
        var route = routes.find(function(r) {
          return r.pathname === navigator.pathname;
        });
        if (!route) {
          navigator.replace('/');
          return;
        }
        if (prevPage && typeof prevPage.destroy === 'function') {
          prevPage.destroy();
        }
        prevPage = new route.Page(appContext);
        if (typeof prevPage.init === 'function') {
          prevPage.init();
        }
        prevPage.render(root);
      }

      navigator.on('change', renderCurrentRoute);
      renderCurrentRoute();
    });
  });
})();
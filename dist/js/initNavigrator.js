function initNavigator() {
  return new Promise(function(resolve) {
    var navigator = window.telegramApps.sdk.initNavigator('app-navigator-state');

    // Attach the navigator to the browser history, so it could modify the history and listen to
    // its changes.
    navigator.attach().then(function() {
      resolve(navigator);
    });
  });
}
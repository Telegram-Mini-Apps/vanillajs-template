function initTonConnectUI() {
  const tonConnectUI = new window.TON_CONNECT_UI.TonConnectUI({
    manifestUrl: new URL('/vanillajs-template/tonconnect-manifest.json', window.location.href).toString(),
  });

  return tonConnectUI;
}
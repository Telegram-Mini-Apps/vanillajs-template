var DISCLAIMER_TEXT = 'To display the data related to the TON Connect, it is required to connect your wallet.';

function TonConnectPage(context) {
  PageComponent.call(this, new Page({ title: 'TON Connect' }));
  
  this.context = context;
  this.connectedWallet = null;
  this.tonConnectButtonId = 'ton-connect-button';
  this.dd = new DisplayData({ rows: this.computeRows() });
  this.walletProvider = new WalletProvider({ context: context, "class": 'ton-connect-page__provider' });
  this.tonConnectButton = new TonConnectButton({ id: this.tonConnectButtonId, "class": 'ton-connect-page__button-container' });

  this.page
    .setDisclaimer([DISCLAIMER_TEXT])
    .appendChild(this.walletProvider.element())
    .appendChild(this.dd.element())
    .appendChild(this.tonConnectButton.element());

  // Bind the onWalletChange method to the current context
  this.onWalletChange = this.onWalletChange.bind(this);
}

TonConnectPage.prototype = Object.create(PageComponent.prototype);
TonConnectPage.prototype.constructor = TonConnectPage;

TonConnectPage.prototype.init = function() {
  var self = this;
  // Have to wait until TON Connect button root is mounted in DOM
  setTimeout(function() {
    self.context.tonConnectUI.uiOptions = {
      buttonRootId: self.tonConnectButtonId,
    };
    self.unsubscribe = self.context.tonConnectUI.onStatusChange(self.onWalletChange);
    if (self.context.tonConnectUI.wallet) {
      self.onWalletChange(self.context.tonConnectUI.wallet);
    }
  }, 0);
};

TonConnectPage.prototype.destroy = function() {
  if (this.unsubscribe) {
    this.unsubscribe();
  }
  this.context.tonConnectUI.uiOptions = {
    buttonRootId: null,
  };
};

TonConnectPage.prototype.computeRows = function() {
  if (this.connectedWallet === null) {
    return [];
  }

  return [
    { title: 'Address', value: this.connectedWallet.account.address },
    { title: 'Chain', value: this.connectedWallet.account.chain },
    { title: 'Public Key', value: this.connectedWallet.account.publicKey },
  ];
};

TonConnectPage.prototype.onWalletChange = function(walletInfo) {
  this.connectedWallet = walletInfo;
  this.dd.setRows(this.computeRows());

  if (!walletInfo) {
    this.page.setDisclaimer([DISCLAIMER_TEXT]);
    this.walletProvider.setWallet(walletInfo);
    return;
  }

  this.page.setDisclaimer([]);

  if ('imageUrl' in walletInfo) {
    this.walletProvider.setWallet(walletInfo);
  }
};
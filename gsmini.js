function chainType (n) {return typeof n === Tag.Int ? n : void 0}

function toastMessage (n) {window.control.toastMessage(n)}

function showAlert (n, a, e) {
  if (n === CustomizedCommand.ConfirmEvent) return confirmEventCallback(), void(confirmEventCallback = null)
  typeof a !== Tag.String || typeof e !== Tag.String || typeof n !== Tag.Function ? alert('Wrong Parameters of Requesting') : (confirmEventCallback = n, window.control.alert(a, e))
}

function getChainID (n, a) {void 0 !== a && void 0 === chainType(a) ? n('wrong chain type') : typeof n === Tag.Function ? (getChainIDCallback = n, window.control.getChainID(a)) : typeof n === Tag.String ? (getChainIDCallback(n), getChainIDCallback = null) : (getChainIDCallback('wrong request'), getChainIDCallback = null)}

function getAccountAddress (n, a, e, t) {void 0 !== a && void 0 !== e && typeof t === Tag.Boolean || typeof n === Tag.String ? typeof n === Tag.Function ? (getAccountAddressCallback = n, window.control.getAccountAddress(a, e, t)) : typeof n === Tag.String ? (getAccountAddressCallback(n), getAccountAddressCallback = null) : (getAccountAddressCallback('wrong request'), getAccountAddressCallback = null) : n('wrong parameters of requesting')}

function getBalance (n, a, e) {void 0 !== a && void 0 !== e || typeof n === Tag.String ? typeof n === Tag.Function ? (getBalanceCallback = n, window.control.getBalance(a, e)) : typeof n === Tag.String ? (getBalanceCallback(decodeURIComponent(n)), getBalanceCallback = null) : (getBalanceCallback('wrong request'), getBalanceCallback = null) : n('wrong parameters of requesting')}

function encrypt (n, a) {typeof n === Tag.Function ? typeof a === Tag.String ? (encryptCallback = n, window.control.encrypt(a)) : n('wrong request message') : typeof n === Tag.String ? (encryptCallback(decodeURIComponent(n)), encryptCallback = null) : (encryptCallback('wrong request'), encryptCallback = null)}

function decrypt (n, a) {typeof n === Tag.Function ? typeof a === Tag.String ? (decryptCallback = n, window.control.decrypt(a)) : n('wrong request message') : typeof n === Tag.String ? (decryptCallback(n), decryptCallback = null) : (decryptCallback('wrong request'), decryptCallback = null)}

function getSignHeader (n) {typeof n === Tag.Function && (signHeaderCallback = n, window.control.getSignHeader()), typeof n === Tag.String && (signHeaderCallback(n), signHeaderCallback = null)}

function getEOSSignedData (n, a) {
  if (typeof n === Tag.Function && (typeof a === Tag.String ? (signedDataCallback = n, window.control.getEOSSingedData(a)) : n('wrong request message')), typeof n === Tag.String) {
    var e = decodeURIComponent(n)
    signedDataCallback(e), signedDataCallback = null
  }
}

var Tag = { Function: 'function', String: 'string', Int: 'number', Boolean: 'boolean' },
  ChainType = { EOS: chainType(194), BTC: chainType(0), LTC: chainType(2) },
  CustomizedCommand = { FinishedBackEvent: 'finished', ConfirmEvent: 'clickedConfirmButton' }, confirmEventCallback,
  getChainIDCallback, getAccountAddressCallback, getBalanceCallback, encryptCallback, decryptCallback,
  signHeaderCallback, signedDataCallback, backEvent
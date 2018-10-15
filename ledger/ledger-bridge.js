document.addEventListener("message", function(e){
  if (e && e.data && e.data.target === 'LEDGER-IFRAME') {
    switch (e.data.action) {
      case 'getAddress':
          window.tezledger.getAddress(e.data.path)
          .then(function(r){sendMessageToExtension(e.data.action, true, r)})
          .catch(function(r){sendMessageToExtension(e.data.action, false, r)});
      break;
      case 'sign':
          window.tezledger.sign(e.data.path, e.data.bytes)
          .then(function(r){sendMessageToExtension(e.data.action, true, r)})
          .catch(function(r){sendMessageToExtension(e.data.action, false, r)});
      break;
    }
  }
}, false);
function sendMessageToExtension(action, success, data) {
  window.parent.postMessage({
    action : action,
    success : success,
    data : data
  }, '*')
}
let _globalCurUri = null;
const _parseHash = () => {
  const hash = window.location.hash.slice(1) || '/';
  const [path, queryString] = hash.split('?');
  const args = {};
  if (queryString) {
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      args[key] = value ? decodeURIComponent(value) : true;
    });
  }
  return {
    path,
    args,
    hash,
    queryString
  };
};
const getCurUri = () => _globalCurUri;
const updateCurUri = () => { _globalCurUri = _parseHash(); };

const pageInitCallTable = {};
const pageExitCallTable = {};
const pageInit = callback => {
  if (pageInitCallTable[getCurUri().hash]) return;
  pageInitCallTable[getCurUri().hash] = callback;
  callback();
};
const pageExit = callback => {
  if (pageExitCallTable[getCurUri().hash]) return;
  pageExitCallTable[getCurUri().hash] = callback;
  callback();
};
const callPageInit = () => {
  if (!pageInitCallTable[getCurUri().hash]) return;
  pageInitCallTable[getCurUri().hash]();
};
const callPageExit = () => {
  if (!pageExitCallTable[getCurUri()]) return;
  pageExitCallTable[getCurUri()]();
};

const __SCRIPT_DOM__ = document.createElement('script');
const __DOM_PARER__ = new DOMParser();
const __CHANGE_TAB__ = {};
const renderHtML = (htmlStr, hash) => {
  const doc = __DOM_PARER__.parseFromString(htmlStr, 'text/html');
  const templateDom = doc.querySelector('template');
  const styleDom = doc.querySelector('style');
  document.body.innerHTML = `${templateDom ? templateDom.innerHTML : ''}${styleDom ? styleDom.outerHTML : ''}`;
  callPageInit();
  if (__CHANGE_TAB__[hash] || !doc.scripts[0] || !doc.scripts[0].textContent) {
    callPageExit();
    return;
  }
  const scriptDom = __SCRIPT_DOM__.cloneNode();
  scriptDom.type = doc.scripts[0].type;
  scriptDom.textContent = doc.scripts[0].textContent;
  document.body.appendChild(scriptDom);
  __CHANGE_TAB__[hash] = true;
};

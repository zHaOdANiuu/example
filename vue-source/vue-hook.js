import "./vue-route.js";

const pageInitCalls = {};
const pageExitCalls = {};

const __SCRIPT_DOM__ = document.createElement('script');
const __DOM_PARER__ = new DOMParser();
const __CHANGE_TAB__ = {};

const pageInit = callback => {
  if (pageInitCalls[getCurUri().hash]) return;
  pageInitCalls[getCurUri().hash] = callback;
  callback();
};
const pageExit = callback => {
  if (pageExitCalls[getCurUri().hash]) return;
  pageExitCalls[getCurUri().hash] = callback;
  callback();
};
const callPageInit = () => {
  if (!pageInitCalls[getCurUri().hash]) return;
  pageInitCalls[getCurUri().hash]();
};
const callPageExit = () => {
  if (!pageExitCalls[getCurUri()]) return;
  pageExitCalls[getCurUri()]();
};

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

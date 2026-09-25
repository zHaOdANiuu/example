const _globalRoutes = {};

const addRoute = (k, v) => { _globalRoutes[k] = v };

const handleRoute = async () => {
  updateCurUri();
  const uri = getCurUri();
  const html = globalRoutes[uri.path];
  if (!html) {
    document.body.innerHTML = '<h1>404</h1>';
    return;
  }
  readHTML(await html(uri), uri.path);
};

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

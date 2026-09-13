import "./vue-hook.js";

const handleRoute = async () => {
  updateCurUri();
  const r = getCurUri();
  const html = globalRoutes[r.path];
  if (!html) {
    document.body.innerHTML = '<h1>404</h1>';
    return;
  }
  readHTML(await html(r), r.path);
};

// example
// const fetchHtml = async path => await (await fetch(path)).text();
// addRoute('/', () => fetchHtml('/views/home.html'));
// addRoute('/article.html', () => fetchHtml('/views/article.html'));
// addRoute('/preview.html', () => fetchHtml('views/preview.html'));

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

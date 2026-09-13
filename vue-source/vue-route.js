let globalCurUri = null;
const globalRoutes = {};

const parseHash = () => {
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

const addRoute = (k, v) => {
  globalRoutes[k] = v;
};

const getCurUri = () => globalCurUri;

const updateCurUri = () => {
  globalCurUri = parseHash();
};

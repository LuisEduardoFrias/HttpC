import path from 'path';
import _static from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const HTTPC_PATH = "/httpc";
//----------------------------

export default class gateway {
  //
  #app = null;
  #colectionRoutes = [];
  #_baseUrl = '';

  constructor(app, out__dirname = null) {
    this.#app = app;
    this.#colectionRoutes = [];

    this.#app.set('protocol', this.#app.get('protocol') ?? 'http://');
    this.#app.set('domain', this.#app.get('domain') ?? 'localhost:');
    this.#app.set('port', process.env.PORT ?? (this.#app.get('port') ?? '3000'));

    this.#app.set('view engine', 'pug');
    this.#app.set('views', path.join(__dirname, 'public/views/pages'));

    if (!out__dirname)
      this.#app.set('views', path.join(out__dirname, 'public/views/pages'));

    this.#_baseUrl =
      this.#app.get('protocol') +
      this.#app.get('domain') +
      this.#app.get('port');

    this.#app.use(_static(__dirname + '/public'));

    this.#app.use((req, res, next) =>
      this.#checkExpectedObjectMatch(req, res, next))
  }
  //
  #checkExpectedObjectMatch(req, res, next) {
    const url = req.url;
    const propsBody = Reflect.ownKeys(req.body);

    function equalPathUrl(params, path, url) {
      const pathSplit = path.slice(1).split('/');
      const urlSplit = url.slice(1).split('/');

      for (let i = 0; i < params?.length; i++) {
        const paramIndex = pathSplit.indexOf(':' + params[i]);

        if (paramIndex !== -1) {
          pathSplit.splice(paramIndex, 1);
          urlSplit.splice(paramIndex, 1);
        }
      }

      const cleanPath = pathSplit.join('/');
      const cleanUrl = urlSplit.join('/');
      //console.log(`${cleanPath} === ${cleanUrl}: `, cleanPath === cleanUrl)
      return cleanPath === cleanUrl;
    }

    if (url !== HTTPC_PATH && this.#colectionRoutes?.length > 0) {
      let index = 0;
      let prop = "";
      const obj = this.#colectionRoutes.find(e => {
        const key = Reflect.ownKeys(e)[0];
        prop = key;

        const routes = e[key];
        for (let i = 0; i < routes.length; i++) {
          if (["post", "put", "delete"].some(j => routes[i].method.includes(j)))
            if (equalPathUrl(routes[i].params, routes[i].path, url)) {
              index = i;
              return true;
            }
        }
      })

      if (obj) {
        const dataRoute = obj[prop][index];

        if (dataRoute.jsonObj === '') { next(); return; }

        const requireBody = JSON.parse(dataRoute.jsonObj);
        const propsRequireBody = Reflect.ownKeys(requireBody);

        if (propsBody.toString() !== propsRequireBody.toString()) {
          res.status(400).send({ message: "The object sent in the request body does not match the expected format." });
          return;
        }
      }
    }

    next();
  }
  //
  #api() {
    //routes
    this.#app.get(HTTPC_PATH, (req, res) => {
      res.render('index', {
        routes: this.#colectionRoutes,
      });
    });

    console.log(`Access => ${this.#_baseUrl} / httpc`);
  }
  //
  #colorForHttpMethod(method_) {
    const httpMethod = {
      get: () => '#00a618',
      post: () => '#0057a2',
      put: () => '#2098ff',
      delete: () => '#f92323',
      default: () => 'transparent',
    };

    return (httpMethod[method_] ?? httpMethod['default'])();
  }
  //
  //
  #addColectionRoutes(path, method, props = '') {
    const paranms = path
      .split('/')
      .map((e) => e.search(':') !== -1 && e)
      .filter((e) => e !== false)
      .map((e) => e.replace(':', ''));

    let isBase = false;
    this.#colectionRoutes.filter((e) => {
      if (Reflect.ownKeys(e)[0] === '_base_') {
        isBase = true;
      }
    });

    if (!isBase) {
      this.#colectionRoutes.push({
        _base_: [
          {
            baseUrl: this.#_baseUrl,
            path: path,
            params: paranms,
            method: method,
            jsonObj: props,
            headerColor: this.#colorForHttpMethod(method),
          },
        ],
      });
    } else {
      this.#colectionRoutes.filter((e) => {
        if (Reflect.ownKeys(e)[0] === '_base_') {
          e._base_.push({
            baseUrl: this.#_baseUrl,
            path: path,
            params: paranms,
            method: method,
            jsonObj: props,
            headerColor: this.#colorForHttpMethod(method),
          });
        }
      });
    }
  }
  // rutas base
  routes(path, obj) {
    this.#app.use(path, obj);

    const propsName = path.replace('/', '');
    const _obj = {};

    Reflect.set(_obj, propsName, []);

    obj?.stack.map((e) => {
      if (e.route !== undefined) {
        const met = Reflect.ownKeys(e.route.methods)[0];

        _obj[propsName].push({
          baseUrl: this.#_baseUrl,
          path: path + e.route.path,
          params: e.keys?.map((e) => e.name),
          method: met,
          jsonObj: e.route.body_json,
          headerColor: this.#colorForHttpMethod(met),
        });

        delete e.route.body_json;
      }
    });

    this.#colectionRoutes.push(_obj);
  }
  //
  listen(port, fn) {
    this.#api();

    if (typeof port === 'function') {
      this.#app.listen(this.#app.get('port'), port);
      return;
    }

    this.#app.listen(port, fn);
  }
  //

  use(path, fn = null) {
    if (typeof path === 'function' && fn === null)
      this.#app.use(path);
    else if (typeof path === 'string' && fn !== null && typeof fn === 'function') {
      this.#app.use(path, fn);
    }
    else {
      throw new Error('The paramn \'fn\' is null');
    }
  }

  get(path, fn, midlerware) {
    this.#addColectionRoutes(path, 'get');
    if (midlerware)
      this.#app.get(path, midlerware, fn);
    else
      this.#app.get(path, fn);
  }

  post(path, fn, obj = null, midlerware = null) {
    if (typeof obj === 'function') {
      this.#addColectionRoutes(path, 'post', getProps(null));
      this.#app.post(path, obj, fn);
    }
    else if (typeof obj === 'object' && midlerware !== null) {
      this.#addColectionRoutes(path, 'post', getProps(obj));
      this.#app.post(path, midlerware, fn);
    }
    else if ((typeof obj === 'object' || obj === null) && midlerware === null) {
      this.#addColectionRoutes(path, 'post', getProps(obj));
      this.#app.post(path, fn);
    }
  }

  put(path, fn, obj = null, midlerware = null) {
    if (typeof obj === 'function') {
      this.#addColectionRoutes(path, 'put', getProps(null));
      this.#app.put(path, obj, fn);
    }
    else if (typeof obj === 'object' && midlerware !== null) {
      this.#addColectionRoutes(path, 'put', getProps(obj));
      this.#app.put(path, midlerware, fn);
    }
    else if ((typeof obj === 'object' || obj === null) && midlerware === null) {
      this.#addColectionRoutes(path, 'put', getProps(obj));
      this.#app.put(path, fn);
    }
  }

  delete(path, fn, obj = null, midlerware = null) {
    if (typeof obj === 'function') {
      this.#addColectionRoutes(path, 'delete', getProps(null));
      this.#app.delete(path, obj, fn);
    }
    else if (typeof obj === 'object' && midlerware !== null) {
      this.#addColectionRoutes(path, 'delete', getProps(obj));
      this.#app.delete(path, midlerware, fn);
    }
    else if ((typeof obj === 'object' || obj === null) && midlerware === null) {
      this.#addColectionRoutes(path, 'delete', getProps(obj));
      this.#app.delete(path, fn);
    }
  }
}

export class router {
  #app = null;

  constructor(express) {
    this.#app = express.Router();
  }

  router() {
    return this.#app;
  }

  use(path, fn = null) {
    if (typeof path === 'function' && fn === null)
      this.#app.use(path);
    else if (typeof path === 'string' && fn !== null && typeof fn === 'function') {
      this.#app.use(path, fn);
    }
    else {
      throw new Error('The paramn \'fn\' is null');
    }
  }

  get(path, fn, midlerware) {
    if (midlerware)
      this.#app.get(path, midlerware, fn);
    else
      this.#app.get(path, fn);
  }

  post(path, fn, obj = null, midlerware = null) {
    if (typeof obj === 'function') {
      this.#app.post(path, obj, fn);
      addBodyJson(obj, this.#app);
    }
    else if (typeof obj === 'object' && midlerware !== null) {
      this.#app.post(path, midlerware, fn);
      addBodyJson(obj, this.#app);
    }
    else if ((typeof obj === 'object' || obj === null) && midlerware === null) {
      this.#app.post(path, fn);
      addBodyJson(obj, this.#app);
    }
  }

  put(path, fn, obj = null, midlerware = null) {
    if (typeof obj === 'function') {
      this.#app.put(path, obj, fn);
      addBodyJson(obj, this.#app);
    }
    else if (typeof obj === 'object' && midlerware !== null) {
      this.#app.put(path, midlerware, fn);
      addBodyJson(obj, this.#app);
    }
    else if ((typeof obj === 'object' || obj === null) && midlerware === null) {
      this.#app.put(path, fn);
      addBodyJson(obj, this.#app);
    }
  }

  delete(path, fn, obj = null, midlerware = null) {
    if (typeof obj === 'function') {
      this.#app.delete(path, obj, fn);
      addBodyJson(obj, this.#app);
    }
    else if (typeof obj === 'object' && midlerware !== null) {
      this.#app.delete(path, midlerware, fn);
      addBodyJson(obj, this.#app);
    }
    else if ((typeof obj === 'object' || obj === null) && midlerware === null) {
      this.#app.delete(path, fn);
      addBodyJson(obj, this.#app);
    }
  }
}

function addBodyJson(obj, app) {
  if (obj && app.stack.length > 0) {
    const index = app?.stack.length - 1;
    const lastLayer = app?.stack[index];

    if (lastLayer && lastLayer.route) {
      const updatedLayer = { ...lastLayer };
      updatedLayer.route.body_json = getProps(obj);
      //  app.stack[index] = updatedLayer;
    }
  }
}

function getProps(obj) {
  if (Array.isArray(obj)) {
    const objeto = {};
    obj.forEach((element) => {
      objeto[element] = element;
    });
    return JSON.stringify(objeto, null, 2);
  }

  if (obj) {
    const instance = Reflect.construct(obj, []);

    const instanceWP = {};
    Reflect.ownKeys(instance).forEach((key) => {
      instanceWP[key] = typeof instance[key];
    });

    // Eliminar propiedades específicas
    delete instanceWP.key;
    delete instanceWP._token;

    return JSON.stringify(instanceWP, null, 2);
  }
  return '';
}

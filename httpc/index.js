import path from 'path';
import _static from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//----------------------------

export default class gateway {
  //
  #app = null;
  #colectionRoutes = [];
  #_baseUrl = '';

  constructor(app) {
    this.#app = app;
    this.#colectionRoutes = [];

    this.#app.set('protocol', this.#app.get('protocol') ?? 'http://');
    this.#app.set('domain', this.#app.get('domain') ?? 'localhost:');
    this.#app.set('port', this.#app.get('port') ?? '3000');

    app.use(_static(__dirname + '/public'));
    this.#app.set('view engine', 'pug');
    this.#app.set('views', path.join(__dirname, 'public/views/pages'));

    this.#_baseUrl =
      this.#app.get('protocol') +
      this.#app.get('domain') +
      this.#app.get('port');
  }
  //
  #api() {
    //routes
    this.#app.get('/HttpC', (req, res) => {
      res.render('index', {
        routes: this.#colectionRoutes,
      });
    });

    console.log(`Access => ${this.#_baseUrl}/httpc`);
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
  //
  routes(path, obj) {
    const _obj = `{ "${path.replace('/', '')}": []}`;
    const objs = [];
    let add_ = true;

    obj?.stack.map((e) => {
      add_ = true;
      if (e.route !== undefined) {
        const met = Reflect.ownKeys(e.route.methods)[0];
        
        objs.push({
          baseUrl: this.#_baseUrl,
          path: path + e.route.path,
          params: e.keys?.map((e) => e.name),
          method: met,
          jsonObj: e.route.body_json,
          headerColor: this.#colorForHttpMethod(met),
        });
        
        delete e.route.body_json;
      } else {
        add_ = false;
      }
    });

    if (add_) {
      this.#colectionRoutes.push(
        JSON.parse(_obj.replace('[]', JSON.stringify(objs)))
      );
    }

    this.#app.use(path, obj);
  }
  //
  listen(port, fn) {
    this.#api();

    if (typeof port === 'function') {
      this.#app.listen(this.#app.get('port') ?? '3000', fn);
      return;
    }

    this.#app.listen(port, fn);
  }
  //

  use(fn) {
    this.#app.set(fn);
  }

  get(path, fn) {
    this.#addColectionRoutes(path, 'get');
    this.#app.get(path, fn);
  }

  post(path, fn, obj = null) {
    this.#addColectionRoutes(path, 'post', getProps(obj));
    this.#app.post(path, fn);
  }

  put(path, fn, obj = null) {
    this.#addColectionRoutes(path, 'put', getProps(obj));
    this.#app.put(path, fn);
  }

  delete(path, fn) {
    this.#addColectionRoutes(path, 'delete');
    this.#app.delete(path, fn);
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

  use(fn) {
    this.#app.use(fn);
  }

  get(path, fn) {
    this.#app.get(path, fn);
  }

  post(path, fn, obj = null) {
    this.#app.post(path, fn);
    addBodyJson(obj, this.#app);
  }

  put(path, fn, obj = null) {
    this.#app.put(path, fn);
    addBodyJson(obj, this.#app);
  }

  delete(path, fn) {
    this.#app.delete(path, fn);
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

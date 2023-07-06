class gateway {
  //
  constructor(app) {
    this.colectionRoutes = [];
    this.app = app;
    this._baseUrl =
      (this.app.get("protocol") ?? "http://") +
      (this.app.get("domain") ?? "localhost:") +
      (this.app.get("port") ?? "");
  }
  //
  api() {
    //routes
    this.app.get("/HttpC", (req, res) => {
      res.render("index", {
        routes: this.colectionRoutes,
      });
    });

    console.log(`${this._baseUrl}/HttpC`);
  }
  //
  colorForMethod(method_) {
    if (method_ === "get") {
      return "#00a618";
    } else if (method_ === "post") {
      return "#0057a2";
    } else if (method_ === "put") {
      return "#2098ff";
    } else if (method_ === "delete") {
      return "#f92323";
    } else {
      return "transparent";
    }
  }
  //
  addColectionRoutes(path, method) {
    this.colectionRoutes.push({
      base: [
        {
          baseUrl: this._baseUrl,
          path: path,
          params: "", //Todo parametros
          method: method,
          headerColor: this.colorForMethod(method),
        },
      ],
    });
  }
  //
  routes(path, obj) {
    const _obj = `{ "${path.replace("/", "")}": []}`;
    const objs = [];
    let add_ = true;

    obj?.stack.map((e) => {
      add_ = true;
      if (e.route !== undefined) {
        const met = Reflect.ownKeys(e.route.methods)[0];
        
        objs.push({
          baseUrl: this._baseUrl,
          path: path + e.route.path,
          params: e.keys?.map((e) => e.name),
          method: met,
          headerColor: this.colorForMethod(met),
        });
      } else {
        add_ = false;
      }
    });

    if (add_) {
      this.colectionRoutes.push(
        JSON.parse(_obj.replace("[]", JSON.stringify(objs)))
      );
    }

    this.app.use(path, obj);
  }

  get(path, fn) {
    this.addColectionRoutes(path, "get");
    this.app.get(path, fn);
  }

  post(path, fn) {
    this.addColectionRoutes(path, "post");
    this.app.post(path, fn);
  }

  put(path, fn) {
    this.addColectionRoutes(path, "put");
    this.app.put(path, fn);
  }

  delete(path, fn) {
    this.addColectionRoutes(path, "delete");
    this.app.delete(path, fn);
  }
}

module.exports = gateway;

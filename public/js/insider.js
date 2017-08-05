var AppModule;

(function (module) {
    var cache = {};
    function template(str, data) {
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            template(document.getElementById(str).innerHTML) :
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                str.replace(/[\r\t\n]/g, " ")
                    .split("{{").join("\t")
                    .replace(/((^|}})[^\t]*)'/g, "$1\r")
                    .replace(/\t(.*?)}}/g, "',$1,'")
                    .split("\t").join("');")
                    .split("}}").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");
        return data ? fn(data) : fn;
    };
    module.template = template;
})(AppModule || (AppModule = {}));

(function (module) {
    var routes = {};
    var route = function (path, templateId, controller) {
        if (toString.call(controller) === '[object String]') {
            routes[path] = { templateId: templateId, controller: module.controllers[controller].func };
        } else {
            routes[path] = { templateId: templateId, controller: controller };
        }
        return this;
    }
    var el = null;
    function router() {
        el = el || document.getElementById('view');
        var url = location.hash.slice(1) || '/';
        var route = routes[url];
        var urlStrings = route.templateId.split('.');
        var isTemplateUrl = urlStrings[urlStrings.length - 1] === 'html' || urlStrings[urlStrings.length - 1] === 'htm'
        if (el && route.controller) {
            if (isTemplateUrl) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        var controllerInstance = new route.controller();
                        el.innerHTML = module.template(xmlHttp.responseText, controllerInstance);
                        controllerInstance.onload(el);
                    }
                }
                xmlHttp.open("GET", route.templateId, true);
                xmlHttp.send(null);
            } else {
                el.innerHTML = module.template(route.templateId, new route.controller());
            }
        }
    }
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    module.routes = routes;
    module.route = route;


    var controllers = {};
    var controller = function (name, func) {
        controllers[name] = { name: name, func: func }
    }
    module.controllers = controllers;
    module.controller = controller;

})(AppModule || (AppModule = {}));


(function (module) {
    // import classes
    var components = {};
    var h = Batman.core.h;
    var BaseComponent = Batman.core.BaseComponent;

    function ListMenu(element, options) {
        var _that = this;
        this.__proto__ = new BaseComponent(element, 'menu', options);
        this.selected = this.options.data[0];
        this.render = function () {
            return h('ul.no-pad-mar',
                [this.options.data.map(function (item, index) {
                    return h('li', h('a', {
                        classes: { selected: item.url === _that.selected.url },
                        href: '#' + item.url,
                        onclick: function () { _that.selected = item; }
                    }, item.text));
                })]
            );
        }

        this.projector.append(element, this.render.bind(this));
    }
    module.components = components;
    module.components.ListMenu = ListMenu;

})(AppModule || (AppModule = {}));


(function (module) {
    // import classes
    var services = {};

    function httpGet(url, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                callback(data);
            }
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }

    module.services = services;
    module.services.httpGet = httpGet;

})(AppModule || (AppModule = {}));


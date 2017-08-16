"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms"); // <-- NgModel lives here
var router_1 = require("@angular/router");
var batman_module_1 = require("@batman/aio/batman.module");
var app_component_1 = require("./app.component");
var list_components_1 = require("./list/list.components");
var core_2 = require("@angular/core");
var AppHomeComponent = (function () {
    function AppHomeComponent() {
    }
    AppHomeComponent = __decorate([
        core_2.Component({
            template: "\n<h1 class=\"h1\"> Angulario Wrappers </h1>\n<h2 class=\"h5\">angulario components installation and usage</h2>\n\n<ul>\n    <li> Install the packages\n        <div class=\"pad-mar-2x no-mar-collapse\">\n            <code>npm install ..\\\\build\\\\batman-aio-1.0.0-alpha.2.tgz</code>\n        </div>\n    </li>\n    <li> \n      Add the following <code>scripts</code> and <code>styles</code> in index.html file\n      <div class=\"pad-mar-2x no-mar-collapse\">\n          <code>\n              &lt;link rel=\"stylesheet\" href=\"./node_modules/@batman/core/css/batman.css\" &gt;\n          </code>\n      </div>\n      <div class=\"pad-mar-2x no-mar-collapse\">\n          <code>\n              \n          </code>\n      </div>\n    </li>\n    <li>\n        Configure the following code in <code> systemjs.config.js </code> \n  \n      <div class=\"pad-mar-2x no-mar-collapse\">\n          <code>\n            '@batman/components/components': 'npm:@batman/components/components.js',\n          </code>\n      </div>\n      <div class=\"pad-mar-2x no-mar-collapse\">\n          <code>\n            '@batman/core/core': 'npm:@batman/core/core.js',\n          </code>\n      </div>\n      <div class=\"pad-mar-2x no-mar-collapse\">\n          <code>\n            '@batman/aio/batman.module': 'npm:@batman/aio/batman.module.js',\n          </code>\n      </div>\n\n    </li>\n    <li>\n      Import <code>BatmanModule</code> module\n\n      <div class=\"pad-mar-2x no-mar-collapse\">\n          <code>\n            import {{ '{' }} BatmanModule {{ '}' }} from '@batman/aio/batman.module';\n          </code>\n      </div>\n\n      <div class=\"pad-mar-2x no-mar-collapse\">\n          <code>\n            @NgModule({{ '{' }}\n              imports: [\n                BatmanModule\n              ],\n              declarations: [\n                AppComponent,  \n              ],\n              bootstrap: [AppComponent]\n            {{ '}' }})\n          </code>\n      </div>\n\n    </li>\n    <li> Use the following code in template\n        <div class=\"pad-mar-2x no-mar-collapse\">\n            <code>\n              &lt;bat-list [options]=\"listOptions\"&gt; &lt;/bat-list&gt;\n            </code>\n            <br>\n        </div>\n    </li>\n\n</ul>\n    "
        })
    ], AppHomeComponent);
    return AppHomeComponent;
}());
exports.AppHomeComponent = AppHomeComponent;
var appRoutes = [
    { path: '', component: AppHomeComponent, pathMatch: 'full' },
    { path: 'home', component: AppHomeComponent, pathMatch: 'full' },
    { path: 'list-home', component: list_components_1.ListHomeComponent, pathMatch: 'full' },
    { path: 'list-basic', component: list_components_1.BasicListComponent, pathMatch: 'full' },
    { path: 'list-auto-resize', component: list_components_1.BasicListComponent, pathMatch: 'full' }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes, { enableTracing: true }),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                batman_module_1.BatmanModule
            ],
            declarations: [
                app_component_1.AppComponent,
                AppHomeComponent,
                list_components_1.ListHomeComponent,
                list_components_1.BasicListComponent,
                app_component_1.NavComponent
            ],
            bootstrap: [app_component_1.AppComponent, app_component_1.NavComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
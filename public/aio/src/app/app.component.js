"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<router-outlet></router-outlet>"
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var NavComponent = (function () {
    function NavComponent() {
    }
    NavComponent = __decorate([
        core_1.Component({
            selector: '[my-nav]',
            template: "\n        <ul class=\"no-pad-mar\">\n          <li><a routerLink=\"/home\">Home</a></li>\n          <li><a routerLink=\"/list-home\">List</a></li>\n          <li><a routerLink=\"/list-basic\">Basic</a></li>\n          <li><a routerLink=\"/list-auto-resize\">Auto resize</a></li>\n          <li><a routerLink=\"/list-custom-template\">Custom template</a></li>\n          <li><a routerLink=\"/list-complex-template\">Complex template</a></li>\n          <li><a routerLink=\"/list-custom-event\">Custom events</a></li>\n          <li><a routerLink=\"/list-huge-data\">Huge data</a></li>\n        </ul>\n  "
        })
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=app.component.js.map
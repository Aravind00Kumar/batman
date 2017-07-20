"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var components_1 = require("@batman/components/components");
var BatTreeComponent = (function () {
    function BatTreeComponent(e) {
        this.e = e;
        //let opt = Configuration.getOptions();
    }
    BatTreeComponent.prototype.ngAfterViewInit = function () {
        var element = this.e.nativeElement.firstChild;
        var optimizesTreeData = [
            { id: '1', level: 0, text: 'Search Engine', isOpened: true, icon: ['./img/o.png', './img/c.png'] },
            { id: '2', level: 1, text: 'Google', isOpened: false, icon: ['./img/o.png', './img/c.png'] },
            { id: '3', level: 2, text: 'V8', icon: './img/f.png' },
            { id: '4', level: 2, text: 'V7', icon: './img/f.png' },
            { id: '5', level: 1, text: 'Yahoo', icon: './img/f.png' },
            { id: '6', level: 1, text: 'MSN', icon: './img/f.png' },
            { id: '7', level: 0, text: 'Browsers', isOpened: true, icon: ['./img/o.png', './img/c.png'] },
            { id: '8', level: 1, text: 'Chrome', icon: './img/f.png' },
            { id: '9', level: 1, text: 'Edge', icon: './img/f.png' },
            { id: '10', level: 1, text: 'Opera', icon: './img/f.png' },
            { id: '11', level: 1, text: 'Firefox', icon: './img/f.png' },
            { id: '12', level: 0, text: 'Personal Computer', isOpened: true, icon: ['./img/o.png', './img/c.png'] },
            { id: '13', level: 1, text: 'HP', icon: './img/f.png' },
            { id: '14', level: 1, text: 'Dell', icon: './img/f.png' },
            { id: '15', level: 1, text: 'Fujitsu', icon: './img/f.png' },
            { id: '16', level: 1, text: 'Asus', icon: './img/f.png' },
            { id: '17', level: 0, text: 'Smart Phones', isOpened: true, icon: ['./img/o.png', './img/c.png'] },
            { id: '18', level: 1, text: 'Samsung', isOpened: false, icon: ['./img/o.png', './img/c.png'] },
            { id: '19', level: 2, text: 'Galaxy S7', icon: './img/f.png' },
            { id: '20', level: 2, text: 'Galaxy S8', icon: './img/f.png' },
            { id: '21', level: 1, text: 'LG', icon: './img/f.png' },
            { id: '22', level: 1, text: 'OnePlus', icon: './img/f.png' },
            { id: '23', level: 1, text: 'HTC', icon: './img/f.png' }
        ];
        var l1 = new components_1.OptimalTree(element, {
            data: optimizesTreeData,
            height: 30,
            activeScroll: false
        });
    };
    return BatTreeComponent;
}());
BatTreeComponent = __decorate([
    core_1.Component({
        selector: 'bat-tree',
        styles: ['.bat-list { height:100% }'],
        template: "<div class=\"bat-list\"></div>",
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BatTreeComponent);
exports.BatTreeComponent = BatTreeComponent;
//# sourceMappingURL=bat-tree.component.js.map
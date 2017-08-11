import * as angular from 'angular';

import { Module, AbstractDirective, DirectiveFactory } from './module'


class ListController {
    public list: any;
    public options: any;
    public refresh() {
        this.list.options.data = this.options.data;
        this.list.refresh();
    }

}

export default class ListDirective extends AbstractDirective {
    public controller: any;
    constructor() {
        super('list');
        this.controller = ListController;
    }

    public link(scope, element, attrs, ctrl) {
        var List = window['Batman'].list.List;
        ctrl.list = new List(element[0], ctrl.options);
        ctrl.options.api = {
            __list: ctrl.list,
            refresh: ctrl.refresh.bind(ctrl)
        };
    }

}

Module.instance.directive('batList', DirectiveFactory.get(ListDirective));
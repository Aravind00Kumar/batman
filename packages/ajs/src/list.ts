import * as angular from 'angular';

import {Module, AbstractDirective, DirectiveFactory} from './module'

export default class ListDirective extends AbstractDirective {
    constructor(){
        super('list');
    }

    public controller(){

    }
    public link(scope, elmnt, attrs, ctrl){

    }

}

Module.instance.directive('List', DirectiveFactory.get(ListDirective));
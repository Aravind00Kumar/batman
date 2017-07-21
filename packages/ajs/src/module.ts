import * as angular from 'angular';

export class Module {

    private static _instance: angular.IModule = null;

    static get instance():angular.IModule {
        Module._instance = angular.module('batman', []);
        return Module._instance;
    }
} 

export abstract class AbstractDirective{
    public controllerAs: string;
    public bindToController?: boolean | {[boundProperty: string]: string};
    public restrict: 'E';
    constructor(name: string){
        this.controllerAs = `${name}Ctrl`;
        this.bindToController = {
            options:'=?'
        }
    }
}

export class DirectiveFactory {
    public static get(Type){
        return function(){
            return new Type();
        };
    }
}




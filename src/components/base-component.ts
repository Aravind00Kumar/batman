import Global from '../global'
import {ILogger} from '../utility/logger'

export interface IBaseComponent{
    elements: Array<string>;
    options: any; 
}

export class BaseComponent implements IBaseComponent{
    public static Name : string;
    public static Version : string;

    public logger : ILogger;
    public elements: Array<string>;
    public context: HTMLElement;
    public options: any;

    constructor(name){
        BaseComponent.Name = name;
        BaseComponent.Version = Global.Version
        this.logger = Global.Logger;
    } 
} 
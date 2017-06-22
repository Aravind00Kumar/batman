import Global from '../global'
import {ILogger} from '../utility/logger'
import { h, createProjector, Projector, ProjectorOptions } from '../common/dom';

export interface IBaseComponent{
    elements: Array<string>;
    options: any; 
    projector: Projector
}

export class BaseComponent implements IBaseComponent{
    public static Name : string;
    public static Version : string;

    public logger : ILogger;
    public elements: Array<string>;
    public context: HTMLElement;
    public options: any;
    public projector: Projector

    constructor(name, projectorOptions?: ProjectorOptions){
        BaseComponent.Name = name;
        BaseComponent.Version = Global.Version
        this.logger = Global.Logger;
        this.projector = createProjector();
    } 
} 
import Global from '../global'
import { ILogger } from '../utility/logger'
//import { h, VNode, createProjector, Projector, ProjectorOptions } from '../common/maquette';
import { ProjectorFactory } from '../common/factory';
import { VNode, Projector, ProjectorOptions } from '../common/interfaces';
import { h } from '../common/h';

export interface IBaseComponent {
    elements: Array<string>;
    options: any;
    projector: Projector
}

export interface UIComponent {
    render(): VNode
}

export class BaseComponent implements IBaseComponent {
    public static Name: string;
    public static Version: string;

    public logger: ILogger;
    public elements: Array<string>;
    public context: HTMLElement;
    public options: any;
    public projector: Projector
    public animationSpeed: string;

    private lastKey = 0;

    constructor(name, projectorOptions?: ProjectorOptions) {
        BaseComponent.Name = name;
        BaseComponent.Version = Global.Version
        this.logger = Global.Logger;
        this.projector = ProjectorFactory.createProjector();
        this.animationSpeed = Global.AnimationDuration + 'ms';
    }
} 
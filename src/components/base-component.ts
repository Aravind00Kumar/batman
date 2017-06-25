import Global from '../global'
import { ILogger } from '../utility/logger'
import { h, VNode, createProjector, Projector, ProjectorOptions } from '../common/maquette';

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
    constructor(name, projectorOptions?: ProjectorOptions) {
        BaseComponent.Name = name;
        BaseComponent.Version = Global.Version
        this.logger = Global.Logger;
        this.projector = createProjector();
        this.animationSpeed = Global.AnimationDuration + 'ms';
    }
} 
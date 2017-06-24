/**
 * --------------------------------------------------------------------------
 * Dropdown Component
 * Licensed under MIT 
 * --------------------------------------------------------------------------
 */
import { h, createProjector } from '../../common/maquette';

import { IBaseComponent, BaseComponent } from '../base-component'

export interface IDropdownOptions {
    class?: string
}

export interface IDropdown {
    show(): void;
    hide(): void;
}

export class Dropdown extends BaseComponent implements IDropdown {
    public static defaultOptions: IDropdownOptions = {
        class: '.dropdown'
    }

    public display: boolean;
    public x: any;
    public y: any;

    constructor(private element: HTMLElement, options?: IDropdownOptions, data?: object) {
        super('Dropdown');
        this.options = <IDropdownOptions>{ ...Dropdown.defaultOptions, ...options };
        this.logger.log('Dropdown loaded');
        this.display = false;
        this.projector.append(this.element, this.renderMaquette.bind(this));
        this.x = 0;
        this.y = 0;
    }

    public renderMaquette() {
        return h('div.context', {
            style: 'height:600px; width:600px; border:1px solid orange',
            onmousemove: this.moveMouse.bind(this),
            onclick:this.print.bind(this),
        }, [h('div.dropdown', {
            style: `height:20px; position:absolute; width:20px; background:orange; display: ${this.getDisplay()}; left:${this.x}; top:${this.y}`
        })]);

    }

    public moveMouse(event) {
        event.stopPropagation()
        this.x = event.x + 'px';
        this.y = event.y + 'px';
    }

    public print(event) {
        this.logger.log(this.x +', '+ this.y)
    }

    public getDisplay() {
        return this.display ? 'block' : 'none';
    }

    public show() {
        this.display = true;
        this.projector.scheduleRender();
    }

    public hide() {
        this.display = false;
        this.projector.scheduleRender();
    }
}
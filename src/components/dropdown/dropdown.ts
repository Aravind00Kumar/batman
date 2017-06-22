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
    constructor(private element: HTMLElement, options?: IDropdownOptions, data?: object) {
        super('Dropdown');
        //this.context = context;
        this.options = <IDropdownOptions>{ ...Dropdown.defaultOptions, ...options };
        this.logger.log('Dropdown loaded');
        this.display = false;
        this.projector.append(this.element, this.renderMaquette.bind(this));
    }

    public renderMaquette() {
        return h('div', { style: 'height:200px; position:absolute; width:200px; background:orange; display: ' + (this.display == true ? 'block' : 'none'), class: this.options.class }, [
            h('div', { class: 'saucer', value: 'Greetings' })
        ]);
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
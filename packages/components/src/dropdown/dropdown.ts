// /**
//  * --------------------------------------------------------------------------
//  * Dropdown Component
//  * Licensed under MIT 
//  * --------------------------------------------------------------------------
//  */
// import { BaseComponent, h, VNode } from '../../common/common';


// export interface IDropdownOptions {
//     class?: string
// }

// export interface IDropdown {
//     show(): void;
//     hide(): void;
// }

// export class Dropdown extends BaseComponent<IDropdownOptions> implements IDropdown {
//     public static defaultOptions: IDropdownOptions = {
//         class: '.dropdown'
//     }

//     private _display: boolean;
//     private _x: any;
//     private _y: any;

//     constructor(element: HTMLElement, options?: IDropdownOptions, data?: object) {
//         super('Dropdown', element, { ...Dropdown.defaultOptions, ...options });
//         this._display = false;
//         this._x = 0;
//         this._y = 0;
//         this.projector.append(this.element, this.render.bind(this));
//     }

//     public render():VNode {
//         return h('div.context', {
//             style: 'height:600px; width:600px; border:1px solid orange',
//             onmousemove: this.moveMouse.bind(this),
//             onclick: this.print.bind(this),
//         }, [h('div.dropdown', {
//             style: `height:20px; position:absolute; width:20px; background:orange; display: ${this.getDisplay()}; left:${this._x}; top:${this._y}`
//         })]);

//     }

//     public moveMouse(event) {
//         event.stopPropagation()
//         this._x = event.x + 'px';
//         this._y = event.y + 'px';
//     }

//     public print(event) {
//         this.logger.log(this._x + ', ' + this._y)
//     }

//     public getDisplay() {
//         return this._display ? 'block' : 'none';
//     }

//     public show() {
//         this._display = true;
//         this.projector.scheduleRender();
//     }

//     public hide() {
//         this._display = false;
//         this.projector.scheduleRender();
//     }
// }
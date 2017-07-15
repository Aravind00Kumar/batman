import { BaseComponent, VNode, h, hParser } from '@batman/core/core';

/**
 * List component interface
 */
export interface IListComponent {
    refresh(): void;
}

/**
 * Interface for doughnut component values
 */
export interface IListValue {
    percentage: number,
    color: string
}

/**
 * Interface for doughnut component options
 */

export interface IListOptions {
    height?: number;
    data?: Array<any>;
    pageSize?: number;
    autoPage?: boolean;
    template?: string;
}


export class List extends BaseComponent<IListOptions> implements IListComponent {
    /**
     * Component default option. These options can be overridden from constructor
     */
    public static defaultOptions: IListOptions = {
        height: 40,
        pageSize: 0,
        data: [],
        autoPage: true,
        template: ''
    }

    // private properties
    private _start: number;
    private _end: number;
    private _activeData: Array<any>;
    private _counter: number;
    private _containerHeight: number;
    private _containerScrollTop: number;
    /**
     * Constructor to initiate the doughnut component 
     * @param element Context of the component 
     * @param options Component options
     */
    constructor(element: HTMLElement, options?: IListOptions) {
        super('List', element, { ...List.defaultOptions, ...options });

        if (this.options.pageSize !== 0) this.options.autoPage = false;
        this.init();

        this.projector.append(this.element, this.render.bind(this));
    }

    private init() {
        let elementOffset = this.element.clientHeight;
        if (this.options.pageSize === 0 || this.options.autoPage) {
            this.options.pageSize = Math.ceil(elementOffset / this.options.height);
            this._containerHeight = elementOffset;
        } else {
            this._containerHeight = (this.options.height * this.options.pageSize);
        }
        this._containerScrollTop = 0;
        this._start = 0;
        this._end = this.options.pageSize;
        this._activeData = this.options.data.slice(this._start, this._end);
    }

    private itemTemplate(item) {
        if (this.options.template !== '') {
            let template = document.createElement('template');
            template.innerHTML = this.options.template;
            let hTemplate = this.hParser((template.content && <HTMLElement>template.content.firstElementChild) || <HTMLElement>template.children[0], item);
            return hTemplate;
        }
        else {
            return h('span', [item.text]);
        }
    }

    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template  
     */
    public render(): VNode {
        return h('div.list.parent', {
            style: `height: ${this._containerHeight}px;`
        }, [
                h('div.child.container',
                    { style: `height: ${this._containerHeight}px;`, onscroll: this.scrollEvent.bind(this) },
                    [
                        h('div.child.data', {
                            style: `top:${this._containerScrollTop}px;`
                        }, [
                                h('ul.no-pad-mar', { style: `height:${this.options.height}px` }, [this._activeData.map((item, index) => {
                                    return h('li.flex.centery', {
                                        key: this._start + index
                                    }, this.itemTemplate(item));
                                })])
                            ]),
                        h('div.ghost', { style: `height:${this.options.data.length * this.options.height}px` }),
                    ])
            ])
    }

    private scrollEvent(event) {
        let start = Math.floor(event.currentTarget.scrollTop / this.options.height);
        if (start <= 0) { start = 0; this._containerScrollTop = 0 };
        let end = start + this.options.pageSize + 1;
        if (end >= this.options.data.length) end = this.options.data.length;
        if (start !== this._start && end !== this._end) {
            this._containerScrollTop = (start * this.options.height)//event.target.scrollTop;
            this._start = start;
            this._end = end;
            this._activeData = this.options.data.slice(this._start, this._end);
        }
    }

    public refresh() {
        this.init();
        this.projector.scheduleRender();
    }

}
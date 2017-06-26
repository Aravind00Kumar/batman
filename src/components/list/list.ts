import { h, createProjector, Projector, ProjectorOptions, VNode } from '../../common/maquette';
import { IBaseComponent, BaseComponent, UIComponent } from '../base-component'

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

export class List extends BaseComponent implements UIComponent, IListComponent {
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

    private start: number;
    private end: number;
    private activeData: Array<any>;
    private counter: number;
    private containerHeight: number;
    private containerScrollTop: number;
    /**
     * Constructor to initiate the doughnut component 
     * @param element Context of the component 
     * @param options Component options
     */
    constructor(private element: HTMLElement, options?: IListOptions) {
        super('List');
        this.options = <IListOptions>{ ...List.defaultOptions, ...options };
        if (this.options.pageSize !== 0) this.options.autoPage = false;

        this.init();

        this.projector.append(this.element, this.render.bind(this));
    }

    private init() {
        var elementOffset = this.element.clientHeight;
        if (this.options.pageSize === 0 || this.options.autoPage) {
            this.options.pageSize = Math.ceil(elementOffset / this.options.height);
            this.containerHeight = elementOffset;
        } else {
            this.containerHeight = (this.options.height * this.options.pageSize);
        }
        this.containerScrollTop = 0;
        this.start = 0;
        this.end = this.options.pageSize;
        this.activeData = this.options.data.slice(this.start, this.end);
    }

    private itemTemplate(item) {
        var template = document.createElement('template');
        template.innerHTML = this.options.template;
        var hTemplate = this.toH((template.content && <HTMLElement>template.content.firstElementChild) || <HTMLElement>template.children[0], item);
        return hTemplate;
    }

    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template  
     */
    public render(): VNode {
        return h('div.list.parent', {
            style: `height: ${this.containerHeight}px;`
        }, [
                h('div.child.container',
                    { style: `height: ${this.containerHeight}px;`, onscroll: this.scrollEvent.bind(this) },
                    [
                        h('div.child.data', {
                            style: `top:${this.containerScrollTop}px;`
                        }, [
                                h('ul.no-pad-mar', [this.activeData.map((item, index) => {
                                    return h('li.flex', {
                                        style: `height:${this.options.height}px`,
                                        key: this.start + index
                                    }, this.itemTemplate(item));
                                })])
                            ]),
                        h('div.ghost', { style: `height:${this.options.data.length * this.options.height}px` }),
                    ])
            ])
    }

    private scrollEvent(event) {
        var start = Math.floor(event.currentTarget.scrollTop / this.options.height);
        if (start <= 0) { start = 0; this.containerScrollTop = 0 };
        var end = start + this.options.pageSize + 1;
        if (end >= this.options.data.length) end = this.options.data.length;
        if (start !== this.start && end !== this.end) {
            this.containerScrollTop = (start * this.options.height)//event.target.scrollTop;
            this.start = start;
            this.end = end;
            this.activeData = this.options.data.slice(this.start, this.end);
        }
    }

    public refresh() {
        this.init();
        this.projector.scheduleRender();
    }

}
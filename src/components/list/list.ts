import { h, createProjector, Projector, ProjectorOptions, VNode } from '../../common/maquette';
import { IBaseComponent, BaseComponent } from '../base-component'

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
    pageSize?: number
}

export class List extends BaseComponent implements IListComponent {
    /**
     * Component default option. These options can be overridden from constructor
     */
    public static defaultOptions: IListOptions = {
        height: 40,
        pageSize: 0,
        data: []
    }

    private start: number;
    private end: number;
    private activeData: Array<any>;
    private counter: number;
    private containerHeight: number;
    /**
     * Constructor to initiate the doughnut component 
     * @param element Context of the component 
     * @param options Component options
     */
    constructor(private element: HTMLElement, options?: IListOptions) {
        super('List');
        this.options = <IListOptions>{ ...List.defaultOptions, ...options };
        var elementOffset = element.clientHeight;
        var borderHeight = parseInt(window.getComputedStyle(element).getPropertyValue('border-width'), 10) * 2;
        this.logger.log(elementOffset.toString());
        if (this.options.pageSize === 0) {
            this.options.pageSize = Math.ceil(elementOffset / this.options.height);
            this.containerHeight = elementOffset - borderHeight;
        } else {
            this.containerHeight = (this.options.height * this.options.pageSize) - borderHeight;
        }
        this.start = 0;
        this.end = this.options.pageSize;
        this.activeData = this.options.data.slice(this.start, this.end);
        this.projector.append(this.element, this.renderMaquette.bind(this));
    }

    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template  
     */
    private renderMaquette(): VNode {
        return h('div.list.parent.no-mar-collapse', {
            style: `height: ${this.containerHeight}px;`
        }, [
                h('div.child.data', [
                    h('ul.no-mar', [this.activeData.map((item, index) => {
                        return h('li', { key: this.start + index, style: `height:${this.options.height}px` }, [item.text]);
                    })])
                ]),
                h('div.child.container', { style: `height: ${this.containerHeight}px;`, onscroll: this.listScroll.bind(this) },
                    [h('div.ghost', { style: `height:${this.options.data.length * this.options.height}px` })
                    ])
            ])
    }

    private listScroll(event) {
        var start = Math.floor(event.currentTarget.scrollTop / this.options.height);
        if (start < 0) start = 0;
        var end = start + this.options.pageSize;
        if (end >= this.options.data.length) end = this.options.data.length;
        this.start = start;
        this.end = end;
        this.activeData = this.options.data.slice(this.start, this.end);
    }

    /**
     * Updates the arc
     * @param startAngle Start angle angle 
     * @param endAngle End angle value
     */
    public refresh() {
        this.projector.scheduleRender();
    }

}
import { BaseComponent, ProjectorOptions, VNode, h, hParser } from './../libs';

/**
 * Table component interface
 */
export interface ITableComponent {
    refresh(): void;
}

/**
 * Interface for doughnut component options
 */

export interface ITableOptions {
    height?: number;
    data?: Array<any>;
    pageSize?: number;
    autoPage?: boolean;
    template?: string;
    columns?:Array<any>;
}


export class Table extends BaseComponent<ITableOptions> implements ITableComponent {

    /**
     * Component default option. These options can be overridden from constructor
     */
    public static defaultOptions: ITableOptions = {
        height: 40,
        pageSize: 0,
        data: [],
        autoPage: true,
        template: '',
        columns:[]
    }
    constructor(element: HTMLElement, options?: ITableOptions) {
        super('Table', element, { ...Table.defaultOptions, ...options });
        this.projector.append(this.element, this.render.bind(this));
    }

    public render(): VNode {
        return h('div',{style:'color:red'},['Hello Table']);
    }

    public refresh() {
        this.projector.scheduleRender();
    }
}
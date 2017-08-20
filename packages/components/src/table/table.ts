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
    isCacheEnabled?: boolean;
    sortColumn?: any,
    sortType?: 'ASC' | 'DESC' | undefined,
    autoPage?: boolean;
    columns?: Array<any>;
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
        isCacheEnabled: true,
        columns: [],
        sortColumn: undefined,
        sortType: undefined,
    }

    private start: number;
    private end: number;
    private activeData: Array<any>;
    private counter: number;
    private containerHeight: number;
    private containerScrollTop: number;
    private scrollTop: number;
    private scrollLeft: number = 0;

    private resizeColumn: any;
    private isResizing: boolean;

    constructor(element: HTMLElement, options?: ITableOptions) {
        super('Table', element, { ...Table.defaultOptions, ...options });

        let elementOffset = this.element.clientHeight - 40;
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
        this.projector.append(this.element, this.render.bind(this));
    }

    public render(): VNode {
        return h('div.table.parent.item-full.no-scroll', {
            onmouseup: () => {
                this.isResizing = false;
            },
            onmousemove: (event) => {
                if (this.isResizing) {
                    event.preventDefault();
                    let val = this.resizeColumn.width + event.movementX;
                    if (val >= 50) this.resizeColumn.width = val;
                }
            },
            onmouseleave: () => {
                this.isResizing = false;
            }
        }, [
                h('div.header.parent', { style: `height: ${this.options.height}px;` }, [
                    h('div.row.child', { style: `height: inherit;left:${-this.scrollLeft}px` }, [this.options.columns.filter((col) => { return col.isVisible !== false }).map((item, index) => {
                        return h('div.cell', {
                            key: item.name, 'style': `overflow:hidden;text-overflow: ellipsis;white-space: nowrap;min-width:${item.width}px; max-width:${item.width}px`
                        }, [
                                h('span.child', {
                                    'style': `top:0;right:-5px; height:100%; width:11px; cursor:col-resize; z-index:2`,
                                    onmousedown: (event: any) => {
                                        event.stopImmediatePropagation();
                                        event.preventDefault();
                                        this.isResizing = true;
                                        this.resizeColumn = item;
                                        return false;
                                    }
                                }),
                                h('span', {
                                    style:'cursor:pointer',
                                    onclick: (event) => {
                                        if (this.isResizing === false) {
                                            this.options.sortColumn = item;
                                            if (this.options.sortType === undefined)
                                                this.options.sortType = 'ASC';
                                            else if (this.options.sortType === 'ASC')
                                                this.options.sortType = 'DESC';
                                            else if (this.options.sortType === 'DESC')
                                                this.options.sortType = undefined;
                                            this.sortData();
                                        }
                                    },
                                }, [h('b', {
                                    classes: {
                                        'icon-sort-amount-asc': this.options.sortColumn.name === item.name && this.options.sortType == 'ASC',
                                        'icon-sort-amount-desc': this.options.sortColumn.name === item.name && this.options.sortType == 'DESC'
                                    }
                                }), item.text]),

                            ])
                    })])
                ]),

                h('div.parent', {
                    style: `height: ${this.containerHeight}px;`
                }, [
                        h('div.child.container',
                            { style: `height: ${this.containerHeight}px;`, onscroll: this.scrollEvent.bind(this) },
                            [
                                h('div.child.data', {
                                    style: `top:${this.containerScrollTop}px;`
                                }, [
                                        h('div.body', { style: `height:${this.options.height}px` }, [this.activeData.map((item, index) => {
                                            return this.itemTemplate(item, index);
                                        })])
                                    ]),
                                h('div.ghost', { style: `height:${this.options.data.length * this.options.height}px` }),
                            ])
                    ])
            ]);
    }

    private cellTemplate(column, item) {
        var index = item.id - 1;
        if (this.options.isCacheEnabled && this.options.data[index].__cache && this.options.data[index].__cache[column.name]) {
            return this.options.data[index].__cache[column.name];
        }
        let template = document.createElement('template');
        template.innerHTML = column.template;
        let hTemplate = this.hParser((template.content && <HTMLElement>template.content.firstElementChild) || <HTMLElement>template.children[0], item);

        if (this.options.isCacheEnabled) {
            this.options.data[index].__cache = this.options.data[index].__cache || {};
            this.options.data[index].__cache[column.name] = hTemplate;
        }

        return hTemplate;
    }

    private itemTemplate(item, index) {
        return h('div.row', { key: item.id }, [this.options.columns.filter((col) => { return col.isVisible !== false }).map((col, index) => {
            return h('div.cell', { key: col.name, 'style': `overflow:hidden;text-overflow: ellipsis;white-space: nowrap;min-width:${col.width}px; max-width:${col.width}px` }, h('div.c', [
                col.template ? this.cellTemplate(col, item) : item[col.name]]
            ))
        })])
    }
    private scrollEvent(event) {

        // Store initial values
        if (!this.scrollTop) this.scrollTop = event.currentTarget.scrollTop;
        if (!this.scrollLeft) this.scrollLeft = event.currentTarget.scrollLeft;

        // Vertical scrolling 
        if (event.currentTarget.scrollTop !== this.scrollTop) {
            let start = Math.floor(event.currentTarget.scrollTop / this.options.height);
            if (start <= 0) { start = 0; this.containerScrollTop = 0 };
            let end = start + this.options.pageSize + 1;
            if (end >= this.options.data.length) end = this.options.data.length;
            if (start !== this.start && end !== this.end) {
                this.containerScrollTop = (start * this.options.height)//event.target.scrollTop;
                this.start = start;
                this.end = end;
                this.activeData = this.options.data.slice(this.start, this.end);
            }
            this.scrollTop = event.currentTarget.scrollTop;
        }

        // Horizontal scrolling 
        if (event.currentTarget.scrollLeft !== this.scrollLeft) {


            this.scrollLeft = event.currentTarget.scrollLeft;
        }
    }
    private sortData() {
        let colName = this.options.sortColumn.name;
        if (this.options.data[0][colName] === undefined) {
            console.log('Sort cannot be applied to a custom column');
            return;
        }
        this.options.data.sort((a, b) => {
            if (this.options.sortType === 'ASC')
                return (a[colName] > b[colName]) ? 1 : ((b[colName] > a[colName]) ? -1 : 0);
            else if (this.options.sortType === 'DESC')
                return (a[colName] < b[colName]) ? 1 : ((b[colName] < a[colName]) ? -1 : 0);
            else
                return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);
        });
        this.options.data.map((item) => { item.__cache = undefined });
        this.activeData = this.options.data.slice(this.start, this.end);
    }
    public refresh() {
        this.projector.scheduleRender();
    }
}
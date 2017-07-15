import { BaseComponent, h, hParser, VNode  } from '@batman/core/core';

import { ITreeComponent, IOptimalTreeOptions, IOptimalTreeNode } from './itree';


export class OptimalTree
    extends BaseComponent<IOptimalTreeOptions>
    implements ITreeComponent {
    /**
     * Component default option. These options can be overridden from constructor
     */
    public static defaultOptions: IOptimalTreeOptions = {
        height: 40,
        pageSize: 0,
        data: [],
        autoPage: true,
        template: '',
        caret: true,
        icons: {
            folder: ['icon-folder-o', 'icon-folder-open-o'],
            plusMinus: ['icon-plus-round', 'icon-minus-round'],
            noIcon: 'n'
        }
    }

    private _start: number;
    private _end: number;
    private _activeData: IOptimalTreeNode[];
    private _filteredData: IOptimalTreeNode[];
    private _containerScrollTop: number;
    private _containerHeight: number;
    /**
     * Constructor to initiate the doughnut component 
     * @param element Context of the component 
     * @param options Component options
     */
    constructor(element: HTMLElement, options?: IOptimalTreeOptions) {
        super('OptimalTree', element, { ...OptimalTree.defaultOptions, ...options });
        if (this.options.pageSize !== 0) this.options.autoPage = false;
        this.init();
        this.projector.append(this.element, this.render.bind(this));
    }

    private init() {
        this._activeData = [];
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
        this.getActiveRecords()
    }

    public open(item, event) {
        if (item.hasOwnProperty('isOpened')) {
            item.isOpened = !item.isOpened;
        }
        this.getActiveRecords();
    }

    private itemTemplate(item) {
        if (this.options.template !== '') {
            let template = document.createElement('template');
            template.innerHTML = this.options.template;
            let hTemplate = this.hParser((template.content && <HTMLElement>template.content.firstElementChild) || <HTMLElement>template.children[0], item);
            return hTemplate;
        }
        else {
            return h('span', [item.text])
        }
    }

    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template  
     */
    public render(): VNode {
        return h('div.optimal-tree.parent', {
            style: `height: ${this._containerHeight}px;`
        }, [
                h('div.child.container',
                    { style: `height: ${this._containerHeight}px;`, onscroll: this.scrollEvent.bind(this) },
                    [
                        h('div.child.data', {
                            style: `top:${this._containerScrollTop}px;`
                        }, [
                                h('ul.no-pad-mar', [this.getActiveRecords().map((item: IOptimalTreeNode, index) => {
                                    return h('li.flex', {
                                        'area-level': item.level,
                                        style: `height:${this.options.height}px`,
                                        key: item.id,
                                        onclick: this.open.bind(this, item)
                                    }, [h('i.icon', {
                                        style: `display: ${this.options.caret === false ? 'none' : 'initial'}`,
                                        classes: { open: item.isOpened === true, close: item.isOpened === false }
                                    }),
                                    h('i', {
                                        classes: {
                                            'icons2': item.hasOwnProperty('isOpened'),
                                            [item.icon ? this.options.icons[item.icon][0] : 'n']: item.isOpened === false,
                                            [item.icon ? this.options.icons[item.icon][1] : 'n']: item.isOpened === true
                                        }
                                    }),
                                    this.itemTemplate(item)]);
                                })])
                            ]),
                        h('div.ghost', { style: `height:${this._filteredData.length * this.options.height}px` }),
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
            this.getActiveRecords();
        }
    }

    private isParentOpened(data, item: IOptimalTreeNode, index) {
        let level = item.level - 1;
        let flag = false;
        for (let i = index; i >= 0 && level !== -1; i--) {
            if (data[i].level == level) {
                flag = data[i].isOpened;
                level--;
                if (!flag) break;
            }
        }
        return flag;
    }

    private getActiveRecords(): IOptimalTreeNode[] {
        this._filteredData = this.options.data.filter((item, index) => {
            if (item.level === 0) return item;
            else {
                if (this.isParentOpened(this.options.data, item, index)) {
                    return item;
                }
            }
        });
        this._activeData = this._filteredData.slice(this._start, this._end);
        return this._activeData;
    }

    public refresh() {
        this.init();
        this.projector.scheduleRender();
    }

}
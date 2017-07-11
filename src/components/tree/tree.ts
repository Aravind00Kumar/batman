import { BaseComponent, UIComponent, h, hParser, VNode } from '../../common/common';

import { ITreeComponent, ITreeOptions, ITreeNode } from './itree';


export class Tree extends BaseComponent<ITreeOptions> implements UIComponent, ITreeComponent {
    /**
     * Component default option. These options can be overridden from constructor
     */
    public static defaultOptions: ITreeOptions = {
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
    private selectedNode;
    private openNodes: number = 0;
    private globalKey: number = 0;


    /**
     * Constructor to initiate the doughnut component 
     * @param element Context of the component 
     * @param options Component options
     */
    constructor(element: HTMLElement, options?: ITreeOptions) {
        super('Tree', element, { ...Tree.defaultOptions, ...options });
        if (this.options.pageSize !== 0) this.options.autoPage = false;
        this.init();
        //this.openNodes = 0;

        this.activeData = [];
        this.iterator(this.options.data, 0, 0, 0, this.options.pageSize);
        this.openNodes = 0;
        this.getOpenNodesCount(this.options.data);
        this.openNodes += this.options.data.length;

        //this.logger.log('My Node: ' + this.findNode(this.options.data, 12).text);

        //this.getOpenNodesCount(this.options.data);
        //this.logger.log('Open Nodes: ' + (this.openNodes + this.options.data.length).toString());

        this.projector.append(this.element, this.render.bind(this));
    }

    private init() {
        this.counter = 0;
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
    }

    public open(item, event) {
        this.logger.log(`${item.text}, ${item.key}`);
        var node = this.findNode(this.options.data, item.text);
        node.isOpened = !node.isOpened;
        this.activeData = [];
        this.iterator(this.options.data, 0, 0, this.start, this.end - 1);
        this.openNodes = 0;
        this.getOpenNodesCount(this.options.data);
        this.openNodes += this.options.data.length;
    }

    private starts(level) {
        if (level == 0) return '*';
        if (level == 1) return '**';
        if (level == 2) return '***';
        if (level == 3) return '****';
    }

    private iterator(data, count?, level?, s?, e?) {
        if (count === -1) return -1;
        if (count === undefined) count = 0;
        if (level === undefined) level = 0;
        if (Array.isArray(data)) {
            for (let index = 0; index < data.length; index++) {
                let element = data[index];
                count = this.iterator(element, count, 0, s, e);
            }
        } else {
            // if (count < s) {
            //     this.logger.log(`X${count}  ${level} ${this.starts(level)} ${data.text}`);
            // }
            if (count >= s && count <= e) { // 2, 4 [index]
                this.activeData.push({
                    text: data.text,
                    isOpened: data.isOpened,
                    'type': (data.children && data.children.length > 0) ? 'p' : 'c',
                    key: count,
                    areaLevel: level,
                });
                //this.logger.log(`${count}  ${level} ${this.starts(level)} ${data.text}`);
            }
            if (count > e) {
                //this.logger.log(`X${count}  ${level} ${this.starts(level)} ${data.text}`);
                return -1;
            }
            count++;
            if (data.children && data.isOpened) {
                level++;
                for (let index = 0; index < data.children.length; index++) {
                    let element = data.children[index];
                    count = this.iterator(element, count, level, s, e);
                }
            }
        }
        return count;
    }

    private getOpenNodesCount(data) {
        if (Array.isArray(data)) {
            for (let index = 0; index < data.length; index++) {
                let element = data[index];
                this.getOpenNodesCount(element);
            }
        } else {
            if (data.isOpened) {
                if (data.children)
                    this.openNodes = this.openNodes + data.children.length;
                else {
                    this.openNodes += 1;
                }
            }
            if (data.children && data.isOpened) {
                for (let index = 0; index < data.children.length; index++) {
                    let element = data.children[index];
                    this.getOpenNodesCount(element);
                }
            }
        }
    }

    private findNode(data, index, counter?) {
        if (counter === undefined) counter = 0;
        if (counter > index) return null;
        if (typeof counter === 'object') {
            return counter;
        }
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                let element = data[i];
                if (typeof counter === 'object') return counter;
                counter = this.findNode(element, index, counter);
            }
        } else {
            if (index === data.text) return data;
            //if (index === counter) return data;
            if (counter + 1 > index) return null;
            counter++;
            if (data.children) {
                for (let i = 0; i < data.children.length; i++) {
                    let element = data.children[i];
                    if (typeof counter === 'object') return counter;
                    counter = this.findNode(element, index, counter);
                }
            }
        }
        return counter;
    }

     private itemTemplate(item) {
        if (this.options.template !== '') {
            var template = document.createElement('template');
            template.innerHTML = this.options.template;
            var hTemplate = this.hParser((template.content && <HTMLElement>template.content.firstElementChild) || <HTMLElement>template.children[0], item);
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
        return h('div.tree.parent', {
            style: `height: ${this.containerHeight}px;`
        }, [
                h('div.child.container',
                    { style: `height: ${this.containerHeight}px;`, onscroll: this.scrollEvent.bind(this) },
                    [
                        h('div.child.data', {
                            style: `top:${this.containerScrollTop}px;`
                        }, [this.recursiveRenderer()]),
                        h('div.ghost',
                            {
                                style: `height:${this.openNodes * this.options.height}px`
                            }),
                    ])
            ])
    }



    public recursiveRenderer(): Array<VNode> {
        return this.activeData.map((item, index) => {
            return h('div.li.flex', {
                key: this.guid(),
                style: `height:${this.options.height}px; align-items: center;`,
                onclick: this.open.bind(this, item),
                'data-key': item.text,
                'area-level': item.areaLevel,
                index: item.key,
                classes: { p: item.type == 'p', c: item.type == 'c', }
            }, [h('i.icon', {
                classes: {
                    close: item.type == 'p',
                    open: item.isOpened == true && item.type == 'p'
                }
            }),
            this.itemTemplate(item)]);
        })

    }


    private scrollEvent(event) {
        var start = Math.floor(event.currentTarget.scrollTop / this.options.height);
        if (start <= 0) { start = 0; this.containerScrollTop = 0 };
        var end = start + this.options.pageSize
        if (start !== this.start) {
            this.containerScrollTop = (start * this.options.height)//event.target.scrollTop;
            this.start = start;
            this.end = end;
            this.activeData = [];
            this.logger.log(`${this.start} ,${this.end} `)
            this.iterator(this.options.data, 0, 0, this.start, this.end - 1);
        }
    }

    public refresh() {
        this.init();
        this.projector.scheduleRender();
    }

}
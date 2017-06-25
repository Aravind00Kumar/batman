import Global from '../global'
import { ILogger } from '../utility/logger'
import { h, VNode, createProjector, Projector, ProjectorOptions } from '../common/maquette';

export interface IBaseComponent {
    elements: Array<string>;
    options: any;
    projector: Projector
}

export interface UIComponent {
    render(): VNode
}

export class BaseComponent implements IBaseComponent {
    public static Name: string;
    public static Version: string;

    public logger: ILogger;
    public elements: Array<string>;
    public context: HTMLElement;
    public options: any;
    public projector: Projector
    public animationSpeed: string;

    private lastKey = 0;

    constructor(name, projectorOptions?: ProjectorOptions) {
        BaseComponent.Name = name;
        BaseComponent.Version = Global.Version
        this.logger = Global.Logger;
        this.projector = createProjector();
        this.animationSpeed = Global.AnimationDuration + 'ms';
    }
    public toH(element, item): VNode {
        if (element.nodeValue) {
            if (element.nodeType !== 3 || element.nodeValue.indexOf("\"") > 0 || element.nodeValue.trim().length === 0) {
                return null;
            }
            return element.nodeValue.trim();
        }
        if (!element.tagName || element.style.display === "none") {
            return null;
        }
        var properties = {};
        var children = [];
        var classes = [];
        var selector = element.tagName.toLowerCase();
        if (selector !== "svg") {
            classes = element.className.split(" ");
            for (var i = 0; i < element.childNodes.length; i++) {
                var child = element.childNodes[i];
                children.push(this.toH(child, item));
            }
        }
        if (element.id) {
            selector = selector + "#" + element.id;
        }
        if (classes[0]) {
            selector = selector + "." + classes.join('.');
            // classes.shift();
            // if (classes.length > 0) {
            //     properties['classes'] = classes.map((c)=> { return "\"" + c + "\":true"; }).join();
            // }
        }
        if (!element.id) {
            properties['key'] = ++this.lastKey;
        }
        if (element.href) {
            properties["href"] = element.href;
        }
        if (element.src) {
            properties["src"] = element.src;
        }
        if (element.value) {
            properties["value"] = element.value;
        }
        if (element.height) {
            properties["height"] = element.height;
        }
        if (element.getAttribute('(value)')) {
            properties["innerHTML"] = item[element.getAttribute('(value)')];
        }
        if (element.getAttribute('(src)')) {
            properties["src"] = item[element.getAttribute('(src)')];
        }
        return h(selector, properties, [children.filter(function (c) { return !!c; })]);
    }

} 
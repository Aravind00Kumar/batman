import Global from '../global'
import { ILogger } from '../utility/logger'
//import { h, VNode, createProjector, Projector, ProjectorOptions } from '../common/maquette';
import { ProjectorFactory } from '../common/factory';
import { VNode, Projector, ProjectorOptions } from '../common/interfaces';
import { h } from '../common/h';

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
        this.projector = ProjectorFactory.createProjector();
        this.animationSpeed = Global.AnimationDuration + 'ms';
    }
    public hParser(element: any | HTMLElement, context: object): VNode {
        if (element.nodeValue) {
            if (element.nodeType !== 3 || element.nodeValue.indexOf("\"") > 0 || element.nodeValue.trim().length === 0) {
                return null;
            }
            return element.nodeValue;
            //return null;//element.nodeValue.trim();
        }
        if (!element.tagName) {
            return null;
        }
        let properties = {};
        let children = [];
        let classes = [];
        let selector = element.tagName.toLowerCase();
        if (selector !== "svg") {
            classes = element.className.split(" ");
            for (let i = 0; i < element.childNodes.length; i++) {
                let child = <HTMLElement>element.childNodes[i];
                children.push(this.hParser(child, context));
            }
        }
        for (let index = 0; index < element.attributes.length; index++) {
            let elm = element.attributes[index];
            let elementName = elm.name.trim();
            if (elementName !== 'class' && elementName !== 'id')
                if (elm.name === '[value]') {
                    if (element.tagName.toUpperCase() === 'INPUT') {
                        properties["value"] = context[elm.value];
                    } else
                        properties["innerHTML"] = context[elm.value];
                } else if ((/[\[].*?[\]]/ig).test(elementName)) {
                    if (context.hasOwnProperty(elm.value))
                        if (elementName === '[class]')
                            classes.push(context[elm.value]);
                        else
                            properties[elementName.slice(1, -1)] = context[elm.value];
                    else
                        this.logger.error(`'${elm.value}' is not a valid value or not available in the component data`);
                } else if ((/[\(].*?[\)]/ig).test(elementName)) {
                    if (typeof this.options[elm.value] === 'function') {
                        properties[elementName.slice(1, -1)] = this.options[elm.value].bind(context);
                    } else {
                        this.logger.error(`'${elm.value}' is not a valid function or not implemented in the component options`);
                    }
                } else {
                    properties[elementName] = elm.value;
                }
        }
        if (element.id) {
            selector = selector + "#" + element.id;
        }
        if (!element.id) {
            properties['key'] = Math.random().toString();// ++ this.lastKey;
        }
        if (classes[0]) {
            selector = selector + "." + classes.join('.');
        }
        return h(selector, properties, [children.filter(function (c) { return !!c; })]);
    };

} 
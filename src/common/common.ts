import { Global, Configuration } from './global'
import { ILogger, Logger } from './utility/logger'
import { ProjectorFactory, VNode, Projector, ProjectorOptions, h } from './core/core';

export interface UIComponent {
    render(): VNode
}

export class BaseComponent<O> {

    public static Name: string;
    public static Version: string;

    protected logger: ILogger;
    protected element: HTMLElement;
    protected options: O;
    protected projector: Projector
    protected animationSpeed: string;

    private lastKey = 0;
    private readonly configuration: Configuration;

    constructor(name, element: HTMLElement, options: O, projectorOptions?: ProjectorOptions) {
        BaseComponent.Name = name;
        BaseComponent.Version = Global.Version

        this.logger = Logger.getInstance();
        this.projector = ProjectorFactory.createProjector();
        this.animationSpeed = Global.AnimationDuration + 'ms';
        this.configuration = new Configuration();
        this.element = element;
        this.options = options;

    }

    protected guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    protected renderElement() {

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
    }

}

export { ProjectorOptions, VNode, h, hParser } from './core/core'
export { Configuration, Global } from './global';

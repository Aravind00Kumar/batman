import { VNodeProperties, VNodeChild, VNode, H } from './interfaces';


let toTextVNode = (data: any): VNode => {
  return {
    vnodeSelector: '',
    properties: undefined,
    children: undefined,
    text: data.toString(),
    domNode: null
  };
};

let appendChildren = function (parentSelector: string, insertions: any[], main: VNode[]) {
  for (let i = 0, length = insertions.length; i < length; i++) {
    let context = insertions[i];
    if (Array.isArray(context)) {
      appendChildren(parentSelector, context, main);
    } else {
      if (context !== null && context !== undefined) {
        if (!context.hasOwnProperty('vnodeSelector')) {
          context = toTextVNode(context);
        }
        main.push(context);
      }
    }
  }
};

/**
 * The `h` function is used to create a virtual DOM node.
 * This function is largely inspired by the mercuryjs and mithril frameworks.
 * The `h` stands for (virtual) hyperscript.
 *
 * All possible method signatures of this function can be found in the [[H]] 'interface'.
 *
 */
export let h: H;
h = function (selector: string): VNode {
  let properties = arguments[1];
  if (typeof selector !== 'string') {
    throw new Error();
  }
  let childIndex = 1;
  if (properties && !properties.hasOwnProperty('vnodeSelector') && !Array.isArray(properties) && typeof properties === 'object') {
    childIndex = 2;
  } else {
    // Optional properties argument was omitted
    properties = undefined;
  }
  let text: string | undefined;
  let children: VNode[] | undefined;
  let argsLength = arguments.length;
  // Recognize a common special case where there is only a single text node
  if (argsLength === childIndex + 1) {
    let onlyChild = arguments[childIndex];
    if (typeof onlyChild === 'string') {
      text = onlyChild;
    } else if (onlyChild !== undefined && onlyChild !== null && onlyChild.length === 1 && typeof onlyChild[0] === 'string') {
      text = onlyChild[0];
    }
  }
  if (text === undefined) {
    children = [];
    for (; childIndex < argsLength; childIndex++) {
      let child = arguments[childIndex];
      if (child === null || child === undefined) {
      } else if (Array.isArray(child)) {
        appendChildren(selector, child, children);
      } else if (child.hasOwnProperty('vnodeSelector')) {
        children.push(child);
      } else {
        children.push(toTextVNode(child));
      }
    }
  }
  return {
    vnodeSelector: selector,
    properties: properties,
    children: children,
    text: (text === '') ? undefined : text,
    domNode: null
  };
};

/**
 * The `hParser` function is used to create a virtual DOM node.
 * This function parses HTMLElement to virtual DOM node.
 * The `h` stands for (virtual) hyperscript.
 *
 */
export let hParser = function (element: HTMLElement, context: object): VNode {
  if (element.nodeValue) {
    if (element.nodeType !== 3 || element.nodeValue.indexOf("\"") > 0 || element.nodeValue.trim().length === 0) {
      return null;
    }
    return null;//element.nodeValue.trim();
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
      children.push(this.toH(child, context));
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
    properties['key'] = ++this.lastKey;
  }
  if (classes[0]) {
    selector = selector + "." + classes.join('.');
  }
  return h(selector, properties, [children.filter(function (c) { return !!c; })]);
};

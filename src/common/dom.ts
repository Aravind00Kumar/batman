import { Projection, ProjectionOptions, VNode, VNodeProperties, TransitionStrategy } from './interfaces';
import {ProjectionFactory} from './factory';


const NAMESPACE_W3 = 'http://www.w3.org/';
const NAMESPACE_SVG = NAMESPACE_W3 + '2000/svg';
const NAMESPACE_XLINK = NAMESPACE_W3 + '1999/xlink';

// Utilities
/**
 * Contains simple low-level utility functions to manipulate the real DOM.
 */
export class dom {

  private static emptyArray = <VNode[]>[];

  private static extend<T>(base: T, overrides: any): T {
    let result = {} as any;
    Object.keys(base).forEach(function (key) {
      result[key] = (base as any)[key];
    });
    if (overrides) {
      Object.keys(overrides).forEach((key) => {
        result[key] = overrides[key];
      });
    }
    return result;
  };

  private static same(vnode1: VNode, vnode2: VNode) {
    if (vnode1.vnodeSelector !== vnode2.vnodeSelector) {
      return false;
    }
    if (vnode1.properties && vnode2.properties) {
      if (vnode1.properties.key !== vnode2.properties.key) {
        return false;
      }
      return vnode1.properties.bind === vnode2.properties.bind;
    }
    return !vnode1.properties && !vnode2.properties;
  };

  private static nodeAdded(vNode: VNode, transitions: TransitionStrategy) {
    if (vNode.properties) {
      let enterAnimation = vNode.properties.enterAnimation;
      if (enterAnimation) {
        if (typeof enterAnimation === 'function') {
          enterAnimation(vNode.domNode as Element, vNode.properties);
        } else {
          transitions.enter(vNode.domNode as Element, vNode.properties, enterAnimation as string);
        }
      }
    }
  };

  private static nodeToRemove(vNode: VNode, transitions: TransitionStrategy) {
    let domNode: Node = vNode.domNode!;
    if (vNode.properties) {
      let exitAnimation = vNode.properties.exitAnimation;
      if (exitAnimation) {
        (domNode as HTMLElement).style.pointerEvents = 'none';
        let removeDomNode = function () {
          if (domNode.parentNode) {
            domNode.parentNode.removeChild(domNode);
          }
        };
        if (typeof exitAnimation === 'function') {
          exitAnimation(domNode as Element, removeDomNode, vNode.properties);
          return;
        } else {
          transitions.exit(vNode.domNode as Element, vNode.properties, exitAnimation as string, removeDomNode);
          return;
        }
      }
    }
    if (domNode.parentNode) {
      domNode.parentNode.removeChild(domNode);
    }
  };

  private static findIndexOfChild(children: VNode[], sameAs: VNode, start: number) {
    if (sameAs.vnodeSelector !== '') {
      // Never scan for text-nodes
      for (let i = start; i < children.length; i++) {
        if (dom.same(children[i], sameAs)) {
          return i;
        }
      }
    }
    return -1;
  }


  private static checkDistinguishable(childNodes: VNode[], indexToCheck: number, parentVNode: VNode, operation: string) {
    let childNode = childNodes[indexToCheck];
    if (childNode.vnodeSelector === '') {
      return; // Text nodes need not be distinguishable
    }
    let properties = childNode.properties;
    let key = properties ? (properties.key === undefined ? properties.bind : properties.key) : undefined;
    if (!key) { // A key is just assumed to be unique
      for (let i = 0; i < childNodes.length; i++) {
        if (i !== indexToCheck) {
          let node = childNodes[i];
          if (dom.same(node, childNode)) {
            if (operation === 'added') {
              throw new Error(parentVNode.vnodeSelector + ' had a ' + childNode.vnodeSelector + ' child ' +
                'added, but there is now more than one. You must add unique key properties to make them distinguishable.');
            } else {
              throw new Error(parentVNode.vnodeSelector + ' had a ' + childNode.vnodeSelector + ' child ' +
                'removed, but there were more than one. You must add unique key properties to make them distinguishable.');
            }
          }
        }
      }
    }
  }

  private static updateChildren(vnode: VNode, domNode: Node, oldChildren: VNode[] | undefined, newChildren: VNode[] | undefined, projectionOptions: ProjectionOptions) {
    if (oldChildren === newChildren) {
      return false;
    }
    oldChildren = oldChildren || dom.emptyArray;
    newChildren = newChildren || dom.emptyArray;
    let oldChildrenLength = oldChildren.length;
    let newChildrenLength = newChildren.length;
    let transitions = projectionOptions.transitions!;

    let oldIndex = 0;
    let newIndex = 0;
    let i: number;
    let textUpdated = false;
    while (newIndex < newChildrenLength) {
      let oldChild = (oldIndex < oldChildrenLength) ? oldChildren[oldIndex] : undefined;
      let newChild = newChildren[newIndex];
      if (oldChild !== undefined && dom.same(oldChild, newChild)) {
        textUpdated = dom.updateDom(oldChild, newChild, projectionOptions) || textUpdated;
        oldIndex++;
      } else {
        let findOldIndex = dom.findIndexOfChild(oldChildren, newChild, oldIndex + 1);
        if (findOldIndex >= 0) {
          // Remove preceding missing children
          for (i = oldIndex; i < findOldIndex; i++) {
            dom.nodeToRemove(oldChildren[i], transitions);
            dom.checkDistinguishable(oldChildren, i, vnode, 'removed');
          }
          textUpdated = dom.updateDom(oldChildren[findOldIndex], newChild, projectionOptions) || textUpdated;
          oldIndex = findOldIndex + 1;
        } else {
          // New child
          dom.createDom(newChild, domNode, (oldIndex < oldChildrenLength) ? oldChildren[oldIndex].domNode : undefined, projectionOptions);
          dom.nodeAdded(newChild, transitions);
          dom.checkDistinguishable(newChildren, newIndex, vnode, 'added');
        }
      }
      newIndex++;
    }
    if (oldChildrenLength > oldIndex) {
      // Remove child fragments
      for (i = oldIndex; i < oldChildrenLength; i++) {
        dom.nodeToRemove(oldChildren[i], transitions);
        dom.checkDistinguishable(oldChildren, i, vnode, 'removed');
      }
    }
    return textUpdated;
  };


  private static addChildren(domNode: Node, children: VNode[] | undefined, projectionOptions: ProjectionOptions) {
    if (!children) {
      return;
    }
    for (let i = 0; i < children.length; i++) {
      dom.createDom(children[i], domNode, undefined, projectionOptions);
    }
  };

  private static initPropertiesAndChildren(domNode: Node, vnode: VNode, projectionOptions: ProjectionOptions) {
    dom.addChildren(domNode, vnode.children, projectionOptions); // children before properties, needed for value property of <select>.
    if (vnode.text) {
      domNode.textContent = vnode.text;
    }
    dom.setProperties(domNode, vnode.properties, projectionOptions);
    if (vnode.properties && vnode.properties.afterCreate) {
      vnode.properties.afterCreate.apply(vnode.properties.bind || vnode.properties, [domNode as Element, projectionOptions, vnode.vnodeSelector, vnode.properties, vnode.children]);
    }
  };


  private static setProperties(domNode: Node, properties: VNodeProperties | undefined, projectionOptions: ProjectionOptions) {
    if (!properties) {
      return;
    }
    let eventHandlerInterceptor = projectionOptions.eventHandlerInterceptor;
    let propNames = Object.keys(properties);
    let propCount = propNames.length;
    for (let i = 0; i < propCount; i++) {
      let propName = propNames[i];
      /* tslint:disable:no-var-keyword: edge case */
      let propValue = properties[propName];
      /* tslint:enable:no-var-keyword */
      if (propName === 'className') {
        throw new Error('Property "className" is not supported, use "class".');
      } else if (propName === 'class') {
        (propValue as string).split(/\s+/).forEach(token => (domNode as Element).classList.add(token));
      } else if (propName === 'classes') {
        // object with string keys and boolean values
        let classNames = Object.keys(propValue);
        let classNameCount = classNames.length;
        for (let j = 0; j < classNameCount; j++) {
          let className = classNames[j];
          if (propValue[className]) {
            (domNode as Element).classList.add(className);
          }
        }
      } else if (propName === 'styles') {
        // object with string keys and string (!) values
        let styleNames = Object.keys(propValue);
        let styleCount = styleNames.length;
        for (let j = 0; j < styleCount; j++) {
          let styleName = styleNames[j];
          let styleValue = propValue[styleName];
          if (styleValue) {
            dom.checkStyleValue(styleValue);
            projectionOptions.styleApplyer!(<HTMLElement>domNode, styleName, styleValue);
          }
        }
      } else if (propName !== 'key' && propValue !== null && propValue !== undefined) {
        let type = typeof propValue;
        if (type === 'function') {
          if (propName.lastIndexOf('on', 0) === 0) { // lastIndexOf(,0)===0 -> startsWith
            if (eventHandlerInterceptor) {
              propValue = eventHandlerInterceptor(propName, propValue, domNode, properties); // intercept eventhandlers
            }
            if (propName === 'oninput') {
              (function () {
                // record the evt.target.value, because IE and Edge sometimes do a requestAnimationFrame between changing value and running oninput
                let oldPropValue = propValue;
                propValue = function (this: HTMLElement, evt: Event) {
                  oldPropValue.apply(this, [evt]);
                  (evt.target as any)['oninput-value'] = (evt.target as HTMLInputElement).value; // may be HTMLTextAreaElement as well
                };
              }());
            }
            (domNode as any)[propName] = propValue;
          }
        } else if ((type === 'string' || type === 'number') && propName !== 'value' && propName !== 'innerHTML') {
          if (projectionOptions.namespace === NAMESPACE_SVG && propName === 'href') {
            (domNode as Element).setAttributeNS(NAMESPACE_XLINK, propName, propValue);
          } else {
            (domNode as Element).setAttribute(propName, propValue);
          }
        } else {
          (domNode as any)[propName] = propValue;
        }
      }
    }
  }


  private static checkStyleValue(styleValue: Object) {
    if (typeof styleValue !== 'string') {
      throw new Error('Style values must be strings');
    }
  }


  private static updateProperties = function (domNode: Node, previousProperties: VNodeProperties | undefined, properties: VNodeProperties | undefined, projectionOptions: ProjectionOptions) {
    if (!properties) {
      return;
    }
    let propertiesUpdated = false;
    let propNames = Object.keys(properties);
    let propCount = propNames.length;
    for (let i = 0; i < propCount; i++) {
      let propName = propNames[i];
      // assuming that properties will be nullified instead of missing is by design
      let propValue = properties[propName];
      let previousValue = previousProperties![propName];
      if (propName === 'class') {
        if (previousValue !== propValue) {
          throw new Error('"class" property may not be updated. Use the "classes" property for conditional css classes.');
        }
      } else if (propName === 'classes') {
        let classList = (domNode as Element).classList;
        let classNames = Object.keys(propValue);
        let classNameCount = classNames.length;
        for (let j = 0; j < classNameCount; j++) {
          let className = classNames[j];
          let on = !!propValue[className];
          let previousOn = !!previousValue[className];
          if (on === previousOn) {
            continue;
          }
          propertiesUpdated = true;
          if (on) {
            classList.add(className);
          } else {
            classList.remove(className);
          }
        }
      } else if (propName === 'styles') {
        let styleNames = Object.keys(propValue);
        let styleCount = styleNames.length;
        for (let j = 0; j < styleCount; j++) {
          let styleName = styleNames[j];
          let newStyleValue = propValue[styleName];
          let oldStyleValue = previousValue[styleName];
          if (newStyleValue === oldStyleValue) {
            continue;
          }
          propertiesUpdated = true;
          if (newStyleValue) {
            dom.checkStyleValue(newStyleValue);
            projectionOptions.styleApplyer!(domNode as HTMLElement, styleName, newStyleValue);
          } else {
            projectionOptions.styleApplyer!(domNode as HTMLElement, styleName, '');
          }
        }
      } else {
        if (!propValue && typeof previousValue === 'string') {
          propValue = '';
        }
        if (propName === 'value') { // value can be manipulated by the user directly and using event.preventDefault() is not an option
          let domValue = (domNode as any)[propName];
          if ( // The edge cases are described in the tests
            domValue !== propValue // The 'value' in the DOM tree !== newValue
            && ((domNode as any)['oninput-value']
              ? domValue === (domNode as any)['oninput-value'] // If the last reported value to 'oninput' does not match domValue, do nothing and wait for oninput
              : propValue !== previousValue // Only update the value if the vdom changed
            )
          ) {
            (domNode as any)[propName] = propValue; // Reset the value, even if the virtual DOM did not change
            (domNode as any)['oninput-value'] = undefined;
          } // else do not update the domNode, otherwise the cursor position would be changed
          if (propValue !== previousValue) {
            propertiesUpdated = true;
          }
        } else if (propValue !== previousValue) {
          let type = typeof propValue;
          if (type === 'function') {
            return;
            // throw new Error('Functions may not be updated on subsequent renders (property: ' + propName +
            //   '). Hint: declare event handler functions outside the render() function.');
          }
          if (type === 'string' && propName !== 'innerHTML') {
            if (projectionOptions.namespace === NAMESPACE_SVG && propName === 'href') {
              (domNode as Element).setAttributeNS(NAMESPACE_XLINK, propName, propValue);
            } else if (propName === 'role' && propValue === '') {
              (domNode as any).removeAttribute(propName);
            } else {
              (domNode as Element).setAttribute(propName, propValue);
            }
          } else {
            if ((domNode as any)[propName] !== propValue) { // Comparison is here for side-effects in Edge with scrollLeft and scrollTop
              (domNode as any)[propName] = propValue;
            }
          }
          propertiesUpdated = true;
        }
      }
    }
    return propertiesUpdated;
  }

  private static missingTransition() {
    throw new Error('Provide a transitions object to the projectionOptions to do animations');
  }


  private static DEFAULT_PROJECTION_OPTIONS: ProjectionOptions = {
    namespace: undefined,
    eventHandlerInterceptor: undefined,
    styleApplyer: function (domNode: HTMLElement, styleName: string, value: string) {
      // Provides a hook to add vendor prefixes for browsers that still need it.
      (domNode.style as any)[styleName] = value;
    },
    transitions: {
      enter: dom.missingTransition,
      exit: dom.missingTransition
    }
  };

  private static applyDefaultProjectionOptions = (projectorOptions?: ProjectionOptions) => {
    return dom.extend(dom.DEFAULT_PROJECTION_OPTIONS, projectorOptions);
  }


  /**
   * Creates a real DOM tree from `vnode`. The [[Projection]] object returned will contain the resulting DOM Node in
   * its [[Projection.domNode|domNode]] property.
   * This is a low-level method. Users will typically use a [[Projector]] instead.
   * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
   * objects may only be rendered once.
   * @param projectionOptions - Options to be used to create and update the projection.
   * @returns The [[Projection]] which also contains the DOM Node that was created.
   */
  public static create(vnode: VNode, projectionOptions?: ProjectionOptions): Projection {
    projectionOptions = dom.applyDefaultProjectionOptions(projectionOptions);
    dom.createDom(vnode, document.createElement('div'), undefined, projectionOptions);
    return ProjectionFactory.createProjection(vnode, projectionOptions);
  }

  /**
   * Appends a new child node to the DOM which is generated from a [[VNode]].
   * This is a low-level method. Users will typically use a [[Projector]] instead.
   * @param parentNode - The parent node for the new child node.
   * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
   * objects may only be rendered once.
   * @param projectionOptions - Options to be used to create and update the [[Projection]].
   * @returns The [[Projection]] that was created.
   */
  public static append(parentNode: Element, vnode: VNode, projectionOptions?: ProjectionOptions): Projection {
    projectionOptions = dom.applyDefaultProjectionOptions(projectionOptions);
    dom.createDom(vnode, parentNode, undefined, projectionOptions);
    return ProjectionFactory.createProjection(vnode, projectionOptions);
  }

  /**
   * Inserts a new DOM node which is generated from a [[VNode]].
   * This is a low-level method. Users wil typically use a [[Projector]] instead.
   * @param beforeNode - The node that the DOM Node is inserted before.
   * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function.
   * NOTE: [[VNode]] objects may only be rendered once.
   * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
   * @returns The [[Projection]] that was created.
   */
  public static insertBefore(beforeNode: Element, vnode: VNode, projectionOptions?: ProjectionOptions): Projection {
    projectionOptions = dom.applyDefaultProjectionOptions(projectionOptions);
    dom.createDom(vnode, beforeNode.parentNode!, beforeNode, projectionOptions);
    return ProjectionFactory.createProjection(vnode, projectionOptions);
  }

  /**
   * Merges a new DOM node which is generated from a [[VNode]] with an existing DOM Node.
   * This means that the virtual DOM and the real DOM will have one overlapping element.
   * Therefore the selector for the root [[VNode]] will be ignored, but its properties and children will be applied to the Element provided.
   * This is a low-level method. Users wil typically use a [[Projector]] instead.
   * @param element - The existing element to adopt as the root of the new virtual DOM. Existing attributes and child nodes are preserved.
   * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]] objects
   * may only be rendered once.
   * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
   * @returns The [[Projection]] that was created.
   */
  public static merge(element: Element, vnode: VNode, projectionOptions?: ProjectionOptions): Projection {
    projectionOptions = dom.applyDefaultProjectionOptions(projectionOptions);
    vnode.domNode = element;
    dom.initPropertiesAndChildren(element, vnode, projectionOptions);
    return ProjectionFactory.createProjection(vnode, projectionOptions);
  }

  /**
   * Replaces an existing DOM node with a node generated from a [[VNode]].
   * This is a low-level method. Users will typically use a [[Projector]] instead.
   * @param element - The node for the [[VNode]] to replace.
   * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
   * objects may only be rendered once.
   * @param projectionOptions - Options to be used to create and update the [[Projection]].
   * @returns The [[Projection]] that was created.
   */
  public static replace(element: Element, vnode: VNode, projectionOptions?: ProjectionOptions): Projection {
    projectionOptions = dom.applyDefaultProjectionOptions(projectionOptions);
    dom.createDom(vnode, element.parentNode!, element, projectionOptions);
    element.parentNode!.removeChild(element);
    return ProjectionFactory.createProjection(vnode, projectionOptions);
  }

  public static createDom(vnode: VNode, parentNode: Node, insertBefore: Node | null | undefined, projectionOptions: ProjectionOptions) {
    let domNode: Node | undefined, i: number, c: string, start = 0, type: string, found: string;
    let vnodeSelector = vnode.vnodeSelector;
    let doc = parentNode.ownerDocument;
    if (vnodeSelector === '') {
      domNode = vnode.domNode = doc.createTextNode(vnode.text!);
      if (insertBefore !== undefined) {
        parentNode.insertBefore(domNode, insertBefore);
      } else {
        parentNode.appendChild(domNode);
      }
    } else {
      for (i = 0; i <= vnodeSelector.length; ++i) {
        c = vnodeSelector.charAt(i);
        if (i === vnodeSelector.length || c === '.' || c === '#') {
          type = vnodeSelector.charAt(start - 1);
          found = vnodeSelector.slice(start, i);
          if (type === '.') {
            (domNode as HTMLElement).classList.add(found);
          } else if (type === '#') {
            (domNode as Element).id = found;
          } else {
            if (found === 'svg') {
              projectionOptions = dom.extend(projectionOptions, { namespace: NAMESPACE_SVG });
            }
            if (projectionOptions.namespace !== undefined) {
              domNode = vnode.domNode = doc.createElementNS(projectionOptions.namespace, found);
            } else {
              domNode = vnode.domNode = (vnode.domNode || doc.createElement(found));
              if (found === 'input' && vnode.properties && vnode.properties.type !== undefined) {
                // IE8 and older don't support setting input type after the DOM Node has been added to the document
                (domNode as Element).setAttribute("type", vnode.properties.type);
              }
            }
            if (insertBefore !== undefined) {
              parentNode.insertBefore(domNode, insertBefore);
            } else if (domNode.parentNode !== parentNode) {
              parentNode.appendChild(domNode);
            }
          }
          start = i + 1;
        }
      }
      dom.initPropertiesAndChildren(domNode!, vnode, projectionOptions);
    }
  }

  public static updateDom(previous: VNode, vnode: VNode, projectionOptions: ProjectionOptions) {
    let domNode = previous.domNode!;
    let textUpdated = false;
    if (previous === vnode) {
      return false; // By contract, VNode objects may not be modified anymore after passing them to core
    }
    let updated = false;
    if (vnode.vnodeSelector === '') {
      if (vnode.text !== previous.text) {
        let newVNode = domNode.ownerDocument.createTextNode(vnode.text!);
        domNode.parentNode!.replaceChild(newVNode, domNode);
        vnode.domNode = newVNode;
        textUpdated = true;
        return textUpdated;
      }
    } else {
      if (vnode.vnodeSelector.lastIndexOf('svg', 0) === 0) { // lastIndexOf(needle,0)===0 means StartsWith
        projectionOptions = dom.extend(projectionOptions, { namespace: NAMESPACE_SVG });
      }
      if (previous.text !== vnode.text) {
        updated = true;
        if (vnode.text === undefined) {
          domNode.removeChild(domNode.firstChild!); // the only textnode presumably
        } else {
          domNode.textContent = vnode.text;
        }
      }
      updated = dom.updateChildren(vnode, domNode, previous.children, vnode.children, projectionOptions) || updated;
      updated = dom.updateProperties(domNode, previous.properties, vnode.properties, projectionOptions) || updated;
      if (vnode.properties && vnode.properties.afterUpdate) {
        vnode.properties.afterUpdate.apply(vnode.properties.bind || vnode.properties, [<Element>domNode, projectionOptions, vnode.vnodeSelector, vnode.properties, vnode.children]);
      }
    }
    if (updated && vnode.properties && vnode.properties.updateAnimation) {
      vnode.properties.updateAnimation(<Element>domNode, vnode.properties, previous.properties);
    }
    vnode.domNode = previous.domNode;
    return textUpdated;
  }


};





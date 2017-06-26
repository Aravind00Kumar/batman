var Batman =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return h; });
/* unused harmony export dom */
/* unused harmony export createCache */
/* unused harmony export createMapping */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createProjector; });
// Comment that is displayed in the API documentation for the maquette module:
/**
 * Welcome to the API documentation of the **maquette** library.
 *
 * [[http://maquettejs.org/|To the maquette homepage]]
 */
var NAMESPACE_W3 = 'http://www.w3.org/';
var NAMESPACE_SVG = NAMESPACE_W3 + '2000/svg';
var NAMESPACE_XLINK = NAMESPACE_W3 + '1999/xlink';
// Utilities
var emptyArray = [];
var extend = function (base, overrides) {
    var result = {};
    Object.keys(base).forEach(function (key) {
        result[key] = base[key];
    });
    if (overrides) {
        Object.keys(overrides).forEach(function (key) {
            result[key] = overrides[key];
        });
    }
    return result;
};
// Hyperscript helper functions
var same = function (vnode1, vnode2) {
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
var toTextVNode = function (data) {
    return {
        vnodeSelector: '',
        properties: undefined,
        children: undefined,
        text: data.toString(),
        domNode: null
    };
};
var appendChildren = function (parentSelector, insertions, main) {
    for (var i = 0, length_1 = insertions.length; i < length_1; i++) {
        var item = insertions[i];
        if (Array.isArray(item)) {
            appendChildren(parentSelector, item, main);
        }
        else {
            if (item !== null && item !== undefined) {
                if (!item.hasOwnProperty('vnodeSelector')) {
                    item = toTextVNode(item);
                }
                main.push(item);
            }
        }
    }
};
// Render helper functions
var missingTransition = function () {
    throw new Error('Provide a transitions object to the projectionOptions to do animations');
};
var DEFAULT_PROJECTION_OPTIONS = {
    namespace: undefined,
    eventHandlerInterceptor: undefined,
    styleApplyer: function (domNode, styleName, value) {
        // Provides a hook to add vendor prefixes for browsers that still need it.
        domNode.style[styleName] = value;
    },
    transitions: {
        enter: missingTransition,
        exit: missingTransition
    }
};
var applyDefaultProjectionOptions = function (projectorOptions) {
    return extend(DEFAULT_PROJECTION_OPTIONS, projectorOptions);
};
var checkStyleValue = function (styleValue) {
    if (typeof styleValue !== 'string') {
        throw new Error('Style values must be strings');
    }
};
var setProperties = function (domNode, properties, projectionOptions) {
    if (!properties) {
        return;
    }
    var eventHandlerInterceptor = projectionOptions.eventHandlerInterceptor;
    var propNames = Object.keys(properties);
    var propCount = propNames.length;
    var _loop_1 = function (i) {
        var propName = propNames[i];
        /* tslint:disable:no-var-keyword: edge case */
        var propValue = properties[propName];
        /* tslint:enable:no-var-keyword */
        if (propName === 'className') {
            throw new Error('Property "className" is not supported, use "class".');
        }
        else if (propName === 'class') {
            propValue.split(/\s+/).forEach(function (token) { return domNode.classList.add(token); });
        }
        else if (propName === 'classes') {
            // object with string keys and boolean values
            var classNames = Object.keys(propValue);
            var classNameCount = classNames.length;
            for (var j = 0; j < classNameCount; j++) {
                var className = classNames[j];
                if (propValue[className]) {
                    domNode.classList.add(className);
                }
            }
        }
        else if (propName === 'styles') {
            // object with string keys and string (!) values
            var styleNames = Object.keys(propValue);
            var styleCount = styleNames.length;
            for (var j = 0; j < styleCount; j++) {
                var styleName = styleNames[j];
                var styleValue = propValue[styleName];
                if (styleValue) {
                    checkStyleValue(styleValue);
                    projectionOptions.styleApplyer(domNode, styleName, styleValue);
                }
            }
        }
        else if (propName !== 'key' && propValue !== null && propValue !== undefined) {
            var type = typeof propValue;
            if (type === 'function') {
                if (propName.lastIndexOf('on', 0) === 0) {
                    if (eventHandlerInterceptor) {
                        propValue = eventHandlerInterceptor(propName, propValue, domNode, properties); // intercept eventhandlers
                    }
                    if (propName === 'oninput') {
                        (function () {
                            // record the evt.target.value, because IE and Edge sometimes do a requestAnimationFrame between changing value and running oninput
                            var oldPropValue = propValue;
                            propValue = function (evt) {
                                evt.target['oninput-value'] = evt.target.value; // may be HTMLTextAreaElement as well
                                oldPropValue.apply(this, [evt]);
                            };
                        }());
                    }
                    domNode[propName] = propValue;
                }
            }
            else if ((type === 'string' || type === 'number') && propName !== 'value' && propName !== 'innerHTML') {
                if (projectionOptions.namespace === NAMESPACE_SVG && propName === 'href') {
                    domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
                }
                else {
                    domNode.setAttribute(propName, propValue);
                }
            }
            else {
                domNode[propName] = propValue;
            }
        }
    };
    for (var i = 0; i < propCount; i++) {
        _loop_1(i);
    }
};
var updateProperties = function (domNode, previousProperties, properties, projectionOptions) {
    if (!properties) {
        return;
    }
    var propertiesUpdated = false;
    var propNames = Object.keys(properties);
    var propCount = propNames.length;
    for (var i = 0; i < propCount; i++) {
        var propName = propNames[i];
        // assuming that properties will be nullified instead of missing is by design
        var propValue = properties[propName];
        var previousValue = previousProperties[propName];
        if (propName === 'class') {
            if (previousValue !== propValue) {
                throw new Error('"class" property may not be updated. Use the "classes" property for conditional css classes.');
            }
        }
        else if (propName === 'classes') {
            var classList = domNode.classList;
            var classNames = Object.keys(propValue);
            var classNameCount = classNames.length;
            for (var j = 0; j < classNameCount; j++) {
                var className = classNames[j];
                var on = !!propValue[className];
                var previousOn = !!previousValue[className];
                if (on === previousOn) {
                    continue;
                }
                propertiesUpdated = true;
                if (on) {
                    classList.add(className);
                }
                else {
                    classList.remove(className);
                }
            }
        }
        else if (propName === 'styles') {
            var styleNames = Object.keys(propValue);
            var styleCount = styleNames.length;
            for (var j = 0; j < styleCount; j++) {
                var styleName = styleNames[j];
                var newStyleValue = propValue[styleName];
                var oldStyleValue = previousValue[styleName];
                if (newStyleValue === oldStyleValue) {
                    continue;
                }
                propertiesUpdated = true;
                if (newStyleValue) {
                    checkStyleValue(newStyleValue);
                    projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
                }
                else {
                    projectionOptions.styleApplyer(domNode, styleName, '');
                }
            }
        }
        else {
            if (!propValue && typeof previousValue === 'string') {
                propValue = '';
            }
            if (propName === 'value') {
                var domValue = domNode[propName];
                if (domValue !== propValue // The 'value' in the DOM tree !== newValue
                    && (domNode['oninput-value']
                        ? domValue === domNode['oninput-value'] // If the last reported value to 'oninput' does not match domValue, do nothing and wait for oninput
                        : propValue !== previousValue // Only update the value if the vdom changed
                    )) {
                    domNode[propName] = propValue; // Reset the value, even if the virtual DOM did not change
                    domNode['oninput-value'] = undefined;
                } // else do not update the domNode, otherwise the cursor position would be changed
                if (propValue !== previousValue) {
                    propertiesUpdated = true;
                }
            }
            else if (propValue !== previousValue) {
                var type = typeof propValue;
                if (type === 'function') {
                    return;
                    // throw new Error('Functions may not be updated on subsequent renders (property: ' + propName +
                    //   '). Hint: declare event handler functions outside the render() function.');
                }
                if (type === 'string' && propName !== 'innerHTML') {
                    if (projectionOptions.namespace === NAMESPACE_SVG && propName === 'href') {
                        domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
                    }
                    else if (propName === 'role' && propValue === '') {
                        domNode.removeAttribute(propName);
                    }
                    else {
                        domNode.setAttribute(propName, propValue);
                    }
                }
                else {
                    if (domNode[propName] !== propValue) {
                        domNode[propName] = propValue;
                    }
                }
                propertiesUpdated = true;
            }
        }
    }
    return propertiesUpdated;
};
var findIndexOfChild = function (children, sameAs, start) {
    if (sameAs.vnodeSelector !== '') {
        // Never scan for text-nodes
        for (var i = start; i < children.length; i++) {
            if (same(children[i], sameAs)) {
                return i;
            }
        }
    }
    return -1;
};
var nodeAdded = function (vNode, transitions) {
    if (vNode.properties) {
        var enterAnimation = vNode.properties.enterAnimation;
        if (enterAnimation) {
            if (typeof enterAnimation === 'function') {
                enterAnimation(vNode.domNode, vNode.properties);
            }
            else {
                transitions.enter(vNode.domNode, vNode.properties, enterAnimation);
            }
        }
    }
};
var nodeToRemove = function (vNode, transitions) {
    var domNode = vNode.domNode;
    if (vNode.properties) {
        var exitAnimation = vNode.properties.exitAnimation;
        if (exitAnimation) {
            domNode.style.pointerEvents = 'none';
            var removeDomNode = function () {
                if (domNode.parentNode) {
                    domNode.parentNode.removeChild(domNode);
                }
            };
            if (typeof exitAnimation === 'function') {
                exitAnimation(domNode, removeDomNode, vNode.properties);
                return;
            }
            else {
                transitions.exit(vNode.domNode, vNode.properties, exitAnimation, removeDomNode);
                return;
            }
        }
    }
    if (domNode.parentNode) {
        domNode.parentNode.removeChild(domNode);
    }
};
var checkDistinguishable = function (childNodes, indexToCheck, parentVNode, operation) {
    var childNode = childNodes[indexToCheck];
    if (childNode.vnodeSelector === '') {
        return; // Text nodes need not be distinguishable
    }
    var properties = childNode.properties;
    var key = properties ? (properties.key === undefined ? properties.bind : properties.key) : undefined;
    if (!key) {
        for (var i = 0; i < childNodes.length; i++) {
            if (i !== indexToCheck) {
                var node = childNodes[i];
                if (same(node, childNode)) {
                    if (operation === 'added') {
                        throw new Error(parentVNode.vnodeSelector + ' had a ' + childNode.vnodeSelector + ' child ' +
                            'added, but there is now more than one. You must add unique key properties to make them distinguishable.');
                    }
                    else {
                        throw new Error(parentVNode.vnodeSelector + ' had a ' + childNode.vnodeSelector + ' child ' +
                            'removed, but there were more than one. You must add unique key properties to make them distinguishable.');
                    }
                }
            }
        }
    }
};
var createDom;
var updateDom;
var updateChildren = function (vnode, domNode, oldChildren, newChildren, projectionOptions) {
    if (oldChildren === newChildren) {
        return false;
    }
    oldChildren = oldChildren || emptyArray;
    newChildren = newChildren || emptyArray;
    var oldChildrenLength = oldChildren.length;
    var newChildrenLength = newChildren.length;
    var transitions = projectionOptions.transitions;
    var oldIndex = 0;
    var newIndex = 0;
    var i;
    var textUpdated = false;
    while (newIndex < newChildrenLength) {
        var oldChild = (oldIndex < oldChildrenLength) ? oldChildren[oldIndex] : undefined;
        var newChild = newChildren[newIndex];
        if (oldChild !== undefined && same(oldChild, newChild)) {
            textUpdated = updateDom(oldChild, newChild, projectionOptions) || textUpdated;
            oldIndex++;
        }
        else {
            var findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
            if (findOldIndex >= 0) {
                // Remove preceding missing children
                for (i = oldIndex; i < findOldIndex; i++) {
                    nodeToRemove(oldChildren[i], transitions);
                    checkDistinguishable(oldChildren, i, vnode, 'removed');
                }
                textUpdated = updateDom(oldChildren[findOldIndex], newChild, projectionOptions) || textUpdated;
                oldIndex = findOldIndex + 1;
            }
            else {
                // New child
                createDom(newChild, domNode, (oldIndex < oldChildrenLength) ? oldChildren[oldIndex].domNode : undefined, projectionOptions);
                nodeAdded(newChild, transitions);
                checkDistinguishable(newChildren, newIndex, vnode, 'added');
            }
        }
        newIndex++;
    }
    if (oldChildrenLength > oldIndex) {
        // Remove child fragments
        for (i = oldIndex; i < oldChildrenLength; i++) {
            nodeToRemove(oldChildren[i], transitions);
            checkDistinguishable(oldChildren, i, vnode, 'removed');
        }
    }
    return textUpdated;
};
var addChildren = function (domNode, children, projectionOptions) {
    if (!children) {
        return;
    }
    for (var i = 0; i < children.length; i++) {
        createDom(children[i], domNode, undefined, projectionOptions);
    }
};
var initPropertiesAndChildren = function (domNode, vnode, projectionOptions) {
    addChildren(domNode, vnode.children, projectionOptions); // children before properties, needed for value property of <select>.
    if (vnode.text) {
        domNode.textContent = vnode.text;
    }
    setProperties(domNode, vnode.properties, projectionOptions);
    if (vnode.properties && vnode.properties.afterCreate) {
        vnode.properties.afterCreate.apply(vnode.properties.bind || vnode.properties, [domNode, projectionOptions, vnode.vnodeSelector, vnode.properties, vnode.children]);
    }
};
createDom = function (vnode, parentNode, insertBefore, projectionOptions) {
    var domNode, i, c, start = 0, type, found;
    var vnodeSelector = vnode.vnodeSelector;
    var doc = parentNode.ownerDocument;
    if (vnodeSelector === '') {
        domNode = vnode.domNode = doc.createTextNode(vnode.text);
        if (insertBefore !== undefined) {
            parentNode.insertBefore(domNode, insertBefore);
        }
        else {
            parentNode.appendChild(domNode);
        }
    }
    else {
        for (i = 0; i <= vnodeSelector.length; ++i) {
            c = vnodeSelector.charAt(i);
            if (i === vnodeSelector.length || c === '.' || c === '#') {
                type = vnodeSelector.charAt(start - 1);
                found = vnodeSelector.slice(start, i);
                if (type === '.') {
                    domNode.classList.add(found);
                }
                else if (type === '#') {
                    domNode.id = found;
                }
                else {
                    if (found === 'svg') {
                        projectionOptions = extend(projectionOptions, { namespace: NAMESPACE_SVG });
                    }
                    if (projectionOptions.namespace !== undefined) {
                        domNode = vnode.domNode = doc.createElementNS(projectionOptions.namespace, found);
                    }
                    else {
                        domNode = vnode.domNode = (vnode.domNode || doc.createElement(found));
                        if (found === 'input' && vnode.properties && vnode.properties.type !== undefined) {
                            // IE8 and older don't support setting input type after the DOM Node has been added to the document
                            domNode.setAttribute("type", vnode.properties.type);
                        }
                    }
                    if (insertBefore !== undefined) {
                        parentNode.insertBefore(domNode, insertBefore);
                    }
                    else if (domNode.parentNode !== parentNode) {
                        parentNode.appendChild(domNode);
                    }
                }
                start = i + 1;
            }
        }
        initPropertiesAndChildren(domNode, vnode, projectionOptions);
    }
};
updateDom = function (previous, vnode, projectionOptions) {
    var domNode = previous.domNode;
    var textUpdated = false;
    if (previous === vnode) {
        return false; // By contract, VNode objects may not be modified anymore after passing them to maquette
    }
    var updated = false;
    if (vnode.vnodeSelector === '') {
        if (vnode.text !== previous.text) {
            var newVNode = domNode.ownerDocument.createTextNode(vnode.text);
            domNode.parentNode.replaceChild(newVNode, domNode);
            vnode.domNode = newVNode;
            textUpdated = true;
            return textUpdated;
        }
    }
    else {
        if (vnode.vnodeSelector.lastIndexOf('svg', 0) === 0) {
            projectionOptions = extend(projectionOptions, { namespace: NAMESPACE_SVG });
        }
        if (previous.text !== vnode.text) {
            updated = true;
            if (vnode.text === undefined) {
                domNode.removeChild(domNode.firstChild); // the only textnode presumably
            }
            else {
                domNode.textContent = vnode.text;
            }
        }
        updated = updateChildren(vnode, domNode, previous.children, vnode.children, projectionOptions) || updated;
        updated = updateProperties(domNode, previous.properties, vnode.properties, projectionOptions) || updated;
        if (vnode.properties && vnode.properties.afterUpdate) {
            vnode.properties.afterUpdate.apply(vnode.properties.bind || vnode.properties, [domNode, projectionOptions, vnode.vnodeSelector, vnode.properties, vnode.children]);
        }
    }
    if (updated && vnode.properties && vnode.properties.updateAnimation) {
        vnode.properties.updateAnimation(domNode, vnode.properties, previous.properties);
    }
    vnode.domNode = previous.domNode;
    return textUpdated;
};
var createProjection = function (vnode, projectionOptions) {
    return {
        update: function (updatedVnode) {
            if (vnode.vnodeSelector !== updatedVnode.vnodeSelector) {
                throw new Error('The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)');
            }
            updateDom(vnode, updatedVnode, projectionOptions);
            vnode = updatedVnode;
        },
        domNode: vnode.domNode
    };
};
/**
 * The `h` function is used to create a virtual DOM node.
 * This function is largely inspired by the mercuryjs and mithril frameworks.
 * The `h` stands for (virtual) hyperscript.
 *
 * All possible method signatures of this function can be found in the [[H]] 'interface'.
 *
 * NOTE: There are {@link http://maquettejs.org/docs/rules.html|three basic rules} you should be aware of when updating the virtual DOM.
 */
var h;
// The other two parameters are not added here, because the Typescript compiler creates surrogate code for destructuring 'children'.
h = function (selector) {
    var properties = arguments[1];
    if (typeof selector !== 'string') {
        throw new Error();
    }
    var childIndex = 1;
    if (properties && !properties.hasOwnProperty('vnodeSelector') && !Array.isArray(properties) && typeof properties === 'object') {
        childIndex = 2;
    }
    else {
        // Optional properties argument was omitted
        properties = undefined;
    }
    var text;
    var children;
    var argsLength = arguments.length;
    // Recognize a common special case where there is only a single text node
    if (argsLength === childIndex + 1) {
        var onlyChild = arguments[childIndex];
        if (typeof onlyChild === 'string') {
            text = onlyChild;
        }
        else if (onlyChild !== undefined && onlyChild !== null && onlyChild.length === 1 && typeof onlyChild[0] === 'string') {
            text = onlyChild[0];
        }
    }
    if (text === undefined) {
        children = [];
        for (; childIndex < argsLength; childIndex++) {
            var child = arguments[childIndex];
            if (child === null || child === undefined) {
            }
            else if (Array.isArray(child)) {
                appendChildren(selector, child, children);
            }
            else if (child.hasOwnProperty('vnodeSelector')) {
                children.push(child);
            }
            else {
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
 * Contains simple low-level utility functions to manipulate the real DOM.
 */
var dom = {
    /**
     * Creates a real DOM tree from `vnode`. The [[Projection]] object returned will contain the resulting DOM Node in
     * its [[Projection.domNode|domNode]] property.
     * This is a low-level method. Users will typically use a [[Projector]] instead.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection.
     * @returns The [[Projection]] which also contains the DOM Node that was created.
     */
    create: function (vnode, projectionOptions) {
        projectionOptions = applyDefaultProjectionOptions(projectionOptions);
        createDom(vnode, document.createElement('div'), undefined, projectionOptions);
        return createProjection(vnode, projectionOptions);
    },
    /**
     * Appends a new child node to the DOM which is generated from a [[VNode]].
     * This is a low-level method. Users will typically use a [[Projector]] instead.
     * @param parentNode - The parent node for the new child node.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the [[Projection]].
     * @returns The [[Projection]] that was created.
     */
    append: function (parentNode, vnode, projectionOptions) {
        projectionOptions = applyDefaultProjectionOptions(projectionOptions);
        createDom(vnode, parentNode, undefined, projectionOptions);
        return createProjection(vnode, projectionOptions);
    },
    /**
     * Inserts a new DOM node which is generated from a [[VNode]].
     * This is a low-level method. Users wil typically use a [[Projector]] instead.
     * @param beforeNode - The node that the DOM Node is inserted before.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function.
     * NOTE: [[VNode]] objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
     * @returns The [[Projection]] that was created.
     */
    insertBefore: function (beforeNode, vnode, projectionOptions) {
        projectionOptions = applyDefaultProjectionOptions(projectionOptions);
        createDom(vnode, beforeNode.parentNode, beforeNode, projectionOptions);
        return createProjection(vnode, projectionOptions);
    },
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
    merge: function (element, vnode, projectionOptions) {
        projectionOptions = applyDefaultProjectionOptions(projectionOptions);
        vnode.domNode = element;
        initPropertiesAndChildren(element, vnode, projectionOptions);
        return createProjection(vnode, projectionOptions);
    },
    /**
     * Replaces an existing DOM node with a node generated from a [[VNode]].
     * This is a low-level method. Users will typically use a [[Projector]] instead.
     * @param element - The node for the [[VNode]] to replace.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the [[Projection]].
     * @returns The [[Projection]] that was created.
     */
    replace: function (element, vnode, projectionOptions) {
        projectionOptions = applyDefaultProjectionOptions(projectionOptions);
        createDom(vnode, element.parentNode, element, projectionOptions);
        element.parentNode.removeChild(element);
        return createProjection(vnode, projectionOptions);
    }
};
/**
 * Creates a [[CalculationCache]] object, useful for caching [[VNode]] trees.
 * In practice, caching of [[VNode]] trees is not needed, because achieving 60 frames per second is almost never a problem.
 * For more information, see [[CalculationCache]].
 *
 * @param <Result> The type of the value that is cached.
 */
var createCache = function () {
    var cachedInputs;
    var cachedOutcome;
    return {
        invalidate: function () {
            cachedOutcome = undefined;
            cachedInputs = undefined;
        },
        result: function (inputs, calculation) {
            if (cachedInputs) {
                for (var i = 0; i < inputs.length; i++) {
                    if (cachedInputs[i] !== inputs[i]) {
                        cachedOutcome = undefined;
                    }
                }
            }
            if (!cachedOutcome) {
                cachedOutcome = calculation();
                cachedInputs = inputs;
            }
            return cachedOutcome;
        }
    };
};
/**
 * Creates a {@link Mapping} instance that keeps an array of result objects synchronized with an array of source objects.
 * See {@link http://maquettejs.org/docs/arrays.html|Working with arrays}.
 *
 * @param <Source>       The type of source items. A database-record for instance.
 * @param <Target>       The type of target items. A [[Component]] for instance.
 * @param getSourceKey   `function(source)` that must return a key to identify each source object. The result must either be a string or a number.
 * @param createResult   `function(source, index)` that must create a new result object from a given source. This function is identical
 *                       to the `callback` argument in `Array.map(callback)`.
 * @param updateResult   `function(source, target, index)` that updates a result to an updated source.
 */
var createMapping = function (getSourceKey, createResult, updateResult) {
    var keys = [];
    var results = [];
    return {
        results: results,
        map: function (newSources) {
            var newKeys = newSources.map(getSourceKey);
            var oldTargets = results.slice();
            var oldIndex = 0;
            for (var i = 0; i < newSources.length; i++) {
                var source = newSources[i];
                var sourceKey = newKeys[i];
                if (sourceKey === keys[oldIndex]) {
                    results[i] = oldTargets[oldIndex];
                    updateResult(source, oldTargets[oldIndex], i);
                    oldIndex++;
                }
                else {
                    var found = false;
                    for (var j = 1; j < keys.length + 1; j++) {
                        var searchIndex = (oldIndex + j) % keys.length;
                        if (keys[searchIndex] === sourceKey) {
                            results[i] = oldTargets[searchIndex];
                            updateResult(newSources[i], oldTargets[searchIndex], i);
                            oldIndex = searchIndex + 1;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        results[i] = createResult(source, i);
                    }
                }
            }
            results.length = newSources.length;
            keys = newKeys;
        }
    };
};
/**
 * Creates a [[Projector]] instance using the provided projectionOptions.
 *
 * For more information, see [[Projector]].
 *
 * @param projectorOptions   Options that influence how the DOM is rendered and updated.
 */
var createProjector = function (projectorOptions) {
    var projector;
    var projectionOptions = applyDefaultProjectionOptions(projectorOptions);
    projectionOptions.eventHandlerInterceptor = function (propertyName, eventHandler, domNode, properties) {
        return function () {
            // intercept function calls (event handlers) to do a render afterwards.
            projector.scheduleRender();
            return eventHandler.apply(properties.bind || this, arguments);
        };
    };
    var renderCompleted = true;
    var scheduled;
    var stopped = false;
    var projections = [];
    var renderFunctions = []; // matches the projections array
    var doRender = function () {
        scheduled = undefined;
        if (!renderCompleted) {
            return; // The last render threw an error, it should be logged in the browser console.
        }
        renderCompleted = false;
        for (var i = 0; i < projections.length; i++) {
            var updatedVnode = renderFunctions[i]();
            projections[i].update(updatedVnode);
        }
        renderCompleted = true;
    };
    projector = {
        renderNow: doRender,
        scheduleRender: function () {
            if (!scheduled && !stopped) {
                scheduled = requestAnimationFrame(doRender);
            }
        },
        stop: function () {
            if (scheduled) {
                cancelAnimationFrame(scheduled);
                scheduled = undefined;
            }
            stopped = true;
        },
        resume: function () {
            stopped = false;
            renderCompleted = true;
            projector.scheduleRender();
        },
        append: function (parentNode, renderMaquetteFunction) {
            projections.push(dom.append(parentNode, renderMaquetteFunction(), projectionOptions));
            renderFunctions.push(renderMaquetteFunction);
        },
        insertBefore: function (beforeNode, renderMaquetteFunction) {
            projections.push(dom.insertBefore(beforeNode, renderMaquetteFunction(), projectionOptions));
            renderFunctions.push(renderMaquetteFunction);
        },
        merge: function (domNode, renderMaquetteFunction) {
            projections.push(dom.merge(domNode, renderMaquetteFunction(), projectionOptions));
            renderFunctions.push(renderMaquetteFunction);
        },
        replace: function (domNode, renderMaquetteFunction) {
            projections.push(dom.replace(domNode, renderMaquetteFunction(), projectionOptions));
            renderFunctions.push(renderMaquetteFunction);
        },
        detach: function (renderMaquetteFunction) {
            for (var i = 0; i < renderFunctions.length; i++) {
                if (renderFunctions[i] === renderMaquetteFunction) {
                    renderFunctions.splice(i, 1);
                    return projections.splice(i, 1)[0];
                }
            }
            throw new Error('renderMaquetteFunction was not found');
        }
    };
    return projector;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_maquette__ = __webpack_require__(0);


var BaseComponent = (function () {
    function BaseComponent(name, projectorOptions) {
        this.lastKey = 0;
        BaseComponent.Name = name;
        BaseComponent.Version = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Version;
        this.logger = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Logger;
        this.projector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_maquette__["b" /* createProjector */])();
        this.animationSpeed = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].AnimationDuration + 'ms';
    }
    BaseComponent.prototype.toH = function (element, item) {
        if (element.nodeValue) {
            if (element.nodeType !== 3 || element.nodeValue.indexOf("\"") > 0 || element.nodeValue.trim().length === 0) {
                return null;
            }
            return null; //element.nodeValue.trim();
        }
        if (!element.tagName) {
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
        }
        if (!element.id) {
            properties['key'] = ++this.lastKey;
        }
        for (var index = 0; index < element.attributes.length; index++) {
            var elm = element.attributes[index];
            var elementName = elm.name.trim();
            if (elementName !== 'class' && elementName !== 'id')
                if (elm.name === '[value]') {
                    if (element.tagName.toUpperCase() === 'INPUT') {
                        properties["value"] = item[elm.value];
                    }
                    else
                        properties["innerHTML"] = item[elm.value];
                }
                else if ((/[\[].*?[\]]/ig).test(elementName)) {
                    if (item.hasOwnProperty(elm.value))
                        properties[elementName.slice(1, -1)] = item[elm.value];
                    else
                        this.logger.error("'" + elm.value + "' is not a valid value or not available in the component data");
                }
                else if ((/[\(].*?[\)]/ig).test(elementName)) {
                    if (typeof this.options[elm.value] === 'function') {
                        properties[elementName.slice(1, -1)] = this.options[elm.value].bind(item);
                    }
                    else {
                        this.logger.error("'" + elm.value + "' is not a valid function or not implemented in the component options");
                    }
                }
                else {
                    properties[elementName] = elm.value;
                }
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_maquette__["a" /* h */])(selector, properties, [children.filter(function (c) { return !!c; })]);
    };
    return BaseComponent;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Doughnut; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_maquette__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_component__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var Doughnut = (function (_super) {
    __extends(Doughnut, _super);
    /**
     * Constructor to initiate the doughnut component
     * @param element Context of the component
     * @param options Component options
     */
    function Doughnut(element, options) {
        var _this = _super.call(this, 'Doughnut', { namespace: 'NAMESPACE_SVG' }) || this;
        _this.element = element;
        _this.scale = 70;
        _this.strokeScale = 0;
        _this.options = __assign({}, Doughnut.defaultOptions, options);
        // Circle dimensions
        _this.options.center = 50; //this.options.size / 2;
        _this.options.radius = _this.options.stroke ? _this.options.center - _this.options.stroke / 2 : _this.options.center;
        if (!_this.validateValues())
            return _this;
        _this.projector.append(_this.element, _this.renderMaquette.bind(_this));
        return _this;
    }
    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template
     */
    Doughnut.prototype.renderMaquette = function () {
        return this.arcTemplate();
    };
    /**
     * Validation method for values; values will be invalid when  values property in the options together should not exceed 100
     */
    Doughnut.prototype.validateValues = function () {
        if (this.options.values.length > 0) {
            var sum = 0;
            for (var index = 0; index < this.options.values.length; index++) {
                var element = this.options.values[index];
                sum += element.percentage;
            }
            if (sum > 100) {
                this.logger.error('Doughnut sum of percentages values should be less than or equal to 100%');
                return false;
            }
            else if (sum < 100) {
                this.options.values.push({ percentage: 100 - sum, color: this.options.circleColor });
            }
        }
        return true;
    };
    /**
     * Generates H template for arc
     */
    Doughnut.prototype.arcTemplate = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.doughnut-component.parent', { style: "min-height:" + this.options.size + "px; min-width:" + this.options.size + "px" }, [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.child.flex.center.grow', {
                'style': "transition: " + this.animationSpeed + "; transform:scale(" + (1 - (this.options.stroke) / this.scale) + ")"
            }, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('img', { src: this.options.image, style: this.options.image ? 'display:block' : 'display:none' }),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.head.flex.h3', [this.options.title])]),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.child', {
                key: this.options.title,
                title: this.options.title,
                onmouseenter: this.mouseEnter.bind(this),
                onmouseleave: this.mouseExit.bind(this)
            }, [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('svg', { "class": 'doughnut-component', viewBox: '0 0 100 100' }, [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('circle', {
                        'stroke-width': this.options.stroke,
                        stroke: this.options.circleColor,
                        cx: this.options.center,
                        cy: this.options.center,
                        r: this.options.radius
                    }), this.valuesTemplate()
                ])
            ])
        ]);
    };
    /**
     * Generates H template from values or angles
     */
    Doughnut.prototype.valuesTemplate = function () {
        var _this = this;
        if (this.options.values.length > 0)
            return this.options.values.map(function (item, index) {
                _this.options.startAngle = _this.options.endAngle;
                var p = (item.percentage * 360) / 100;
                _this.options.endAngle = p + _this.options.startAngle;
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('path', {
                    kay: index,
                    'stroke-width': _this.options.stroke,
                    'stroke': item.color,
                    'd': _this.getAcr(_this.options.startAngle, _this.options.endAngle)
                });
            });
        else
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('path', {
                'stroke-width': this.options.stroke,
                stroke: this.options.sectorColor,
                d: this.getAcr(this.options.startAngle, this.options.endAngle)
            });
    };
    Doughnut.prototype.mouseEnter = function () {
        this.scale = 90;
    };
    Doughnut.prototype.mouseExit = function (ev) {
        this.scale = 70;
    };
    /**
     * Verifies if angle is more than 360 degree, if angle is more than calculates angle value as (angle % 350)
     */
    Doughnut.prototype.checkAngle = function () {
        if (this.options.endAngle > 360) {
            this.options.endAngle = this.options.endAngle % 360;
        }
        if (this.options.startAngle > this.options.endAngle) {
            this.options.startAngle = 0;
        }
    };
    /**
     * Converts polar values to cartesian
     * @param centerX X center value
     * @param centerY Y center value
     * @param radius radius of the circle
     * @param angleInDegrees arc angle value
     */
    Doughnut.prototype.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: (centerX + (radius * Math.cos(angleInRadians))),
            y: (centerY + (radius * Math.sin(angleInRadians)))
        };
    };
    /**
     * Generated 'd' value for the arc
     * @param startAngle Start angle value
     * @param endAngle End angle value
     */
    Doughnut.prototype.getAcr = function (startAngle, endAngle) {
        var start = this.polarToCartesian(this.options.center, this.options.center, this.options.radius, endAngle);
        var end = this.polarToCartesian(this.options.center, this.options.center, this.options.radius, startAngle);
        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return "M" + start.x + " " + start.y + " A" + this.options.radius + " " + this.options.radius + " 0 " + largeArcFlag + " 0 " + end.x + " " + end.y;
    };
    /**
     * Updates the arc
     * @param startAngle Start angle angle
     * @param endAngle End angle value
     */
    Doughnut.prototype.updateAngle = function (startAngle, endAngle) {
        this.options.endAngle = endAngle;
        this.options.startAngle = startAngle;
        this.checkAngle();
        this.projector.scheduleRender();
    };
    /**
     * Updates the arc
     * @param startAngle Start angle angle
     * @param endAngle End angle value
     */
    Doughnut.prototype.updateOptions = function (options) {
        this.options = __assign({}, this.options, options);
        this.projector.scheduleRender();
    };
    return Doughnut;
}(__WEBPACK_IMPORTED_MODULE_1__base_component__["a" /* BaseComponent */]));

/**
 * Component default option. These options can be overridden from constructor
 */
Doughnut.defaultOptions = {
    stroke: 10,
    startAngle: 0,
    endAngle: 0,
    sectorColor: '#789',
    circleColor: '#DDD',
    image: null,
    values: [],
    title: '',
    size: 200
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dropdown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_maquette__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_component__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * --------------------------------------------------------------------------
 * Dropdown Component
 * Licensed under MIT
 * --------------------------------------------------------------------------
 */


var Dropdown = (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(element, options, data) {
        var _this = _super.call(this, 'Dropdown') || this;
        _this.element = element;
        _this.options = __assign({}, Dropdown.defaultOptions, options);
        _this.logger.log('Dropdown loaded');
        _this.display = false;
        _this.projector.append(_this.element, _this.renderMaquette.bind(_this));
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    Dropdown.prototype.renderMaquette = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.context', {
            style: 'height:600px; width:600px; border:1px solid orange',
            onmousemove: this.moveMouse.bind(this),
            onclick: this.print.bind(this)
        }, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.dropdown', {
                style: "height:20px; position:absolute; width:20px; background:orange; display: " + this.getDisplay() + "; left:" + this.x + "; top:" + this.y
            })]);
    };
    Dropdown.prototype.moveMouse = function (event) {
        event.stopPropagation();
        this.x = event.x + 'px';
        this.y = event.y + 'px';
    };
    Dropdown.prototype.print = function (event) {
        this.logger.log(this.x + ', ' + this.y);
    };
    Dropdown.prototype.getDisplay = function () {
        return this.display ? 'block' : 'none';
    };
    Dropdown.prototype.show = function () {
        this.display = true;
        this.projector.scheduleRender();
    };
    Dropdown.prototype.hide = function () {
        this.display = false;
        this.projector.scheduleRender();
    };
    return Dropdown;
}(__WEBPACK_IMPORTED_MODULE_1__base_component__["a" /* BaseComponent */]));

Dropdown.defaultOptions = {
    "class": '.dropdown'
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_maquette__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_component__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var List = (function (_super) {
    __extends(List, _super);
    /**
     * Constructor to initiate the doughnut component
     * @param element Context of the component
     * @param options Component options
     */
    function List(element, options) {
        var _this = _super.call(this, 'List') || this;
        _this.element = element;
        _this.options = __assign({}, List.defaultOptions, options);
        if (_this.options.pageSize !== 0)
            _this.options.autoPage = false;
        _this.init();
        _this.projector.append(_this.element, _this.render.bind(_this));
        return _this;
    }
    List.prototype.init = function () {
        var elementOffset = this.element.clientHeight;
        if (this.options.pageSize === 0 || this.options.autoPage) {
            this.options.pageSize = Math.ceil(elementOffset / this.options.height);
            this.containerHeight = elementOffset;
        }
        else {
            this.containerHeight = (this.options.height * this.options.pageSize);
        }
        this.containerScrollTop = 0;
        this.start = 0;
        this.end = this.options.pageSize;
        this.activeData = this.options.data.slice(this.start, this.end);
    };
    List.prototype.itemTemplate = function (item) {
        var template = document.createElement('template');
        template.innerHTML = this.options.template;
        var hTemplate = this.toH((template.content && template.content.firstElementChild) || template.children[0], item);
        return hTemplate;
    };
    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template
     */
    List.prototype.render = function () {
        var _this = this;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.list.parent', {
            style: "height: " + this.containerHeight + "px;"
        }, [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.child.container', { style: "height: " + this.containerHeight + "px;", onscroll: this.scrollEvent.bind(this) }, [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.child.data', {
                    style: "top:" + this.containerScrollTop + "px;"
                }, [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('ul.no-pad-mar', [this.activeData.map(function (item, index) {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('li.flex', {
                                style: "height:" + _this.options.height + "px",
                                key: _this.start + index
                            }, _this.itemTemplate(item));
                        })])
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_maquette__["a" /* h */])('div.ghost', { style: "height:" + this.options.data.length * this.options.height + "px" }),
            ])
        ]);
    };
    List.prototype.scrollEvent = function (event) {
        var start = Math.floor(event.currentTarget.scrollTop / this.options.height);
        if (start <= 0) {
            start = 0;
            this.containerScrollTop = 0;
        }
        ;
        var end = start + this.options.pageSize + 1;
        if (end >= this.options.data.length)
            end = this.options.data.length;
        if (start !== this.start && end !== this.end) {
            this.containerScrollTop = (start * this.options.height); //event.target.scrollTop;
            this.start = start;
            this.end = end;
            this.activeData = this.options.data.slice(this.start, this.end);
        }
    };
    List.prototype.refresh = function () {
        this.init();
        this.projector.scheduleRender();
    };
    return List;
}(__WEBPACK_IMPORTED_MODULE_1__base_component__["a" /* BaseComponent */]));

/**
 * Component default option. These options can be overridden from constructor
 */
List.defaultOptions = {
    height: 40,
    pageSize: 0,
    data: [],
    autoPage: true,
    template: ''
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_doughnut_doughnut__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Doughnut", function() { return __WEBPACK_IMPORTED_MODULE_0__components_doughnut_doughnut__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_dropdown_dropdown__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return __WEBPACK_IMPORTED_MODULE_1__components_dropdown_dropdown__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_list_list__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "List", function() { return __WEBPACK_IMPORTED_MODULE_2__components_list_list__["a"]; });
// Comment that is displayed in the API documentation for the Doughnut module:
/**
 * Welcome to the API documentation of the **batman** library.
 * @preferred
 */
// export all components





/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_logger__ = __webpack_require__(8);

/**
 * Global services and configuration for library
 */
var Global = (function () {
    //    public static Logger: ILogger = Logger.getInstance(new ProfilerWriter());
    /**
     * Constructor instantiates all global services and instances
     */
    function Global() {
    }
    return Global;
}());
/* harmony default export */ __webpack_exports__["a"] = (Global);
/**
 * Name of the library
 */
Global.Name = 'Batman';
/**
 * Library version
 */
Global.Version = '1.0.0.alpha.1';
/**
 * Default animation duration in milliseconds
 */
Global.AnimationDuration = 150;
/**
 * global logger instance
 */
Global.Logger = __WEBPACK_IMPORTED_MODULE_0__utility_logger__["a" /* Logger */].getInstance();


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsoleWriter; });
/**
 * This class writes all messages into console
 */
var ConsoleWriter = (function () {
    function ConsoleWriter() {
    }
    /**
     * Writes the message into console
     * @param message Messages that need to be written in console
     */
    ConsoleWriter.prototype.write = function (message) {
        if (message.type === 'error')
            console.error(message.format());
        else
            console.log(message.format());
    };
    /**
     * This method clears all messages in the console
     */
    ConsoleWriter.prototype.clear = function () {
        console.clear();
    };
    return ConsoleWriter;
}());



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__console_writer__ = __webpack_require__(7);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var Logger = (function () {
    /**
     * Initiate the logger class with writer and options
     * @param writer Instance of writer to write messages
     * @param options A set of logger options
     */
    function Logger(writer, options) {
        this.options = __assign({}, Logger.defaultOptions, options);
        if (writer === undefined)
            this._writer = new __WEBPACK_IMPORTED_MODULE_1__console_writer__["a" /* ConsoleWriter */]();
        else
            this._writer = writer;
        this._stack = [];
        Logger._instance = this;
    }
    /**
     * This method give return singleton instance of the logger class
     * @param writer Instance of writer to write messages
     * @param options A set of logger options
     */
    Logger.getInstance = function (writer, options) {
        if (this._instance === undefined) {
            this._instance = new Logger(writer, options);
        }
        return this._instance;
    };
    /**
     *
     * @param value text message to be logged
     * @param type Type of the message `log` or `error`
     */
    Logger.prototype.writeLog = function (value, type) {
        if (this.options.enable) {
            var message = new __WEBPACK_IMPORTED_MODULE_0__message__["a" /* Message */](value, type);
            this._stack.push(message);
            this._writer.write(message);
        }
    };
    /**
     * This method delete all log and sets the log stack to empty
     */
    Logger.prototype.clear = function () {
        this._stack.length = 0;
    };
    /**
     * This message logs the message as `log`
     * @param value text message
     */
    Logger.prototype.log = function (value) {
        this.writeLog(value);
    };
    /**
     * This message logs the message as `error`
     * @param value text message
     */
    Logger.prototype.error = function (value) {
        this.writeLog(value, 'error');
    };
    /**
     * This method enables the logger
     */
    Logger.prototype.enable = function () {
        this.options.enable = true;
    };
    /**
     * This method disables the logger
     */
    Logger.prototype.disable = function () {
        this.options.enable = false;
    };
    return Logger;
}());

/**
 * Logger default options
 */
Logger.defaultOptions = {
    enable: true
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/**
 * Message class
 */
var Message = (function () {
    /**
     *
     * @param text Text string
     * @param type Type of the message `log` or `error`
     * If type not provided default type is `log`
     */
    function Message(text, type) {
        this.text = text;
        this.dateTime = new Date();
        this.type = type || 'log';
    }
    /**
     * This method will format message created date time to a string
     */
    Message.prototype.time = function () {
        return this.dateTime.getHours() + ":" + this.dateTime.getMinutes() + ":" + this.dateTime.getSeconds() + ":" + this.dateTime.getMilliseconds();
    };
    /**
     * This method will format message content to a string
     */
    Message.prototype.format = function () {
        return this.dateTime.getHours() + ":" + this.dateTime.getMinutes() + ":" + this.dateTime.getSeconds() + ":" + this.dateTime.getMilliseconds() + ': ' + this.text;
    };
    return Message;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=batman.js.map
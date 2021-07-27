import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow';


// Produces a matcher that relies on element type eg 'p'
export const type = typeName => element => element.type === typeName;

// Produces a matcher that relies on id property of the element
export const id = id => element => element.props.id === id;

// Produces a matcher that relies on className property of the element
export const className = className => element => element.props.className === className;

// Invokes onClick on the element
export const click = element => element.props.onClick();

// Produces an array of all child elements matching a given filter function
const elementsMatching = (element, matcherFn) => {
    if(matcherFn(element))
        return [element];
    return childrenOf(element)
        .reduce((acc, curChild) => [...acc, ...elementsMatching(curChild, matcherFn)], [])
}




// Module that exposes methods to do with shallow rendering
export const createShallowRenderer = () => {
    let renderer = new ShallowRenderer();

    return {
        element: () => renderer.getRenderOutput(),
        // Produces first matching child
        elementMatching: matcherFn => elementsMatching(renderer.getRenderOutput(), matcherFn)[0], // elementMatching(renderer.getRenderOutput(), matcherFn),

        // Returns an array of all child elements matching the given matcherFn.
        // matcherFn acts sort-of like a filter. Recursion is used
        elementsMatching: matcherFn => elementsMatching(renderer.getRenderOutput(), matcherFn),

        // Renders component
        render: component => renderer.render(component)
    }
}


export const childrenOf = element => {
    // element is a string
    if(typeof(element) === 'string') {
        return []
    }
    const { props: { children } } = element;

    // element has no children
    if(!children) return [];

    // element has a string as only child
    if(typeof(children) === 'string') return [children]

    // element has an array of multiple children
    if(Array.isArray(children)) return children;

    // element has one child
    // (which shows up as an object at element.props.children)
    return [children]
}

// Returns the nth child
export const childOf = (element, n) => {
    return childrenOf(element)[n]
}


// Legacy
// Produces an array of elements matching a given filter function
// Uses depth-first search
const elementsMatchingMine = (element, matcherFn) => {
    const els = []
    _elementsMatchingMine(element, matcherFn, els);
    return els;
}

// Private helper/utility function for finding elements matching a given function
const _elementsMatchingMine = (element, matcherFn, els) => {
    const chn = childrenOf(element);
    chn.map(c => {
        if(matcherFn(c)) {
            els.push(c);
        } else {
            _elementsMatchingMine(c, matcherFn, els)
        }
    })
}

// Deprecated. Not used because its complicated
// Produces the first child matching a given filter function
// Exists the moment it finds first child
const elementMatching = (element, matcherFn) => {
    let res = elementsMatching(element, matcherFn);
    let chn = childrenOf(element);
    for(let i = 0; i < chn.length; i++) {
        let c = chn[i];
        if(matcherFn(c)) return c;
        const nestedMatch = elementMatching(c, matcherFn);
        if(!!nestedMatch) return nestedMatch;
    }
    return null;
}

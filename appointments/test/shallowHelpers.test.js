import React from 'react'
import { childrenOf, createShallowRenderer } from './shallowHelpers'

// A component to use for shallow rendering
// Renders children
const TestComponent = ({ children }) => (
    <React.Fragment>{ children }</React.Fragment>
)

// Produces a function for finding out if an element is of the given type such as 'p'
const type = typeName => element => element.type === typeName;


describe('childrenOf', () => {
    it('returns empty array if no children', () => {
        expect(childrenOf(<div />)).toEqual([])
    })

    it('returns array of all direct children if children exist', () => {
        // console.log(<div><p>A</p><p>B</p></div>)
        expect(childrenOf(
            <div><p>A</p><p>B</p></div>
        )).toEqual([<p>A</p>,<p>B</p>])
    })

    it('returns array of one text string if the child is text', () => {
        // console.log(<div>Hello</div>)
        expect(childrenOf(<div>Hello</div>)).toEqual(['Hello'])
    })

    it('returns empty array if element is string', () => {
        expect(childrenOf('hi')).toEqual([])
    })

    it('returns array of one child if the element has one child', () => {
       expect(childrenOf(<div><h1>Green</h1></div>)).toEqual([<h1>Green</h1>]);
    });




});

describe('child', () => {
    let render, child;

    beforeEach(() => {
       ({ render, child } = createShallowRenderer());
    })

    it('returns undefined if the child does not exist', () => {
        // Notice that we didn't pass in children
       render(<TestComponent />);
       expect(child(0)).not.toBeDefined();
    });

    it('returns nth rendered child', () => {
        render(
            <TestComponent>
                <p>A</p>
                <p>B</p>
            </TestComponent>
        );
        expect(child(0)).toEqual(<p>A</p>);
        expect(child(1)).toEqual(<p>B</p>);
    })
});

describe('elementsMatching', () => {
    let render, elementsMatching;

    beforeEach(() => {
        ({ render, elementsMatching } = createShallowRenderer());
    })

    it('finds multiple direct children', () => {
        render(
            <TestComponent>
                <p>A</p>
                <p>B</p>
            </TestComponent>
        );
        expect(elementsMatching(type('p'))).toEqual([
            <p>A</p>,
            <p>B</p>
        ])
    });

    it('finds indirect children', () => {
        // Tests recursive nature of elementsMatching
        render(
            <TestComponent>
                <div>
                    <p>A</p>
                </div>
                <p>B</p>
                <section>
                    <div>
                        <p>C</p>
                    </div>
                </section>
            </TestComponent>
        );
        const allP = elementsMatching(el => el.type === 'p');
        expect(allP).toHaveLength(3)
        expect(allP[0]).toEqual(<p>A</p>)
        expect(allP[1]).toEqual(<p>B</p>)
        expect(allP[2]).toEqual(<p>C</p>)
    });
})

describe('elementMatching', () => {
    let render, elementMatching;

    beforeEach(() => {
        ({ render, elementMatching } = createShallowRenderer());
    })

    it('finds first direct child', () => {
        render(
            <TestComponent>
                <p>A</p>
                <p>B</p>
            </TestComponent>
        );
        expect(elementMatching(el => el.type === 'p')).toEqual(<p>A</p>)
    })

    it('find first child even though indirect', () => {
        render(
            <TestComponent>
                <section>
                    <div>Cowboy</div>
                </section>
                <div>
                    <p>A</p>
                    <p>Q</p>
                </div>
                <p>B</p>
            </TestComponent>
        );
        expect(elementMatching(el => el.type === 'p')).toEqual(<p>A</p>)
    })
})
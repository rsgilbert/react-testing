import React from 'react'
import { createContainer } from './domManipulator'
import { AppointmentForm } from '../src/AppointmentForm'


describe('AppointmentForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer())
    })

    const form = id => container.querySelector(`form[id="${id}"]`)

    const field = fieldName => form('appointment').elements[fieldName]

    it('renders a form', () => {
        render(<AppointmentForm />)
        expect(form('appointment')).not.toBeNull()
    })

    describe('service field', () => {
        it('renders as a select box', () => {
            render(<AppointmentForm />)
            expect(field('service')).not.toBeUndefined()
            expect(field('service').tagName).toEqual('SELECT')
        })

        it('initially has a blank value chosen', () => {
            render(<AppointmentForm />)
            const firstNode = field('service').childNodes[0]
            expect(firstNode.value).toEqual('')
            expect(firstNode.selected).toBeTruthy()
        })

        it('lists all saloon services', () => {
            const selectableServices = ['Cut', 'Blow']
            render(<AppointmentForm 
                    selectableServices={selectableServices}
                    />)
            const optionNodes = Array.from(field('service').childNodes)
            const renderedServices = optionNodes.map(node => node.textContent)
            expect(renderedServices).toEqual(expect.arrayContaining(selectableServices))            
        })
    })
})
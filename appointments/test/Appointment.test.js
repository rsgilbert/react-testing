import React from 'react'
import ReactDOM from 'react-dom'
import { Appointment } from '../src/Appointment'



// Test suite
describe('Appointment', () => {
    let container;
    let customer;

    beforeEach(() => {
        container = document.createElement('section')
    })

    const render = component => ReactDOM.render(component, container)

    // test
    it('renders the current first name', () => {
        // Arrance
        customer = { firstName: 'Ashley Jackson' }
        // Act
        render(<Appointment customer ={customer} />)
        // Assert
        expect(container.textContent).toMatch('Ashley')
    })

    it('renders another current first name', () => {
        customer = { firstName: 'Mary' }
        render(<Appointment customer ={customer} />)
        expect(container.textContent).toMatch('Mary')
    })
})








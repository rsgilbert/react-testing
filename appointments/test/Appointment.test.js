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
    // test
    it('renders the current first name', () => {
        customer = { firstName: 'Ashley Jackson' }
        ReactDOM.render(<Appointment customer ={customer} />, container)
        expect(container.textContent).toMatch('Ashley')
    })

    it('renders another current first name', () => {
        customer = { firstName: 'Mary' }
        ReactDOM.render(<Appointment customer ={customer} />, container)
        expect(container.textContent).toMatch('Mary')
    })
})








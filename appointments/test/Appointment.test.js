import React from 'react'
import ReactDOM from 'react-dom'
import { Appointment } from '../src/Appointment'



// Test suite
describe('Appointment', () => {
    let container;
    let customer;
    // test
    it('renders the current first name', () => {
        customer = { firstName: 'Ashley Jackson' }
        container = document.createElement('section')
        ReactDOM.render(<Appointment customer ={customer} />, container)
        expect(container.textContent).toMatch('Ashley')
    })

    it('renders another current first name', () => {
        customer = { firstName: 'Mary' }
        container = document.createElement('section')
        ReactDOM.render(<Appointment customer ={customer} />, container)
        expect(container.textContent).toMatch('Mary')
    })
})








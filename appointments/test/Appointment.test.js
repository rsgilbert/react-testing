import React from 'react'
import ReactDOM from 'react-dom'
import { Appointment } from '../src/Appointment'



// Test suite
describe('Appointment', () => {
    // test
    it('renders the current first name', () => {
        const customer = { firstName: 'Ashley Jackson' }
        const component = <Appointment customer ={customer} />
        const container = document.createElement('section')
        document.body.appendChild(container)
        ReactDOM.render(component, container)
        expect(document.body.textContent).toMatch('Ashley')
    })

    it.skip('renders the current first name', () => {
        const customer = { firstName: 'Mary' }
        const component = <Appointment customer ={customer} />
        const container = document.createElement('section')
        document.body.appendChild(container)
        ReactDOM.render(component, container)
        expect(document.body.textContent).toMatch('Mary')
    })
})








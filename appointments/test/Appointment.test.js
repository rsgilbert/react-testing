import React from 'react'
import ReactDOM from 'react-dom'
import { 
    Appointment,
    AppointmentsDayView
} from '../src/Appointment'



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
        // Arrange
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

describe('AppointmentsDayView', () => {
    let container;
    
    beforeEach(() => {
        container = document.createElement('div')
    })

    const render = component => 
        ReactDOM.render(component, container)

    it('renders a div with the right id', () => {
        render(<AppointmentsDayView appointments={[]} />)
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull()
    })

    it('renders multiple appointments in an ol element', () => {
        const today = new Date();
        const appointments = [
            {startsAt: today.setHours(12, 0)},
            {startsAt: today.setHours(15, 0)},
            {startsAt: today.setHours(1, 0)}
        ]
        render(<AppointmentsDayView appointments={appointments} />)
        expect(container.querySelector('ol')).not.toBeNull()
        expect(container.querySelector('ol').children).toHaveLength(3)
    })
})










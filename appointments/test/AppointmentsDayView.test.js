import React from 'react'
import ReactDOM from 'react-dom'
import { 
    Appointment,
    AppointmentsDayView
} from '../src/AppointmentsDayView'
import ReactTestUtils from 'react-dom/test-utils'



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
        customer = { firstName: 'Ashley' }
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
    const today = new Date()
    const appointments = [
        { 
            startsAt: today.setHours(5, 3),
            customer: { firstName: 'Ashley' }
        }, {
            startsAt: today.setHours(18, 11), 
            customer: { firstName: 'Jeff' }
        }, {
            startsAt: today.setHours(1, 0), 
            customer: { firstName: 'Mukasa'}
        }
    ]
    
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
        render(<AppointmentsDayView appointments={appointments} />)
        expect(container.querySelector('ol')).not.toBeNull()
        expect(container.querySelector('ol').children).toHaveLength(3)
    })

    it('renders each appointment in an li', () => {
        render(<AppointmentsDayView appointments={appointments} />)
        expect(container.querySelectorAll('li')).toHaveLength(3)
        expect(container.querySelectorAll('li')[0].textContent).toEqual('05:03')
        expect(container.querySelectorAll('li')[1].textContent).toEqual('18:11')
        expect(container.querySelectorAll('li')[2].textContent).toEqual('01:00')
    })

    it('shows a messsage if no appointments today', () => {
        render(<AppointmentsDayView appointments={[]} />)
        expect(container.textContent).toMatch('There are no appointments scheduled for today.')
    })

    it('selects the first appointment by default', () => {
        render(<AppointmentsDayView appointments={appointments} />)
        expect(container.textContent).toMatch('Ashley')
    })

    it('has a button element in each li', () => {
        render(<AppointmentsDayView appointments={appointments} />)
        expect(
            container.querySelectorAll('li > button')
        ).toHaveLength(3)
        expect(
            container.querySelectorAll('li > button')[0].type
        ).toEqual('button')
    })

    it('renders another appointment when selected', () => {
        render(<AppointmentsDayView appointments={appointments} />)
        const button = container.querySelectorAll('button')[1]
        ReactTestUtils.Simulate.click(button)
        expect(container.textContent).toMatch('Jeff') 
    })
})










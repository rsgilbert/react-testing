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
    let customer = { firstName: 'Ashley', phoneNumber: '0701121924', stylist: 'Jonah Muwanguzi', service: 'Hair cut', notes: 'The best at kawalata'};

    beforeEach(() => {
        container = document.createElement('section')
    })

    const render = component => ReactDOM.render(component, container)

    it('renders a table', () => {
        render(<Appointment customer={customer} />)
        expect(container.querySelector('table')).not.toBeNull()
    })

    it('renders five rows', () => {
        render(<Appointment customer={customer} />)
        expect(container.querySelectorAll('tr')).toHaveLength(5) 
    })

    it('renders customer details in row 1', () => {
        render(<Appointment customer={customer} />)
        expect(
            container.querySelectorAll('tr')[0].textContent
        ).toMatch('Customer')
        expect(
            container.querySelectorAll('tr')[0].textContent
        ).toMatch(customer.firstName)
    })

    it('renders phone details in row 2', () => {
        render(<Appointment customer={customer} />)
        const row2Text = container.querySelectorAll('tr')[1].textContent
        expect(row2Text).toMatch('Phone Number')
        expect(row2Text).toMatch(customer.phoneNumber)
    })

    it('renders stylist details in row 3', () => {
        render(<Appointment customer={customer} />)
        const row3 = container.querySelectorAll('tr')[2].textContent
        expect(row3).toMatch('Stylist')
        expect(row3).toMatch(customer.stylist)
    })

    it('renders service details in row 4', () => {
        render(<Appointment customer={customer} />)
        const row4 = container.querySelectorAll('tr')[3].textContent
        expect(row4).toMatch('Service')
        expect(row4).toMatch(customer.service)
    })

    it('renders notes details in row 5', () => {
        render(<Appointment customer = {customer} />)
        const row5 = container.querySelectorAll('tr')[4].textContent
        expect(row5).toMatch('Notes')
        expect(row5).toMatch(customer.notes)
    })
 

    
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










import React from 'react'
import { createContainer } from './domManipulator'
import { CustomerForm } from '../src/CustomerForm'
import ReactTestUtils from 'react-dom/test-utils'



describe('CustomerForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer())
    });

    const form = id => container.querySelector(`form[id="${id}"]`)

    const firstNameField = () => form('customer').elements.firstName

    const labelFor = formElName => 
        container.querySelector(`label[for="${formElName}"]`)

    const expectToBeInputFieldOfTypeText = formEl => {
        expect(formEl).not.toBeNull()
        expect(formEl.tagName).toEqual('INPUT')
        expect(formEl.type).toEqual('text')
    }

    it('renders a form', () => {
        render(<CustomerForm />)
        expect(form('customer')).not.toBeNull()
    })

    it('renders the first name field as a text box', () => {
        render(<CustomerForm />)
        expectToBeInputFieldOfTypeText(firstNameField())
    })

    it('includes the existing value for the first name', () => {
        render(<CustomerForm firstName='Moses' />)
        expect(firstNameField().value).toEqual('Moses')
    })

    it('renders a label for the first name field', () => {
        render(<CustomerForm firstName="Jeff"/>)
        expect(labelFor('firstName')).not.toBeNull()
        expect(labelFor('firstName').textContent).toEqual('First Name')
    })

    it('assigns an id that matches the label id to the first name field', () => {
        render(<CustomerForm />)
        expect(firstNameField().id).toEqual('firstName')
    })

    it('saves existing first name when submitted', async () => {
        expect.hasAssertions()
        render(
            <CustomerForm
                firstName="Ashley"
                onSubmit={({ firstName }) =>
                    expect(firstName).toEqual('Ashley')}
                />
        )
        ReactTestUtils.Simulate.submit(form('customer'))
    })
})

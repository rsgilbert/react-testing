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

    const field = name => form('customer').elements[name]

    const labelFor = formElName => 
        container.querySelector(`label[for="${formElName}"]`)

    it('renders a form', () => {
        render(<CustomerForm />)
        expect(form('customer')).not.toBeNull()
    })

    const expectToBeInputFieldOfTypeText = formEl => {
        expect(formEl).not.toBeNull()
        expect(formEl.tagName).toEqual('INPUT')
        expect(formEl.type).toEqual('text')
    }

    const itRendersAsATextBox = fieldName => 
        it('renders as a text box', () => {
            render(<CustomerForm />)
            expectToBeInputFieldOfTypeText(field(fieldName))
        })

    const itIncludesTheExistingValue = fieldName => 
        it('includes the existing value', () => {
            render(<CustomerForm {...{[fieldName]: 'value'} }/>)
            expect(field(fieldName).value).toEqual('value')
        })

    const itRendersALabel = (fieldName, labelName) =>
        it('renders a label', () => {
            render(<CustomerForm { ...{[fieldName]: 'value' }} />)
            expect(labelFor(fieldName)).not.toBeNull()
            expect(labelFor(fieldName).textContent).toEqual(labelName)
        })

    const itAssignsIdMatchingLabelId = fieldName =>    
        it('assigns an id that matches the label id', () => {
            render(<CustomerForm />)
            expect(field(fieldName).id).toEqual(fieldName)
        })
        
    const itSavesExistingValueWhenSubmitted = fieldName => 
        it('saves existing value when submitted', async () => {
            expect.hasAssertions()
            render(
                <CustomerForm
                    { ...{[fieldName]: 'value' }}
                    onSubmit={q =>
                        expect(q[fieldName]).toEqual('value')}
                    />
            )
            await ReactTestUtils.Simulate.submit(form('customer'))
        })
    
    const itSavesNewValueWhenSubmitted = fieldName => 
        it('saves new value when submitted', async () => {
            expect.hasAssertions()
            render(
                <CustomerForm
                    {...{[fieldName]: 'value'}}
                    onSubmit={
                        q => expect(q[fieldName]).toEqual('newValue')                    
                    }
                    />
            )
            await ReactTestUtils.Simulate.change(field(fieldName), { target: { value: 'newValue', name: fieldName }})
            await ReactTestUtils.Simulate.submit(form('customer'))
        })
   
    describe('first name field', () => {            
        itRendersAsATextBox('firstName')
        itIncludesTheExistingValue('firstName')
        itRendersALabel('firstName', 'First Name')
        itAssignsIdMatchingLabelId('firstName')
        itSavesExistingValueWhenSubmitted('firstName')
        itSavesNewValueWhenSubmitted('firstName')
    })

    describe('last name field', () => {            
        itRendersAsATextBox('lastName')
        itIncludesTheExistingValue('lastName')
        itRendersALabel('lastName', 'Last Name')
        itAssignsIdMatchingLabelId('lastName')
        itSavesExistingValueWhenSubmitted('lastName')
        itSavesNewValueWhenSubmitted('lastName')
    })

    describe('phone number field', () => {
        itRendersAsATextBox('phoneNumber')
        itIncludesTheExistingValue('phoneNumber')
        itRendersALabel('phoneNumber', 'Phone Number')
        itAssignsIdMatchingLabelId('phoneNumber')
        itSavesExistingValueWhenSubmitted('phoneNumber')
        itSavesNewValueWhenSubmitted('phoneNumber') 
    })

    it('has a submit button', () => {
        render(<CustomerForm />)
        const submitButton = container.querySelector('input[type="submit"]')
        expect(submitButton).not.toBeNull()
    })

    it('saves first name when submit button is clicked', () => {
        expect.hasAssertions()
        render(<CustomerForm
                    firstName='value'
                    onSubmit={(q)=> {
                            expect(q).not.toBeNull()
                            expect(q.firstName).toEqual('value')
                        }}
                    />)
        const submitButton = container.querySelector('input[type="submit"]')
        ReactTestUtils.Simulate.click(submitButton)
    })
})

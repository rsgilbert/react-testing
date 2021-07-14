import React from 'react';
import {createContainer, withEvent} from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';
import { 
  fetchResponseOk,
  fetchResponseError, 
  requestBodyOf
} from './spyHelpers'
import 'whatwg-fetch'

describe('CustomerForm', () => {
  let render, container, form, field, labelFor, element, change, click, submit;

  beforeEach(() => {
    ({ render, container, form, field, labelFor, element, change, click, submit } = createContainer());
    jest.spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk({}))
  });

  afterEach(() => {
    // Reset mocked object to original value
    window.fetch.mockRestore()
  })


  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = element(
      'input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });

  it('clears error after submitting form successfully', async () => {
      render(<CustomerForm />)
      window.fetch.mockReturnValue(fetchResponseError)
      await submit(form('customer'))
      let errorEl = element('.error')
      expect(errorEl).not.toBeNull()
      window.fetch.mockReturnValue(fetchResponseOk({}))
      await submit(form('customer'))
      errorEl = element('.error')
      expect(errorEl).toBeNull()
  })

  it('calls fetch with the right properties when submitting data', async () => {
    render(<CustomerForm />)
    await submit(form('customer'))
    expect(window.fetch).toHaveBeenCalledWith(
      '/customers',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin', 
        headers: { 'Content-Type': 'application/json' }
      })
    )
  })

  it('notifies onSave after form is submitted', async () => {
    const customer = { id: 123 }
    window.fetch.mockReturnValue(fetchResponseOk(customer))
    const onSaveSpy = jest.fn()
    render(<CustomerForm onSave={onSaveSpy} />)
    await submit(form('customer'))
    expect(window.fetch).toHaveBeenCalled()
    expect(onSaveSpy).toHaveBeenCalled()
    expect(onSaveSpy).toHaveBeenCalledWith(expect.objectContaining(customer))
  })

  it('doesnt notify onSave if we get an error response when form is submitted', async () => {
    window.fetch.mockReturnValue(fetchResponseError())
    const onSaveSpy = jest.fn()
    render(<CustomerForm onSave={onSaveSpy} />);
    await submit(form('customer'))
    expect(window.fetch).toHaveBeenCalled()
    expect(onSaveSpy).not.toHaveBeenCalled()
  })

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn()
    render(<CustomerForm />)
    await submit(form('customer'), { preventDefault: preventDefaultSpy })
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('renders error message when fetch call fails', async () => {
    window.fetch.mockReturnValue(fetchResponseError)
    render(<CustomerForm />)
    await submit(form('customer'))
    const errorElement = element('.error')
    expect(errorElement).not.toBeNull()
  })
 

  // -- assertion helpers --

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const itRendersAsATextBox = fieldName =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field('customer', fieldName));
    });

  const itIncludesTheExistingValue = fieldName =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field('customer', fieldName).value).toEqual('value');
    });

  const itRendersALabel = (fieldName, text) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(text);
    });

  const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field('customer', fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it('submits existing value', async () => {
      render(
        <CustomerForm
          {...{ [fieldName]: value }}
        />
      );
      await submit(form('customer'));
      expect(window.fetch).toHaveBeenCalledWith('/customers', expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      }))
      expect(requestBodyOf(window.fetch)).toMatchObject({ [fieldName]: value })
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
        />
      );
      change(field('customer', fieldName), withEvent(fieldName, value));
      await submit(form('customer'))
      expect(window.fetch).toHaveBeenCalled()
      expect(window.fetch).toHaveBeenCalledWith('/customers', expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      }))
      expect(requestBodyOf(window.fetch)[fieldName]).toEqual(value)
    });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName', 'value');
    itSubmitsNewValue('firstName', 'newValue');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitsExistingValue('lastName', 'value');
    itSubmitsNewValue('lastName', 'newValue');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
    itSubmitsExistingValue('phoneNumber', '12345');
    itSubmitsNewValue('phoneNumber', '67890');
  });
});

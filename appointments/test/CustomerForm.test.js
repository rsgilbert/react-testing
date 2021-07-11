import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

/**
 * Test helper function that produces a Response object (that is a Promise) to mimic what
 * would be returned from the fetch API.
 * @param {*} body 
 */
const fetchResponseOk = body => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body)
  })

  /**
   * Test helper function that produces an error Response object that is also a promise
   */
const fetchResponseError = () => 
  Promise.resolve({ ok: false })

/**
 * Extension functions on expect 
 */  
expect.extend({
 
})

describe('CustomerForm', () => {
  let render, container;

  const originalFetch = window.fetch;
  let fetchSpy;

  beforeEach(() => {
    ({ render, container } = createContainer());
    fetchSpy = jest.fn(() => fetchResponseOk({}))
    window.fetch = fetchSpy
  });

  afterEach(() => {
    // Reset global variables
    window.fetch = originalFetch
  })

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('customer').elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector(
      'input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });

  it('calls fetch with the right properties when submitting data', async () => {
    render(<CustomerForm />)
    ReactTestUtils.Simulate.submit(form('customer'))
    expect(fetchSpy).toHaveBeenCalledWith(
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
    fetchSpy.mockReturnValue(fetchResponseOk(customer))
    const onSaveSpy = jest.fn()
    render(<CustomerForm onSave={onSaveSpy} />)
    await act(async () => 
      ReactTestUtils.Simulate.submit(form('customer')))
    expect(fetchSpy).toHaveBeenCalled()
    expect(onSaveSpy).toHaveBeenCalled()
    expect(onSaveSpy).toHaveBeenCalledWith(expect.objectContaining(customer))
  })

  it('doesnt notify onSave if we get an error response when form is submitted', async () => {
    fetchSpy.mockReturnValue(fetchResponseError())
    const onSaveSpy = jest.fn()
    render(<CustomerForm onSave={onSaveSpy} />)
    await act(async () => 
      ReactTestUtils.Simulate.submit(form('customer')))
    expect(fetchSpy).toHaveBeenCalled()
    expect(onSaveSpy).not.toHaveBeenCalled()
  })

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn()
    render(<CustomerForm />)
    await act(async () => 
      ReactTestUtils.Simulate.submit(form('customer'), { preventDefault: preventDefaultSpy })
    )
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('renders error message when fetch call fails', async () => {
    fetchSpy.mockReturnValue(fetchResponseError)
    render(<CustomerForm />)
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'))
    })
    const errorElement = container.querySelector('.error')
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
      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = fieldName =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
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
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it('submits existing value', async () => {
      render(
        <CustomerForm
          {...{ [fieldName]: value }}
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
      
      expect(fetchSpy).toHaveBeenCalled()
      expect(fetchSpy).toHaveBeenCalledWith('/customers', expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      }))
      const fetchRequestBody = fetchSpy.mock.calls[0][1].body
      expect(JSON.parse(fetchRequestBody)[fieldName]).toEqual(value)
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
        />
      );
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value, name: fieldName }
      });
      await ReactTestUtils.Simulate.submit(form('customer'))
      expect(fetchSpy).toHaveBeenCalled()
      expect(fetchSpy).toHaveBeenCalledWith('/customers', expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      }))
      const fetchRequestBody = fetchSpy.mock.calls[0][1]['body']
      expect(JSON.parse(fetchRequestBody)[fieldName]).toEqual(value)
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

import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

/**
 * A spy function with the ability to stub. A stub
 * always returns the save value whenever its called
 */
const spy = () => {
  let receivedArguments
  let returnValue
  return {
    // Uses parameter destructuring to save an entire array of parameters
    /**
     * Copies the arguments in the function and saves them as receivedArguments
     * @param  {...any} args 
     */
    fn: (...args) => {
      receivedArguments = args
      return returnValue
    },

    /**
     * Sets the value to return when fn is called
     */
    stubReturnValue: value => (returnValue = value),

    /**
     * Produces an array of all arguments that were obtained by fn
     */
    receivedArguments: () => receivedArguments,
    /**
     * Produces one of the arguments that were obtained by fn based on index n
     * @param {*} n 
     */
    receivedArgument: n => receivedArguments[n]
  }
}

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
  /**
   * Passes if the spy's fn function was called which is also when the spy has arguments
   * @param {*} received 
   */
  toHaveBeenCalled(received) {
    if(received.receivedArguments() === undefined) {
      return { pass: false, message: () => 'Spy was not called' }
    }
    return { pass: true, message: () => 'Spy was called' }
  }
})

describe('CustomerForm', () => {
  let render, container;

  const originalFetch = window.fetch;
  let fetchSpy;

  beforeEach(() => {
    ({ render, container } = createContainer());
    fetchSpy = spy()
    window.fetch = fetchSpy.fn
    fetchSpy.stubReturnValue(fetchResponseOk({}))
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
      'input[type="submit"]'
    );
    expect(submitButton).not.toBeNull();
  });

  // Stubbing the fetch API
  it('calls fetch with the right properties when submitting data', async () => {
    render(<CustomerForm />)
    ReactTestUtils.Simulate.submit(form('customer'))
    expect(fetchSpy).toHaveBeenCalled()
    expect(fetchSpy.receivedArgument(0)).toEqual('/customers')
  
    const fetchOpts = fetchSpy.receivedArgument(1)
    expect(fetchOpts.method).toEqual('POST')
    expect(fetchOpts.credentials).toEqual('same-origin')
    expect(fetchOpts.headers).toEqual({ 'Content-Type': 'application/json' })
  })

  it('notifies onSave after form is submitted', async () => {
    const customer = { id: 123 }
    fetchSpy.stubReturnValue(fetchResponseOk(customer))
    const onSaveSpy = spy()
    render(<CustomerForm onSave={onSaveSpy.fn} />)
    await act(async () => 
      ReactTestUtils.Simulate.submit(form('customer')))
    expect(fetchSpy).toHaveBeenCalled()
    expect(onSaveSpy).toHaveBeenCalled()
    expect(onSaveSpy.receivedArgument(0)).toEqual(customer)
  })

  it('doesnt notify onSave if we get an error response when form is submitted', async () => {
    fetchSpy.stubReturnValue(fetchResponseError())
    const onSaveSpy = spy()
    render(<CustomerForm onSave={onSaveSpy.fn} />)
    await act(async () => 
      ReactTestUtils.Simulate.submit(form('customer')))
    expect(fetchSpy).toHaveBeenCalled()
    expect(onSaveSpy).not.toHaveBeenCalled()
  })

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = spy()
    render(<CustomerForm />)
    await act(async () => 
      ReactTestUtils.Simulate.submit(form('customer'), { preventDefault: preventDefaultSpy.fn })
    )
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('renders error message when fetch call fails', async () => {
    fetchSpy.stubReturnValue(fetchResponseError)
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
      expect(fetchSpy.receivedArgument(0)).toBe('/customers')
      const fetchOptions = fetchSpy.receivedArgument(1)
      expect(fetchOptions.method).toBe('POST')
      expect(fetchOptions.credentials).toBe('same-origin')
      expect(fetchOptions.headers).toEqual({ 'Content-Type': 'application/json' })
      expect(JSON.parse(fetchOptions.body)[fieldName]).toEqual(value)
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
      expect(fetchSpy.receivedArgument(0)).toBe('/customers')
      const fetchOptions = fetchSpy.receivedArgument(1)
      expect(fetchOptions.method).toBe('POST')
      expect(fetchOptions.credentials).toBe('same-origin')
      expect(fetchOptions.headers).toEqual({ 'Content-Type': 'application/json' })
      expect(JSON.parse(fetchOptions.body)[fieldName]).toEqual(value)
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

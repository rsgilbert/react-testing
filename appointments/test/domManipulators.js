import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils'


/**
 * Create an event object that consists of the name and value properties for example { target: { name: "firstName", value: "Josephine" }}.
 * @param name
 * @param value
 * @returns {{target: {name, value}}}
 */
export const withEvent = (name, value) => ({ target: { name, value } })

export const createContainer = () => {
  const container = document.createElement('div');

  const form = id => container.querySelector(`form[id="${id}"]`)
  const field = (formId, name) => form(formId).elements[name]
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`)
  const element = selector => container.querySelector(selector)
  const simulateEvent = eventName => (element, eventData) =>
      ReactTestUtils.Simulate[eventName](element, eventData)

  const simulateEventAndWait = eventName => async (
      element, eventData
  ) => await act(async () => simulateEvent(eventName)(element, eventData))

  return {
    click: simulateEvent('click'),
    change: simulateEvent('change'),
    submit: simulateEventAndWait('submit'),
    simulateEventAndWait,
    render: component => ReactDOM.render(component, container),
    container,
    form,
    field,
    labelFor,
    element
  };
};


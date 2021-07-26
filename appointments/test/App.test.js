import React from 'react';
import {
    createShallowRenderer, type, className, childrenOf, childOf, click, id
} from "./shallowHelpers";
import { App } from '../src/App';
import { AppointmentsDayViewLoader } from '../src/AppointmentsDayViewLoader';
import { CustomerForm } from '../src/CustomerForm';


let log = console.log

describe('App', () => {
    let render, elementMatching, element;

    beforeEach(() => {
        ({ render, elementMatching, element } = createShallowRenderer());

    });

    it('initially shows the AppointmentsDayViewLoader', () => {
        render(<App />);
        expect(elementMatching(type(AppointmentsDayViewLoader))).not.toBeNull();
        expect(elementMatching(type(AppointmentsDayViewLoader))).toBeDefined();
    });

    it('has a button bar as the first child', () => {
        render(<App />);
        expect(childOf(element(), 0).type).toEqual('div');
        expect(childOf(element(), 0).props.className).toEqual('button-bar');
    });

    it('has a button to initiate add-customer-and-appointment action', () => {
        render(<App />)
        const buttons = childrenOf(elementMatching(className('button-bar')));
        expect(buttons[0].type).toEqual('button');
        expect(buttons[0].props.children).toEqual('Add customer and appointment');
    });

    const beginAddingCustomerAndAppointment = () => {
        render(<App />)
        click(elementMatching(id('addCustomer')));
    }

    it('displays the CustomerForm when button is clicked', async () => {
        beginAddingCustomerAndAppointment();
        expect(elementMatching(type(CustomerForm))).not.toBeNull();
        expect(elementMatching(type(CustomerForm))).toBeDefined();
    });

    it('hides the AppointmentDayViewLoader when button is clicked', async () => {

    });






})

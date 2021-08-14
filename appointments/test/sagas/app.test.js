import { storeSpy, expectRedux } from 'expect-redux';
import { configureStore } from '../../src/store';
import * as HistoryExports from '../../src/history';


describe('customerAdded', function() {
    let store, pushSpy;

    beforeEach(function() {
        pushSpy = jest.spyOn(HistoryExports.appHistory, 'push');
        store = configureStore([ storeSpy ]);
    });

    function dispatchRequest(customer) {
        store.dispatch({ 
            type: 'ADD_CUSTOMER_SUCCESSFUL', customer
        });
    }

    it('pushes /addAppointment to history', function() {
        dispatchRequest();
        expect(pushSpy).toHaveBeenCalledWith('/addAppointment');
    });

    it('dispatches a SET_CUSTOMER_FOR_APPOINTMENT action', function() {
        const customer = { id: 123};
        dispatchRequest(customer);
        return expectRedux(store)
            .toDispatchAnAction()
            .matching({
                type: 'SET_CUSTOMER_FOR_APPOINTMENT', customer
            });
    })
});
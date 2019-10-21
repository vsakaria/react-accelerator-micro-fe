import configureMockStore from 'redux-mock-store';
import { reduxErrorHandlingMiddleware, reduxApiErrorHandlingMiddleware } from './reduxErrorHandling';
import { httpRequestHandler } from '../../utils/api/httpRequestHandler';
import { StatusCode } from './ICwaError';

const mockStore = configureMockStore();

describe('reduxErrorHandlingMiddleware', () => {
    it('should travse through the actions WHEN there are no errors thrown', () => {
        const store = mockStore({});
        const next = store.dispatch;
        const action = { type: 'SOME_ACTION', data: {} }

        reduxErrorHandlingMiddleware(store)(next)(action);
        expect(store.getActions()).toEqual([action]);
    });

    it('should throw an error when the action fails', () => {
        const store = mockStore({ some: 'value' });
        const next = store.dispatch;
        const action = { type: 'SOME_ACTION' };
        console.error = jest.fn();
        httpRequestHandler.postRequest = jest.fn();

        const payload = {
            applicationState: { some: "value" },
            loggingLevel: 'error',
            cause: 'SOME_ACTION',
            cwaStatusCode: StatusCode.ReduxError,
            message: "A Redux error occur while dispatching an action",
            stackTrack: new Error('Actions may not have an undefined "type" property. Have you misspelled a constant? Action: {}')
        }

        try {
            reduxErrorHandlingMiddleware(store)(next)(action);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(httpRequestHandler.postRequest).toBeCalledWith('/cbo/cwa/logging/log', payload);
        }
    })
})

describe('reduxApiErrorHandlingMiddleware', () => {
    it('should travse through the actions WHEN there are no FAILURE actions', () => {
        const store = mockStore({});
        const next = store.dispatch;
        const action = { type: 'SOME_ACTION_WITH', data: {} }

        reduxApiErrorHandlingMiddleware(store)(next)(action);
        expect(store.getActions()).toEqual([action]);
    });

    it('should throw an error when the action fails', () => {
        const store = mockStore({ 'some': 'value' });
        const next = store.dispatch;
        const action = { type: 'SOME_ACTION_WITH_A_FAILURE', data: { status: 404 } };

        console.error = jest.fn();
        httpRequestHandler.postRequest = jest.fn();

        const payload = {
            applicationState: { some: "value" },
            loggingLevel: 'error',
            cause: 'SOME_ACTION_WITH_A_FAILURE',
            httpStatusCode: action.data.status,
            cwaStatusCode: StatusCode.ReduxApiError,
            message: "A error occur while calling an external resource via Redux thunk",
        }

        reduxApiErrorHandlingMiddleware(store)(next)(action);
        expect(httpRequestHandler.postRequest).toBeCalledWith('/cbo/cwa/logging/log', payload)
    })
})
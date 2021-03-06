import reducer from './reducer';
import * as types from '../types'

describe('Reducer', () => {
  // When FETCH_BOOKS_PENDING is sent to the reducer,
  // it will set loading to true.
  it('Show loading when request is sent', () => {
    const initState = { loading: false };
    const action = { type: types.FETCH_BOOKS_PENDING };
    const state = reducer(initState, action);
    expect(state.loading).toBeTruthy();
  })

  // FETCH_BOOKS_SUCCESS will attach the response to the state
  // when request is successful.
  it('Add books to state when request successful', () => {
    const books = [
      { id: 1, name: 'Refactoring' },
      { id: 2, name: 'Domain-driven design' }
    ];

    const action = { type: types.FETCH_BOOKS_SUCCESS, books };
    const state = reducer([], action);
    expect(state.books).toBe(books);
  });
});
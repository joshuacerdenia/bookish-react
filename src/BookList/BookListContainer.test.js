import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BookListContainer from './BookListContainer';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import store from '../store';

it('renders', async () => {
  const mock = new MockAdapter(axios);
  mock.onGet('http://localhost:8080/books?q=').reply(200, [
    { name: 'Refactoring', id: 1 },
    { name: 'Acceptance test driven development with React', id: 2 }
  ]);
  
  const { findByText } = renderWithProvider(<BookListContainer />);
  const book1 = await findByText('Refactoring');
  const book2 = await findByText('Acceptance test driven development with React');
  expect(book1).toBeInTheDocument();
  expect(book2).toBeInTheDocument();
});

it('something went wrong', async () => {
  const mock = new MockAdapter(axios);
  mock.onGet('http://localhost:8080/books?q=').networkError();
  const { findByText } = renderWithProvider(<BookListContainer />);
  const error = await findByText('Error...');
  expect(error).toBeInTheDocument();
});

const renderWithProvider = (component) => {
  return { ...render(
    <Provider store={store}>
      <Router>{component}</Router>{}
    </Provider>
  )}
};
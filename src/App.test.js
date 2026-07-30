import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

test('renders the Home page at the root route', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /we make agriculture cool/i })
  ).toBeInTheDocument();
});

test('renders the Courses page at /courses', () => {
  window.history.pushState({}, '', '/courses');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /our popular courses/i })
  ).toBeInTheDocument();
});

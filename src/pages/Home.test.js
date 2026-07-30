import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

test('renders the hero heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /we make agriculture cool/i })
  ).toBeInTheDocument();
});

test('renders the about section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /agriculture is changing/i })
  ).toBeInTheDocument();
});

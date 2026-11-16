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

test('renders the services section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /our services/i, level: 2 })
  ).toBeInTheDocument();
});

test('renders the founder section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /meet monish gowda/i })
  ).toBeInTheDocument();
});

test('renders the why agri monk section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /why people choose agri monk/i })
  ).toBeInTheDocument();
});

test('renders the popular courses section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /our popular courses/i })
  ).toBeInTheDocument();
});

test('renders the modern agriculture section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /^explore modern agriculture$/i })
  ).toBeInTheDocument();
});

test('renders the testimonials section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /what people say/i })
  ).toBeInTheDocument();
});

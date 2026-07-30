import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Courses from './Courses';

beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

test('renders the courses page heading', () => {
  render(
    <MemoryRouter>
      <Courses />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /our popular courses/i })
  ).toBeInTheDocument();
});

test('renders all five course titles', () => {
  render(
    <MemoryRouter>
      <Courses />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { level: 3, name: /^mushroom farming$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { level: 3, name: /^hydroponics farming$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { level: 3, name: /^organic farming$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { level: 3, name: /^terrace gardening$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { level: 3, name: /^agribusiness startup$/i })
  ).toBeInTheDocument();
});

test('renders the testimonials heading', () => {
  render(
    <MemoryRouter>
      <Courses />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /what our learners say/i })
  ).toBeInTheDocument();
});

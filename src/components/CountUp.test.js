import { render, screen, act } from '@testing-library/react';
import CountUp from './CountUp';

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe() {}
  disconnect() {}
}
MockIntersectionObserver.instances = [];

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  global.IntersectionObserver = MockIntersectionObserver;
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('renders 0 with suffix before coming into view', () => {
  render(<CountUp end={132} suffix="K+" />);
  expect(screen.getByText('0K+')).toBeInTheDocument();
});

test('animates up to the end value with suffix once in view', () => {
  render(<CountUp end={132} suffix="K+" duration={200} />);

  const observer = MockIntersectionObserver.instances[0];
  act(() => {
    observer.callback([{ isIntersecting: true }]);
  });

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(screen.getByText('132K+')).toBeInTheDocument();
});

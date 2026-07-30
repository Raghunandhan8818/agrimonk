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

test('cancels the in-flight animation frame on unmount without warning', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const cancelSpy = jest.spyOn(window, 'cancelAnimationFrame');

  const { unmount } = render(<CountUp end={132} suffix="K+" duration={200} />);

  const observer = MockIntersectionObserver.instances[0];
  act(() => {
    observer.callback([{ isIntersecting: true }]);
  });

  // Let the animation start, then unmount mid-flight, before it completes.
  act(() => {
    jest.advanceTimersByTime(50);
  });

  unmount();

  // Advancing timers after unmount should not trigger any further
  // setState calls (which would log a React "act" / unmounted warning).
  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(cancelSpy).toHaveBeenCalled();
  expect(errorSpy).not.toHaveBeenCalled();

  errorSpy.mockRestore();
  cancelSpy.mockRestore();
});

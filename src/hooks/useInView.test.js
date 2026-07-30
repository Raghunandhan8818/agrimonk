import { renderHook, act } from '@testing-library/react';
import { useInView } from './useInView';

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe() {}
  disconnect() {
    this.disconnected = true;
  }
}
MockIntersectionObserver.instances = [];

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  global.IntersectionObserver = MockIntersectionObserver;
});

test('isInView starts false and flips to true once the element intersects', () => {
  const { result } = renderHook(() => useInView());
  expect(result.current.isInView).toBe(false);

  act(() => {
    result.current.ref({}); // attach a fake node so the observer is created
  });

  const observer = MockIntersectionObserver.instances[0];
  act(() => {
    observer.callback([{ isIntersecting: true }]);
  });

  expect(result.current.isInView).toBe(true);
});

test('disconnects the observer after the element has come into view once', () => {
  const { result } = renderHook(() => useInView());

  act(() => {
    result.current.ref({});
  });

  const observer = MockIntersectionObserver.instances[0];
  act(() => {
    observer.callback([{ isIntersecting: true }]);
  });

  expect(observer.disconnected).toBe(true);
});

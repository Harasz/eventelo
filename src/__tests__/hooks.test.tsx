import { renderHook, act } from "@testing-library/react-hooks";
import { useEmit, useSubscriber } from "../index";

const EVENT_NAME = "test";
const EVENT_NAME_2 = "test2";

describe("hooks should", () => {
  test("call useSubscriber callback", () => {
    const { result: subscriber } = renderHook(() => useSubscriber());
    const { result: emit } = renderHook(() => useEmit());

    const callback = jest.fn();

    act(() => {
      subscriber.current.subscribe(EVENT_NAME, callback);
    });

    act(() => {
      emit.current.emit(EVENT_NAME);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("call useSubscriber callback with data", () => {
    const { result: subscriber } = renderHook(() => useSubscriber());
    const { result: emit } = renderHook(() => useEmit());

    const DATA = "data";
    const callback = jest.fn();

    act(() => {
      subscriber.current.subscribe(EVENT_NAME, callback);
    });

    act(() => {
      emit.current.emit(EVENT_NAME, DATA);
    });

    expect(callback).toBeCalledWith(DATA);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("unsubscribe all be event name", () => {
    const { result: subscriber } = renderHook(() => useSubscriber());
    const { result: emit } = renderHook(() => useEmit());

    let called = -1;
    const callback = jest.fn();

    act(() => {
      subscriber.current.subscribe(EVENT_NAME_2, callback);
    });

    act(() => {
      subscriber.current.unsubscribeAll(EVENT_NAME);
    });

    act(() => {
      called = emit.current.emit(EVENT_NAME);
    });

    act(() => {
      emit.current.emit(EVENT_NAME_2);
    });

    expect(called).toBe(0);
    expect(callback).toBeCalledTimes(1);
  });

  test("unsubscribe all", () => {
    const { result: subscriber } = renderHook(() => useSubscriber());
    const { result: emit } = renderHook(() => useEmit());

    let called1 = -1;
    let called2 = -1;
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    act(() => {
      subscriber.current.subscribe(EVENT_NAME, callback1);
    });

    act(() => {
      subscriber.current.subscribe(EVENT_NAME_2, callback2);
    });

    act(() => {
      emit.current.emit(EVENT_NAME);
    });

    act(() => {
      emit.current.emit(EVENT_NAME_2);
    });

    act(() => {
      subscriber.current.unsubscribeAll();
    });

    act(() => {
      called1 = emit.current.emit(EVENT_NAME);
    });

    act(() => {
      called2 = emit.current.emit(EVENT_NAME_2);
    });

    expect(called1).toBe(0);
    expect(called2).toBe(0);
    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);
  });

  test("unsubscribe be key", () => {
    const { result: subscriber } = renderHook(() => useSubscriber());
    const { result: emit } = renderHook(() => useEmit());

    let key: symbol;
    let called = 0;
    const callback = jest.fn();

    act(() => {
      key = subscriber.current.subscribe(EVENT_NAME, callback);
    });

    act(() => {
      called = emit.current.emit(EVENT_NAME);
    });

    expect(called).toBe(1);

    act(() => {
      subscriber.current.unsubscribe(key);
    });

    act(() => {
      called = emit.current.emit(EVENT_NAME);
    });

    expect(callback).toBeCalledTimes(1);
    expect(called).toBe(0);
  });
});

import { EventeloSource } from "../eventeloSource";
import { SubscribeFunction, UnsubscribeFunction } from "../eventeloSource.interfaces";

interface UseSubscriberReturnType {
  subscribe: SubscribeFunction;
  unsubscribe: UnsubscribeFunction;
  unsubscribeAll: () => void;
}

export function useSubscriber(): UseSubscriberReturnType {
  const subscribe = EventeloSource.subscribe;
  const unsubscribe = EventeloSource.unsubscribe;
  const unsubscribeAll = EventeloSource.unsubscribeAll;

  return { subscribe, unsubscribe, unsubscribeAll };
}

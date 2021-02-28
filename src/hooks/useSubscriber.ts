import { EventeloSource } from "../eventeloSource";
import {
  SubscribeFunction,
  UnsubscribeFunction,
  UnsubscribeAllFunction,
} from "../eventeloSource.interfaces";

interface UseSubscriberReturnType {
  subscribe: SubscribeFunction;
  unsubscribe: UnsubscribeFunction;
  unsubscribeAll: UnsubscribeAllFunction;
}

export function useSubscriber(): UseSubscriberReturnType {
  const subscribe = EventeloSource.subscribe;
  const unsubscribe = EventeloSource.unsubscribe;
  const unsubscribeAll = EventeloSource.unsubscribeAll;

  return { subscribe, unsubscribe, unsubscribeAll };
}

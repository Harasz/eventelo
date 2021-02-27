import {
  EventMap,
  SubscribeFunction,
  UnsubscribeFunction,
  UnsubscribeAllFunction,
  Subscriber,
  EmitFunction,
} from "./eventeloSource.interfaces";

interface EventeloSource {
  eventMap: EventMap;
  subscribe: SubscribeFunction;
  unsubscribe: UnsubscribeFunction;
  unsubscribeAll: UnsubscribeAllFunction;
  emit: EmitFunction;
}

export const EventeloSource: EventeloSource = {
  eventMap: {},

  subscribe: function (eventName, callback) {
    console.log(EventeloSource);
    const key = Symbol(eventName);
    const subscriber: Subscriber = {
      key,
      eventName,
      callback,
    };

    if (!(eventName in EventeloSource.eventMap)) {
      EventeloSource.eventMap[eventName] = [];
    }

    EventeloSource.eventMap[eventName].push(subscriber);

    return key;
  },

  unsubscribe: function (key) {
    const eventNames = Object.keys(EventeloSource.eventMap);

    for (const eventName of eventNames) {
      EventeloSource.eventMap[eventName] = EventeloSource.eventMap[eventName].filter(
        (subscriber) => subscriber.key !== key,
      );
    }
  },

  unsubscribeAll: function () {
    EventeloSource.eventMap = {};
  },

  emit: function (eventName, callbackData) {
    if (!(eventName in EventeloSource.eventMap)) {
      return 0;
    }

    EventeloSource.eventMap[eventName].forEach((subscriber) => {
      subscriber.callback(callbackData);
    });

    return EventeloSource.eventMap[eventName].length;
  },
};

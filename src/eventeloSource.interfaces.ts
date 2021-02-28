export type EventName = string;
export type Callback<CallbackData = unknown> = (data?: CallbackData) => void;

export interface Subscriber<CallbackData = unknown> {
  key: symbol;
  eventName: EventName;
  callback: Callback<CallbackData>;
}

export type EventMap = Record<string, Subscriber[]>;

export type SubscribeFunction<DataType = unknown> = (
  eventName: EventName,
  callback: Callback<DataType>,
) => symbol;
export type UnsubscribeFunction = (key: symbol) => void;
export type UnsubscribeAllFunction = (eventName?: EventName) => void;
export type EmitFunction<DataType = unknown> = (
  eventName: EventName,
  callbackData?: DataType,
) => number;

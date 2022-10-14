export interface Event<TEventType, TEventData> {
    type: TEventType;
    data: TEventData;
}
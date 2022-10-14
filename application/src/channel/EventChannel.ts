export interface EventChannel<TEvent> {
    add(event: TEvent): void;
}
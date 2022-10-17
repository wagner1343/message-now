import {CreatedEvent, DeletedEvent, UpdatedEvent} from "./events";

export type EntityEvent<TEventType, TEntity> =
    CreatedEvent<TEventType, TEntity>
    | UpdatedEvent<TEventType, TEntity>
    | DeletedEvent<TEventType, TEntity>;

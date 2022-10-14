import {CreatedEvent} from "./events/CreatedEvent";
import {UpdatedEvent} from "./events/UpdatedEvent";
import {DeletedEvent} from "./events/DeletedEvent";

export type EntityEvent<TEventType, TEntity> =
    CreatedEvent<TEventType, TEntity>
    | UpdatedEvent<TEventType, TEntity>
    | DeletedEvent<TEventType, TEntity>;

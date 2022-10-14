import {Event} from "../../event/Event";

export interface UpdatedEvent<TEventType, TEntity> extends Event<TEventType, {before: TEntity, after: TEntity}> {

}

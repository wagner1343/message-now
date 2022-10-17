import {Event} from "../../event";

export interface UpdatedEvent<TEventType, TEntity> extends Event<TEventType, { before: TEntity, after: TEntity }> {

}

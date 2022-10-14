import {CreatedEvent} from "../entity/events/CreatedEvent";
import {UpdatedEvent} from "../entity/events/UpdatedEvent";
import {DeletedEvent} from "../entity/events/DeletedEvent";
import {Message} from "./Message";

export type MessageEvent =
    CreatedEvent<"message-created", Message>
    | UpdatedEvent<"message-updated", Message>
    | DeletedEvent<"message-deleted", Message>;

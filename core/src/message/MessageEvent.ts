import {Message} from "./Message";
import {CreatedEvent, DeletedEvent, UpdatedEvent} from "../entity";

export type MessageEvent =
    CreatedEvent<"message-created", Message>
    | UpdatedEvent<"message-updated", Message>
    | DeletedEvent<"message-deleted", Message>;

import {CreatedEvent} from "../entity/events/CreatedEvent";
import {UpdatedEvent} from "../entity/events/UpdatedEvent";
import {DeletedEvent} from "../entity/events/DeletedEvent";
import {Conversation} from "./Conversation";

export type ConversationEvent =
    CreatedEvent<"conversation-created", Conversation>
    | UpdatedEvent<"conversation-updated", Conversation>
    | DeletedEvent<"conversation-deleted", Conversation>;

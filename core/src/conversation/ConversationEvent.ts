import {Conversation} from "./Conversation";
import {CreatedEvent, DeletedEvent, UpdatedEvent} from "../entity";

export type ConversationEvent =
    CreatedEvent<"conversation-created", Conversation>
    | UpdatedEvent<"conversation-updated", Conversation>
    | DeletedEvent<"conversation-deleted", Conversation>;

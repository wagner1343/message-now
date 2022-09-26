import {Conversation, Create, IConversation} from "@message_now/core";
import {EntityRepository} from "./EntityRepository";

export interface ConversationRepository extends EntityRepository<Conversation, Create<IConversation>> {

}
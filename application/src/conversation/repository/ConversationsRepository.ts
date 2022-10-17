import {Conversation, Create, IConversation} from "@message_now/core";
import {EntityRepository} from "../../entity";

export interface ConversationsRepository extends EntityRepository<Conversation, Create<IConversation>> {

}
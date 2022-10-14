import {EntityRepository} from "../../entity/EntityRepository";
import {Create, IMessage, Message} from "@message_now/core";

export interface MessagesRepository extends EntityRepository<Message, Create<IMessage>> {
}
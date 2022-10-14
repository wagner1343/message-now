import {appGetConversation} from "@message_now/application";
import makeFirebaseConversationsRepository from "../../repositories/makeFirebaseConversationsRepository";

export const makeGetConversation = () => appGetConversation(makeFirebaseConversationsRepository());
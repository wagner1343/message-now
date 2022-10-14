import {
    appListConversationsForUser
} from "@message_now/application";
import makeFirebaseConversationsRepository from "../../repositories/makeFirebaseConversationsRepository";

const makeListConversationsForUser = () => appListConversationsForUser(
    makeFirebaseConversationsRepository(),
)

export default makeListConversationsForUser;

import {Conversation, IConversation} from "@message_now/core";
import {ConversationsRepository} from "./repository";
import {UserEventChannelFactory} from "../channel";
import {broadcastUserEvent} from "../channel";

export const updateConversation = async (
    conversationId: string,
    conversation: Partial<IConversation>,
    conversationRepository: ConversationsRepository,
    userChannelFactory: UserEventChannelFactory
): Promise<Conversation> => {
    const conversationBefore = await conversationRepository.get(conversationId);
    await conversationRepository.update(conversationId, conversation);
    const conversationAfter = await conversationRepository.get(conversationId);
    const participantsSetBefore = new Set(conversationBefore.participants);
    const participantsSetAfter = new Set(conversationAfter.participants);
    const allParticipants = Array.from(new Set([...conversationAfter.participants, ...conversationBefore.participants]));
    const targetParticipants = allParticipants.filter((p) => participantsSetAfter.has(p) && participantsSetBefore.has(p));
    await broadcastUserEvent({
        type: "conversation-updated",
        data: {
            after: conversationAfter,
            before: conversationBefore
        }
    }, targetParticipants, userChannelFactory);
    return conversationAfter;
};

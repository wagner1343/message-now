import React from 'react';
import useConversationMessages from 'src/hooks/messages/useConversationMessages';
import {Conversation} from "@message_now/core";

function MessagesList({conversation}: { conversation: Conversation }) {
    const {ordered: messages} = useConversationMessages(conversation.id);
    console.log("messages", messages);
    return (
        <>
            {messages?.map((m) => <div key={m.id}>{m.body}</div>)}
        </>
    );
}

export default MessagesList;
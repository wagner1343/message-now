import React from 'react';
import {Grid} from "@mui/material";
import ConversationHeader from 'src/ui/pages/Home/components/ConversationComponent/ConversationHeader';
import MessageInputField from "src/ui/pages/Home/components/ConversationComponent/MessageInputField";
import {Conversation} from "@message_now/core";
import MessagesList from "src/ui/pages/Home/components/ConversationComponent/MessagesList";

interface ConversationComponentProps {
    conversation: Conversation
}

function ConversationComponent({conversation}: ConversationComponentProps) {
    return (
        <Grid container direction={"column"} height={"100%"}>
            <ConversationHeader conversation={conversation}/>
            <Grid item flexGrow={1}>
                {conversation.isNotCreated || (<MessagesList conversation={conversation}/>)}
            </Grid>
            <MessageInputField/>
        </Grid>
    );
}

export default ConversationComponent;

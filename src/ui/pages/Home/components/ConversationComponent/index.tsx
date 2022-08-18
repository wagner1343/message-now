import React from 'react';
import {Grid} from "@mui/material";
import ConversationHeader from './ConversationHeader';
import {Profile} from "src/models/Profile";
import {Message} from "@twilio/conversations";
import MessageInputField from "src/ui/pages/Home/components/MessageInputField";

interface ConversationComponentProps {
    contactProfile: Profile;
    messages?: Message[];
    loadMoreMessages: Promise<any>;
    sendMessage: (message: string) => Promise<any>;

}

function ConversationComponent({contactProfile, loadMoreMessages, messages, sendMessage}: ConversationComponentProps) {
    const {}
    return (
        <Grid container>
            <ConversationHeader contactProfile={contactProfile}/>
            <div>
                {messages?.map((m) => <div>{m.body ?? "mensagem"}</div>)}
            </div>
            <MessageInputField  />
        </Grid>
    );
}

export default ConversationComponent;

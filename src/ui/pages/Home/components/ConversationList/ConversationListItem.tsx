import React, {ReactNode} from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

interface ConversationListItemProps {
    title: ReactNode;
    lastMessage: ReactNode;
    lastMessageOutbound?: boolean;
    avatar: ReactNode;
}

function ConversationListItem({
                                  lastMessageOutbound,
                                  title,
                                  lastMessage,
                                  avatar
                              }: ConversationListItemProps) {
    return (
        <ListItem
        button
        >
            <ListItemAvatar>
                {avatar}
            </ListItemAvatar>
            <ListItemText
            primary={title}
            secondary={`${lastMessageOutbound ? "-> " : ""}${lastMessage}`}
            />
        </ListItem>
    );
}

export default ConversationListItem;
import React, {Key, MouseEventHandler, ReactNode} from 'react';
import {ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

interface ConversationListItemProps {
    key?: Key;
    title: ReactNode;
    lastMessage: ReactNode;
    lastMessageOutbound?: boolean;
    avatar: ReactNode;
    onClick?: MouseEventHandler;
    isSelected?: boolean;
}

function ConversationListItem({
                                  isSelected,
                                  onClick,
                                  key,
                                  lastMessageOutbound,
                                  title,
                                  lastMessage,
                                  avatar
                              }: ConversationListItemProps) {
    return (
        <ListItemButton
            selected={isSelected}
            key={key}
            onClick={onClick}
        >
            <ListItemAvatar>
                {avatar}
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={`${lastMessageOutbound ? "-> " : ""}${lastMessage}`}
            />
        </ListItemButton>
    );
}

export default ConversationListItem;
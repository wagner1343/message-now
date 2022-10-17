import React, {Key, MouseEventHandler, ReactNode} from 'react';
import {ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

function ContactListItem({key, onClick, name, avatar}: {
    key?: Key,
    onClick?: MouseEventHandler,
    name: ReactNode,
    avatar: ReactNode
}) {
    return (
        <ListItemButton key={key} onClick={onClick}>
            <ListItemAvatar>
                {avatar}
            </ListItemAvatar>
            <ListItemText
                primary={name}
            />
        </ListItemButton>
    );
}

export default ContactListItem;
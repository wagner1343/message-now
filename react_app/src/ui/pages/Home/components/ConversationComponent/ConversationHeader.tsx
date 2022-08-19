import React from 'react';
import {Avatar, Grid, IconButton, ListItemText} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import useAuth from "src/hooks/auth/useAuth";
import {Conversation} from "@message_now/core";

interface ConversationHeaderProps {
    conversation: Conversation;
}

function ConversationHeader({conversation}: ConversationHeaderProps) {
    const {auth: {uid}} = useAuth();
    return (
        <Grid
            style={{borderLeft: "1px solid rgba(0, 0, 0, .1)"}}
            height={64}
            container
            paddingX={2}
            paddingY={1}
            width={"100%"}
            direction={"row"}
            alignItems={"center"}
        >
            <Grid style={{height: "100%"}} item paddingRight={2}>
                <Avatar src={conversation.avatarUrl}/>
            </Grid>
            <Grid item>
                <ListItemText
                    primary={conversation.getTitle(uid)}
                    secondary={"Visto por ultimo ontem às 00:00"}
                />
            </Grid>
            <Grid item flexGrow={1}/>
            <Grid item>
                <IconButton onClick={() => {
                }}>
                    <SearchIcon/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={() => {
                }}>
                    <MoreVertIcon/>
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default ConversationHeader;
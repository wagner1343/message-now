import React from 'react';
import {Avatar, Divider, Grid, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useAuth from "src/hooks/auth/useAuth";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function ConversationListHeader(props) {
    const {profile} = useAuth();
    return (
        <Grid height={64} container paddingX={2} paddingY={1} width={"100%"} direction={"row"} alignItems={"center"}>
            <Grid item >
                <Avatar src={profile.avatarUrl}/>
            </Grid>
            <Grid item flexGrow={1} />

            <Grid item>
                <IconButton onClick={() => {}}>
                    <PersonAddIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={() => {}}>
                    <MoreVertIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default ConversationListHeader;
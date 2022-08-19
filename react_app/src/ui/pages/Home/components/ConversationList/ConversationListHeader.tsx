import React, {useState} from 'react';
import {Avatar, Divider, Grid, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useAuth from "src/hooks/auth/useAuth";
import MessageIcon from '@mui/icons-material/Message';
import StartConversationDialog from "src/ui/components/StartConversationDialog";

function ConversationListHeader(props) {
    const {profile, logout} = useAuth();
    const [isCreateConversationDialogOpen, setIsCreateConversationDialogOpen] = useState<boolean>(false);
    return (
        <Grid height={64} container paddingX={2} paddingY={1} width={"100%"} direction={"row"} alignItems={"center"}>
            <Grid item >
                <Avatar src={profile.avatarUrl}/>
            </Grid>
            <Grid item flexGrow={1} />

            <Grid item>
                <StartConversationDialog isOpen={isCreateConversationDialogOpen} onClose={() => setIsCreateConversationDialogOpen(false)} />
                <IconButton onClick={() => setIsCreateConversationDialogOpen(!isCreateConversationDialogOpen)}>
                    <MessageIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={() => logout()}>
                    <MoreVertIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default ConversationListHeader;
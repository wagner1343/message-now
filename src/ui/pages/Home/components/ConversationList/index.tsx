import {Grid, List, ListItem, ListItemAvatar} from '@mui/material';
import React from 'react';
import ConversationListHeader from "src/ui/pages/Home/components/ConversationListHeader";
import ConversationListItem from "src/ui/pages/Home/components/ConversationListItem";
import {useConversations} from "src/ui/components/ConversationsProvider";
import ConversationListItemContainer from "src/ui/pages/Home/components/ConversationListItemContainer";

function ConversationsList(props) {
    const {conversations} = useConversations();
    return (
        <Grid width={"100%"} container>
            <Grid width={"100%"} item>
                <ConversationListHeader/>
            </Grid>
            <Grid width={"100%"} item flexGrow={1}>
                <List>
                    {conversations?.map((c) => <ConversationListItemContainer conversation={c}/>)}
                </List>
            </Grid>
        </Grid>
    );
}

export default ConversationsList;

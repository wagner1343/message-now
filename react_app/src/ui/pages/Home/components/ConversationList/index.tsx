import {Grid, List} from '@mui/material';
import React from 'react';
import ConversationListHeader from "src/ui/pages/Home/components/ConversationList/ConversationListHeader";
import {useConversationsProvider} from "src/ui/components/ConversationsProvider";
import ConversationListItemContainer from "src/ui/pages/Home/components/ConversationList/ConversationListItemContainer";

function ConversationsList(props) {
    const {conversations} = useConversationsProvider();
    console.log("conversations", conversations);
    return (
        <Grid width={"100%"} container>
            <Grid width={"100%"} item>
                <ConversationListHeader/>
            </Grid>
            <Grid width={"100%"} item flexGrow={1}>
                <List>
                    {conversations?.map((c) => <ConversationListItemContainer key={c.id} conversation={c}/>)}
                </List>
            </Grid>
        </Grid>
    );
}

export default ConversationsList;

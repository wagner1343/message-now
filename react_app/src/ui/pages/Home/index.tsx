import React from 'react';
import {Card, Grid} from "@mui/material";
import ConversationList from "src/ui/pages/Home/components/ConversationList";
import ConversationComponent from "src/ui/pages/Home/components/ConversationComponent";
import {useConversationsProvider} from "src/ui/components/ConversationsProvider";

function Home() {
    const {selectedConversation} = useConversationsProvider();
    return (
        <Card style={{height: "100%"}}>
            <Grid height={"100%"} width={"100%"} container direction={"row"}>
                <Grid height={"100%"} width={480} item>
                    <ConversationList/>
                </Grid>
                <Grid height={"100%"} item flexGrow={1}>
                    {selectedConversation && (<ConversationComponent conversation={selectedConversation}/>)}
                </Grid>
            </Grid>
        </Card>
    );
}

export default Home;
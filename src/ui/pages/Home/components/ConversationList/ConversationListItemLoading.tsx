import React from 'react';
import ConversationListItem from "src/ui/pages/Home/components/ConversationListItem";
import {Skeleton} from "@mui/material";

function ConversationListItemLoading() {
    return (
        <ConversationListItem title={<Skeleton width={100}/>} lastMessage={
            <Skeleton width={200}/>
        } avatar={<Skeleton variant={"circular"}/>}/>
    );
}

export default ConversationListItemLoading;
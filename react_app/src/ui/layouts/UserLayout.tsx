import React from 'react';
import {Grid, Theme, useMediaQuery} from "@mui/material";
import ConversationsProvider from "src/ui/components/ConversationsProvider";

function UserLayout({children}) {
    const isXlUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));
    return (
        <ConversationsProvider>
            <Grid height={"100%"} container justifyContent={"center"} alignItems={"center"}>
                <Grid paddingY={isXlUp ? 2 : 0} width={"100%"} height={"100%"} item maxWidth={"xl"}>
                    {children}
                </Grid>
            </Grid>
        </ConversationsProvider>
    );
}

export default UserLayout;
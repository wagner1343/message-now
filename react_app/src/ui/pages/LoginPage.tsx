import React from 'react';
import {Button, Card, Grid} from "@mui/material";
import useAuth from "src/hooks/auth/useAuth";

function LoginPage() {
    const {signInWithGoogle} = useAuth();
    return (
        <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid item>
                <Card>
                    <Button onClick={() => signInWithGoogle()}>
                        Login with google
                    </Button>
                </Card>
            </Grid>
        </Grid>
    );
}

export default LoginPage;
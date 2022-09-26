import React, {useState} from 'react';
import {
    Avatar, Box, Button,
    Chip,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    TextField,
    Typography
} from "@mui/material";
import useAuth from "src/hooks/auth/useAuth";
import ContactContainer from "src/ui/components/ContactContainer";
import {useConversationsProvider} from "src/ui/components/ConversationsProvider";
import {Profile} from "@message_now/core";

function StartConversationDialog({isOpen, onClose}: {
    isOpen: boolean,
    onClose?: any
}) {
    const {
        userDataDoc: {
            data: userData
        }
    } = useAuth();
    const {createConversation, setSelectedConversation} = useConversationsProvider();
    const [selectedContacts, setSelectedContacts] = useState<Profile[]>([]);
    const [conversationTitle, setConversationTitle] = useState<string>("");
    const [isCreatingConversation, setIsCreatingConversation] = useState<boolean>(false);
    const isContactSelectedMap = selectedContacts.reduce<Record<string, boolean>>((map, profile) => ({
            ...map,
            [profile.id]: true
        })
        , {});

    const availableContacts = userData?.contacts?.filter((contactId) => !isContactSelectedMap[contactId]) ?? [];

    const handleSelectContact = (contact: Profile) => {
        setSelectedContacts((contacts) => ([...contacts, contact]));
    }

    const handleUnselectContact = (contact: Profile) => {
        setSelectedContacts(
            (contacts) => contacts.filter(
                (c) => c.id !== contact.id)
        );
    }

    const handleCreateConversation = async () => {
        try {
            setIsCreatingConversation(true);
            const createdConversation = await createConversation(conversationTitle, selectedContacts.map((c) => c.id));
            setSelectedConversation(createdConversation);
            onClose();
        } catch (e) {
            console.log(e);
        } finally {
            setIsCreatingConversation(false);
        }
    }
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={"sm"} fullWidth>
            <DialogTitle>
                Start a conversation
            </DialogTitle>
            <DialogContent>
                <Typography variant={"h6"}>
                    Name
                </Typography>
                <TextField
                    value={conversationTitle}
                    onChange={(e) => setConversationTitle(e.target.value)}
                    placeholder={"Conversation name..."}
                    fullWidth
                />
                <Box height={24}/>
                <Typography variant={"h6"}>
                    Participants
                </Typography>
                {selectedContacts.length === 0 && (
                    <Typography>Add participants</Typography>
                )}
                {
                    selectedContacts.map((c) => (
                        <Chip
                            avatar={<Avatar src={c.avatarUrl}/>}
                            label={c.name}
                            onDelete={() => handleUnselectContact(c)}/>
                    ))
                }
                <Box height={24}/>
                <Typography variant={"h6"}>
                    Contacts
                </Typography>
                <div style={{
                    height: 300,
                    overflowY: "scroll",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {availableContacts.length === 0 && (
                        <div>
                        <Button>
                            Add contact
                        </Button>
                        </div>
                    )}
                    {availableContacts.length > 0 && (
                        <List style={{width: "100%", alignSelf: "start"}}>
                            {availableContacts.map((contactId) => (
                                <ContactContainer
                                    onClick={handleSelectContact}
                                    contactId={contactId}
                                    key={contactId}
                                />))}
                        </List>
                    )}
                </div>
                <div style={{
                    paddingTop: 12,
                    display: "flex",
                    justifyContent: "end"
                }}>
                    <Button variant={"contained"} onClick={handleCreateConversation}>
                        Create
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default StartConversationDialog;
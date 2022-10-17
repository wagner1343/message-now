import React, {useState} from 'react';
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useFirestore} from "react-redux-firebase";
import useAuth from "src/hooks/auth/useAuth";
import {Profile} from "@message_now/core";

interface AddContactDialogProps {
    isOpen: boolean;
    onClose?: any;
}

function AddContactDialog({isOpen, onClose}: AddContactDialogProps) {
    const firestore = useFirestore();
    const {
        userDataDoc: {
            data: userData
        }, addContact
    } = useAuth();
    const [contactNotFound, setContactNotFound] = useState<boolean>(false);
    const [contactProfile, setContactProfile] = useState<Profile>();
    const [loading, setLoading] = useState<boolean>(false);
    const [addingContact, setAddingContact] = useState<boolean>(false);
    const [profileId, setProfileId] = useState<string>("");
    const contactAlreadyExists = userData?.contacts?.some((c) => c === profileId);

    const fetchContactProfile = async (profileId: string) => {
        try {
            setLoading(true);
            setContactProfile(undefined);
            setContactNotFound(false);

            const profileDoc = await firestore.collection("profiles").doc(profileId).get();
            console.log(profileDoc);
            if (profileDoc.exists) {
                setContactProfile(profileDoc.data as unknown as Profile);
            } else {
                setContactNotFound(true);
            }
        } catch (e) {
            setContactNotFound(true);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const handleSearchContact = () => {
        fetchContactProfile(profileId);
    }

    const handleAddContact = async (contactProfile: Profile) => {
        try {
            setAddingContact(true);
            await addContact(contactProfile.id);
            onClose();
        } catch (e) {
            console.log(e);
            setContactNotFound(true);
        } finally {
            setAddingContact(false);
        }
    }

    const renderSearchButton = () => {
        if (loading) {
            return <Button disabled>Searching</Button>
        }
        if (contactAlreadyExists) {
            return <Button disabled>Already added</Button>
        }
        if (contactProfile) {
            return <Button onClick={() => handleAddContact(contactProfile)}>Add contact</Button>;
        }

        return <Button disabled={!profileId} onClick={handleSearchContact}>Search</Button>;
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                Add a contact
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Type your contact id to add it to your contacts list
                </DialogContentText>
                <TextField
                    value={profileId}
                    onChange={(e) => setProfileId(e.target.value)}
                />
                {renderSearchButton()}
            </DialogContent>

        </Dialog>
    );
}

export default AddContactDialog;
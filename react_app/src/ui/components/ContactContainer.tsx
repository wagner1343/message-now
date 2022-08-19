import React, {Key} from 'react';
import ContactListItem from "src/ui/components/ContactListItem";
import useContact from "src/hooks/contacts/useContact";
import {Avatar, Skeleton} from "@mui/material";
import {Profile} from "@message_now/core";

function ContactContainer({key, contactId, onClick}: {
    key?: Key;
    contactId: string;
    onClick: (contact: Profile) => any;
}) {
    const {data: contact} = useContact(contactId);
    return (
        contact
            ? <ContactListItem
                key={key}
                onClick={() => onClick(contact)}
                name={contact.name}
                avatar={<Avatar src={contact.avatarUrl}/>}
            />
            : <ContactListItem
                key={key}
                name={<Skeleton/>}
                avatar={<Skeleton variant={"circular"}/>}
            />
    );
}

export default ContactContainer;
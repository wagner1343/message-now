import useDocument from "src/hooks/firebase/useDocument";
import {Profile} from "@message_now/core";

export default function useContact(contactId: string) {
    const contactDoc = useDocument<Profile>("profiles", contactId);

    return {
        ...contactDoc
    }
}
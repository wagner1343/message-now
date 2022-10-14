import {UserEventChannelFactory} from "@message_now/application";

export const makeLoggingEventChannelFactory = (): UserEventChannelFactory => ((userId) => ({
    add: (event) => {
        console.log(`user #${userId}`, event);
    }
}));

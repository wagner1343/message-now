import {UserEvent} from "./UserEvent";
import {UserEventChannelFactory} from "./UserEventChannelFactory";

export const broadcastUserEvent = (event: UserEvent, targetUsers: string[], userChannelFactory: UserEventChannelFactory) => {
    targetUsers.map(
        (participantId) =>
            userChannelFactory(participantId)
                .add(event));
}
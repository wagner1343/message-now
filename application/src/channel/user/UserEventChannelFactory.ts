import {UserEventChannel} from "./UserEventChannel";

export interface UserEventChannelFactory {
    (userId: string): UserEventChannel;
}

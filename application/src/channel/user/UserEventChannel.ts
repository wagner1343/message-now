import {EventChannel} from "../EventChannel";
import {UserEvent} from "./UserEvent";

export interface UserEventChannel extends EventChannel<UserEvent> {
}
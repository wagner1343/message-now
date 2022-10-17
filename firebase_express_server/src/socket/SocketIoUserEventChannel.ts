import { Server } from "socket.io";
import {EventChannel, UserEvent} from "@message_now/application/src";

export class SocketIoUserEventChannel implements EventChannel<UserEvent>{
    private readonly io: Server;
    private readonly roomName: string;

    constructor(io: Server, roomName: string) {
        this.io = io;
        this.roomName = roomName;
    }

    add(event: UserEvent): void {
        this.io.to(this.roomName).emit(event.type, event.data);
    }

}
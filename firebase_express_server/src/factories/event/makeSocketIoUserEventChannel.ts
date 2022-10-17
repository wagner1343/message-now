import {SocketIoUserEventChannel} from "../../socket/SocketIoUserEventChannel";
import {UserEventChannelFactory} from "@message_now/application/src";
import {makeSocketIoServer} from "../socket/makeSocketIoServer";

export const makeSocketIoUserEventChannel = (): UserEventChannelFactory => ((userId) => new SocketIoUserEventChannel(makeSocketIoServer(), userId));

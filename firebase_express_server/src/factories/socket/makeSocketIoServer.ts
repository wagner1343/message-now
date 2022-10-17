import {Server} from "socket.io";
import {makeHttpServer} from "../http/makeHttpServer";

const instance = new Server(makeHttpServer(),  {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

export const makeSocketIoServer = () => instance;
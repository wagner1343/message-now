import MessageMeta from "src/models/message_meta";

export default interface Message {
    body: string;
    createdAt: Date;
    meta: MessageMeta;
    authorId: string;
}
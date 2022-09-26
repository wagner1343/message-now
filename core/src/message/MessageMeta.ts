export interface IMessageMeta {
    readBy: string[];
    deliveredTo: string[];
}
export class MessageMeta {
    readBy: string[];
    deliveredTo: string[];

    constructor(messageMeta: IMessageMeta) {
        this.readBy = messageMeta.readBy;
        this.deliveredTo = messageMeta.deliveredTo;
    }
}
export interface IEntity {
    id: string;
}

export class Entity {
    id: string;

    constructor(entity: IEntity) {
        this.id = entity.id;
    }
}


export type Create<T> = Omit<T, "id">;

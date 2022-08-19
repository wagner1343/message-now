import {Entity} from "src/entity/Entity";

export abstract class Profile extends Entity {
    name: string;
    avatarUrl?: string;
}

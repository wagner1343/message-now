import {Model} from "src/models/model";

export interface Profile extends Model {
    name: string;
    avatarUrl?: string;
}

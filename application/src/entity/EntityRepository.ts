import {Repository} from "../repository/Repository";
import {EntityQuery} from "./EntityQuery";

export interface EntityRepository<TEntity, TCreate> extends Repository<TEntity, TCreate, Partial<TEntity>, string, EntityQuery<TEntity>> {
}
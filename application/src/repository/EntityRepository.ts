import {Repository} from "./Repository";

export interface EntityRepository<TEntity, TCreate> extends Repository<TEntity, TCreate, Partial<TEntity>, string> {

}
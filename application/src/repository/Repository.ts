import {Query} from "./query";

export interface Repository<TEntity, TCreate, TUpdate, TKey, TQuery extends Query<any>> {
    get(id: TKey): Promise<TEntity>;

    save(t: TCreate): Promise<TEntity>;

    delete(id: TKey): Promise<void>;

    update(id: TKey, t: TUpdate): Promise<void>;

    put(id: TKey, t: TEntity): Promise<void>;

    list(query: TQuery): Promise<TEntity[]>;
}

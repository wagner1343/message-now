import {Query, WhereClause} from "../repository/query/Query";

type EntityWhereClause<TEntity> = WhereClause<keyof TEntity>;

export interface EntityQuery<TEntity> extends Query<EntityWhereClause<TEntity>> {

}
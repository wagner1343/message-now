export interface Query<TWhereClause extends WhereClause<any>> {
    whereClauses?: TWhereClause[];
    limit?: number;
    offset?: number;
}

export interface WhereClause<TFields extends string | number | symbol> {
    field: TFields;
    operator: WhereOperator;
    value: any;
}

type WhereOperator =
    | '<'
    | '=='
    | '!='
    | '>'
    | 'array-contains'
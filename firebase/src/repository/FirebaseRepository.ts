import firebaseAdmin from "firebase-admin";
import CollectionReference = firebaseAdmin.firestore.CollectionReference;
import {EntityRepository} from "@message_now/application";
import {EntityQuery} from "@message_now/application";

export class FirebaseRepository<TEntity>
    implements EntityRepository<TEntity, TEntity> {
    collection: CollectionReference<TEntity>;

    constructor(collection: CollectionReference<TEntity>) {
        this.collection = collection;
    }

    async list({limit, offset, whereClauses}: EntityQuery<TEntity>): Promise<TEntity[]> {
        const collectionQuery = whereClauses
            .reduce(
                (q, clause) =>
                    q.where(clause.field.toString(), clause.operator, clause.value),
                this.collection);
        return (await collectionQuery
            .limit(limit ?? 10)
            .offset(offset ?? 0)
            .get()).docs.map(d => d.data());
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }

    async get(id: string): Promise<TEntity> {
        return (await this.collection.doc(id).get()).data();
    }

    async put(id: string, t: TEntity): Promise<void> {
        await this.collection.doc(id).set(t)
    }

    async save(t: TEntity): Promise<TEntity> {
        const doc = this.collection.doc();
        await doc.set(t);
        return (await doc.get()).data();
    }

    async update(id: string, t: Partial<TEntity>): Promise<void> {
        await this.collection.doc(id).update(t);
    }

}
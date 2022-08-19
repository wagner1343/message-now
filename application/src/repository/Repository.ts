export interface Repository<T> {
    get(id: string): Promise<T>;
    save(t: T): Promise<T>;
    delete(id: string): Promise<void>;
    update(id: string, t: Partial<T>): Promise<T>;
    put(id: string, t: T): Promise<T>;
}
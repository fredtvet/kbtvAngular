export interface DbSync<T> {
    entities: T[];
    deletedEntities: number[];
    timestamp: number;
};
  
export type NewEntity<T> = Omit<T, 'id'>;

export type Identifiable = { id: number };

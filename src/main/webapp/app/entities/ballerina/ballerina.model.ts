export interface IBallerina {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  classLevel?: number | null;
  pointeShoeBrand?: string | null;
  pointeShoeSize?: number | null;
}

export type NewBallerina = Omit<IBallerina, 'id'> & { id: null };

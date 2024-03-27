export interface IInstructor {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}

export type NewInstructor = Omit<IInstructor, 'id'> & { id: null };

import { IInstructor, NewInstructor } from './instructor.model';

export const sampleWithRequiredData: IInstructor = {
  id: 88991,
  firstName: 'Claudine',
  lastName: 'Volkman',
  email: 'Valerie.Paucek@gmail.com',
};

export const sampleWithPartialData: IInstructor = {
  id: 27609,
  firstName: 'Stephan',
  lastName: 'Collier',
  email: 'Ellsworth_Kovacek95@gmail.com',
};

export const sampleWithFullData: IInstructor = {
  id: 36731,
  firstName: 'Keegan',
  lastName: 'Hahn',
  email: 'Ladarius2@hotmail.com',
};

export const sampleWithNewData: NewInstructor = {
  firstName: 'Evie',
  lastName: 'Thiel',
  email: 'Garth.Christiansen1@hotmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

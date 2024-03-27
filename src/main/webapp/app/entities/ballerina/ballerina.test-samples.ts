import { IBallerina, NewBallerina } from './ballerina.model';

export const sampleWithRequiredData: IBallerina = {
  id: 13328,
  firstName: 'Guido',
  lastName: 'Zboncak',
  email: 'Alessandro_Bogan46@yahoo.com',
};

export const sampleWithPartialData: IBallerina = {
  id: 96093,
  firstName: 'Cristal',
  lastName: 'Howe',
  email: 'Kaylah82@yahoo.com',
  classLevel: 19618,
  pointeShoeBrand: 'CSS',
};

export const sampleWithFullData: IBallerina = {
  id: 55290,
  firstName: 'Jonas',
  lastName: 'Prohaska',
  email: 'Elvie_Wyman90@hotmail.com',
  classLevel: 56459,
  pointeShoeBrand: '& monetize Bedfordshire',
  pointeShoeSize: 22115,
};

export const sampleWithNewData: NewBallerina = {
  firstName: 'Alisha',
  lastName: 'Stokes',
  email: 'Kasey.McKenzie@yahoo.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

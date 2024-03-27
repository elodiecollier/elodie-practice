import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ballerina.test-samples';

import { BallerinaFormService } from './ballerina-form.service';

describe('Ballerina Form Service', () => {
  let service: BallerinaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallerinaFormService);
  });

  describe('Service methods', () => {
    describe('createBallerinaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBallerinaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            email: expect.any(Object),
            classLevel: expect.any(Object),
            pointeShoeBrand: expect.any(Object),
            pointeShoeSize: expect.any(Object),
          })
        );
      });

      it('passing IBallerina should create a new form with FormGroup', () => {
        const formGroup = service.createBallerinaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            email: expect.any(Object),
            classLevel: expect.any(Object),
            pointeShoeBrand: expect.any(Object),
            pointeShoeSize: expect.any(Object),
          })
        );
      });
    });

    describe('getBallerina', () => {
      it('should return NewBallerina for default Ballerina initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBallerinaFormGroup(sampleWithNewData);

        const ballerina = service.getBallerina(formGroup) as any;

        expect(ballerina).toMatchObject(sampleWithNewData);
      });

      it('should return NewBallerina for empty Ballerina initial value', () => {
        const formGroup = service.createBallerinaFormGroup();

        const ballerina = service.getBallerina(formGroup) as any;

        expect(ballerina).toMatchObject({});
      });

      it('should return IBallerina', () => {
        const formGroup = service.createBallerinaFormGroup(sampleWithRequiredData);

        const ballerina = service.getBallerina(formGroup) as any;

        expect(ballerina).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBallerina should not enable id FormControl', () => {
        const formGroup = service.createBallerinaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBallerina should disable id FormControl', () => {
        const formGroup = service.createBallerinaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

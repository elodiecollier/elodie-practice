import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBallerina, NewBallerina } from '../ballerina.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBallerina for edit and NewBallerinaFormGroupInput for create.
 */
type BallerinaFormGroupInput = IBallerina | PartialWithRequiredKeyOf<NewBallerina>;

type BallerinaFormDefaults = Pick<NewBallerina, 'id'>;

type BallerinaFormGroupContent = {
  id: FormControl<IBallerina['id'] | NewBallerina['id']>;
  firstName: FormControl<IBallerina['firstName']>;
  lastName: FormControl<IBallerina['lastName']>;
  email: FormControl<IBallerina['email']>;
  classLevel: FormControl<IBallerina['classLevel']>;
  pointeShoeBrand: FormControl<IBallerina['pointeShoeBrand']>;
  pointeShoeSize: FormControl<IBallerina['pointeShoeSize']>;
};

export type BallerinaFormGroup = FormGroup<BallerinaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BallerinaFormService {
  createBallerinaFormGroup(ballerina: BallerinaFormGroupInput = { id: null }): BallerinaFormGroup {
    const ballerinaRawValue = {
      ...this.getFormDefaults(),
      ...ballerina,
    };
    return new FormGroup<BallerinaFormGroupContent>({
      id: new FormControl(
        { value: ballerinaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      firstName: new FormControl(ballerinaRawValue.firstName, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(ballerinaRawValue.lastName, {
        validators: [Validators.required],
      }),
      email: new FormControl(ballerinaRawValue.email, {
        validators: [Validators.required],
      }),
      classLevel: new FormControl(ballerinaRawValue.classLevel),
      pointeShoeBrand: new FormControl(ballerinaRawValue.pointeShoeBrand),
      pointeShoeSize: new FormControl(ballerinaRawValue.pointeShoeSize),
    });
  }

  getBallerina(form: BallerinaFormGroup): IBallerina | NewBallerina {
    return form.getRawValue() as IBallerina | NewBallerina;
  }

  resetForm(form: BallerinaFormGroup, ballerina: BallerinaFormGroupInput): void {
    const ballerinaRawValue = { ...this.getFormDefaults(), ...ballerina };
    form.reset(
      {
        ...ballerinaRawValue,
        id: { value: ballerinaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BallerinaFormDefaults {
    return {
      id: null,
    };
  }
}

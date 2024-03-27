import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInstructor, NewInstructor } from '../instructor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstructor for edit and NewInstructorFormGroupInput for create.
 */
type InstructorFormGroupInput = IInstructor | PartialWithRequiredKeyOf<NewInstructor>;

type InstructorFormDefaults = Pick<NewInstructor, 'id'>;

type InstructorFormGroupContent = {
  id: FormControl<IInstructor['id'] | NewInstructor['id']>;
  firstName: FormControl<IInstructor['firstName']>;
  lastName: FormControl<IInstructor['lastName']>;
  email: FormControl<IInstructor['email']>;
};

export type InstructorFormGroup = FormGroup<InstructorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstructorFormService {
  createInstructorFormGroup(instructor: InstructorFormGroupInput = { id: null }): InstructorFormGroup {
    const instructorRawValue = {
      ...this.getFormDefaults(),
      ...instructor,
    };
    return new FormGroup<InstructorFormGroupContent>({
      id: new FormControl(
        { value: instructorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      firstName: new FormControl(instructorRawValue.firstName, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(instructorRawValue.lastName, {
        validators: [Validators.required],
      }),
      email: new FormControl(instructorRawValue.email, {
        validators: [Validators.required],
      }),
    });
  }

  getInstructor(form: InstructorFormGroup): IInstructor | NewInstructor {
    return form.getRawValue() as IInstructor | NewInstructor;
  }

  resetForm(form: InstructorFormGroup, instructor: InstructorFormGroupInput): void {
    const instructorRawValue = { ...this.getFormDefaults(), ...instructor };
    form.reset(
      {
        ...instructorRawValue,
        id: { value: instructorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InstructorFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInstructor, NewInstructor } from '../instructor.model';

export type PartialUpdateInstructor = Partial<IInstructor> & Pick<IInstructor, 'id'>;

export type EntityResponseType = HttpResponse<IInstructor>;
export type EntityArrayResponseType = HttpResponse<IInstructor[]>;

@Injectable({ providedIn: 'root' })
export class InstructorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/instructors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(instructor: NewInstructor): Observable<EntityResponseType> {
    return this.http.post<IInstructor>(this.resourceUrl, instructor, { observe: 'response' });
  }

  update(instructor: IInstructor): Observable<EntityResponseType> {
    return this.http.put<IInstructor>(`${this.resourceUrl}/${this.getInstructorIdentifier(instructor)}`, instructor, {
      observe: 'response',
    });
  }

  partialUpdate(instructor: PartialUpdateInstructor): Observable<EntityResponseType> {
    return this.http.patch<IInstructor>(`${this.resourceUrl}/${this.getInstructorIdentifier(instructor)}`, instructor, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstructor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstructor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getInstructorIdentifier(instructor: Pick<IInstructor, 'id'>): number {
    return instructor.id;
  }

  compareInstructor(o1: Pick<IInstructor, 'id'> | null, o2: Pick<IInstructor, 'id'> | null): boolean {
    return o1 && o2 ? this.getInstructorIdentifier(o1) === this.getInstructorIdentifier(o2) : o1 === o2;
  }

  addInstructorToCollectionIfMissing<Type extends Pick<IInstructor, 'id'>>(
    instructorCollection: Type[],
    ...instructorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const instructors: Type[] = instructorsToCheck.filter(isPresent);
    if (instructors.length > 0) {
      const instructorCollectionIdentifiers = instructorCollection.map(instructorItem => this.getInstructorIdentifier(instructorItem)!);
      const instructorsToAdd = instructors.filter(instructorItem => {
        const instructorIdentifier = this.getInstructorIdentifier(instructorItem);
        if (instructorCollectionIdentifiers.includes(instructorIdentifier)) {
          return false;
        }
        instructorCollectionIdentifiers.push(instructorIdentifier);
        return true;
      });
      return [...instructorsToAdd, ...instructorCollection];
    }
    return instructorCollection;
  }
}

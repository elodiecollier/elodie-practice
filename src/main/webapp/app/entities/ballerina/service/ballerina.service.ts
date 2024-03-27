import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBallerina, NewBallerina } from '../ballerina.model';

export type PartialUpdateBallerina = Partial<IBallerina> & Pick<IBallerina, 'id'>;

export type EntityResponseType = HttpResponse<IBallerina>;
export type EntityArrayResponseType = HttpResponse<IBallerina[]>;

@Injectable({ providedIn: 'root' })
export class BallerinaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ballerinas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ballerina: NewBallerina): Observable<EntityResponseType> {
    return this.http.post<IBallerina>(this.resourceUrl, ballerina, { observe: 'response' });
  }

  update(ballerina: IBallerina): Observable<EntityResponseType> {
    return this.http.put<IBallerina>(`${this.resourceUrl}/${this.getBallerinaIdentifier(ballerina)}`, ballerina, { observe: 'response' });
  }

  partialUpdate(ballerina: PartialUpdateBallerina): Observable<EntityResponseType> {
    return this.http.patch<IBallerina>(`${this.resourceUrl}/${this.getBallerinaIdentifier(ballerina)}`, ballerina, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBallerina>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBallerina[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBallerinaIdentifier(ballerina: Pick<IBallerina, 'id'>): number {
    return ballerina.id;
  }

  compareBallerina(o1: Pick<IBallerina, 'id'> | null, o2: Pick<IBallerina, 'id'> | null): boolean {
    return o1 && o2 ? this.getBallerinaIdentifier(o1) === this.getBallerinaIdentifier(o2) : o1 === o2;
  }

  addBallerinaToCollectionIfMissing<Type extends Pick<IBallerina, 'id'>>(
    ballerinaCollection: Type[],
    ...ballerinasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ballerinas: Type[] = ballerinasToCheck.filter(isPresent);
    if (ballerinas.length > 0) {
      const ballerinaCollectionIdentifiers = ballerinaCollection.map(ballerinaItem => this.getBallerinaIdentifier(ballerinaItem)!);
      const ballerinasToAdd = ballerinas.filter(ballerinaItem => {
        const ballerinaIdentifier = this.getBallerinaIdentifier(ballerinaItem);
        if (ballerinaCollectionIdentifiers.includes(ballerinaIdentifier)) {
          return false;
        }
        ballerinaCollectionIdentifiers.push(ballerinaIdentifier);
        return true;
      });
      return [...ballerinasToAdd, ...ballerinaCollection];
    }
    return ballerinaCollection;
  }
}

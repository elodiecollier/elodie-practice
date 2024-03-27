import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBallerina } from '../ballerina.model';
import { BallerinaService } from '../service/ballerina.service';

@Injectable({ providedIn: 'root' })
export class BallerinaRoutingResolveService implements Resolve<IBallerina | null> {
  constructor(protected service: BallerinaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBallerina | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ballerina: HttpResponse<IBallerina>) => {
          if (ballerina.body) {
            return of(ballerina.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}

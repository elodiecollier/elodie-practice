import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BallerinaComponent } from '../list/ballerina.component';
import { BallerinaDetailComponent } from '../detail/ballerina-detail.component';
import { BallerinaUpdateComponent } from '../update/ballerina-update.component';
import { BallerinaRoutingResolveService } from './ballerina-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ballerinaRoute: Routes = [
  {
    path: '',
    component: BallerinaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BallerinaDetailComponent,
    resolve: {
      ballerina: BallerinaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BallerinaUpdateComponent,
    resolve: {
      ballerina: BallerinaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BallerinaUpdateComponent,
    resolve: {
      ballerina: BallerinaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ballerinaRoute)],
  exports: [RouterModule],
})
export class BallerinaRoutingModule {}

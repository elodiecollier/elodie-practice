import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ballerina',
        data: { pageTitle: 'balletApp.ballerina.home.title' },
        loadChildren: () => import('./ballerina/ballerina.module').then(m => m.BallerinaModule),
      },
      {
        path: 'instructor',
        data: { pageTitle: 'balletApp.instructor.home.title' },
        loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

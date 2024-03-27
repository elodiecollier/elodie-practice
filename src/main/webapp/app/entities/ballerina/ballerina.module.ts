import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BallerinaComponent } from './list/ballerina.component';
import { BallerinaDetailComponent } from './detail/ballerina-detail.component';
import { BallerinaUpdateComponent } from './update/ballerina-update.component';
import { BallerinaDeleteDialogComponent } from './delete/ballerina-delete-dialog.component';
import { BallerinaRoutingModule } from './route/ballerina-routing.module';

@NgModule({
  imports: [SharedModule, BallerinaRoutingModule],
  declarations: [BallerinaComponent, BallerinaDetailComponent, BallerinaUpdateComponent, BallerinaDeleteDialogComponent],
})
export class BallerinaModule {}

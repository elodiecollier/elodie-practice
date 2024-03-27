import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBallerina } from '../ballerina.model';
import { BallerinaService } from '../service/ballerina.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ballerina-delete-dialog.component.html',
})
export class BallerinaDeleteDialogComponent {
  ballerina?: IBallerina;

  constructor(protected ballerinaService: BallerinaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ballerinaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

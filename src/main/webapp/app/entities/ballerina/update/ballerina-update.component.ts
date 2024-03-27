import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BallerinaFormService, BallerinaFormGroup } from './ballerina-form.service';
import { IBallerina } from '../ballerina.model';
import { BallerinaService } from '../service/ballerina.service';

@Component({
  selector: 'jhi-ballerina-update',
  templateUrl: './ballerina-update.component.html',
})
export class BallerinaUpdateComponent implements OnInit {
  isSaving = false;
  ballerina: IBallerina | null = null;

  editForm: BallerinaFormGroup = this.ballerinaFormService.createBallerinaFormGroup();

  constructor(
    protected ballerinaService: BallerinaService,
    protected ballerinaFormService: BallerinaFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ballerina }) => {
      this.ballerina = ballerina;
      if (ballerina) {
        this.updateForm(ballerina);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ballerina = this.ballerinaFormService.getBallerina(this.editForm);
    if (ballerina.id !== null) {
      this.subscribeToSaveResponse(this.ballerinaService.update(ballerina));
    } else {
      this.subscribeToSaveResponse(this.ballerinaService.create(ballerina));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBallerina>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(ballerina: IBallerina): void {
    this.ballerina = ballerina;
    this.ballerinaFormService.resetForm(this.editForm, ballerina);
  }
}

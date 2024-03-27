import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBallerina } from '../ballerina.model';

@Component({
  selector: 'jhi-ballerina-detail',
  templateUrl: './ballerina-detail.component.html',
})
export class BallerinaDetailComponent implements OnInit {
  ballerina: IBallerina | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ballerina }) => {
      this.ballerina = ballerina;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

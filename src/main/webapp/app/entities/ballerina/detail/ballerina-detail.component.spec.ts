import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BallerinaDetailComponent } from './ballerina-detail.component';

describe('Ballerina Management Detail Component', () => {
  let comp: BallerinaDetailComponent;
  let fixture: ComponentFixture<BallerinaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BallerinaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ballerina: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(BallerinaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(BallerinaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ballerina on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ballerina).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

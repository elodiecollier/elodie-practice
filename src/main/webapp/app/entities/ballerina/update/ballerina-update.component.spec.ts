import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BallerinaFormService } from './ballerina-form.service';
import { BallerinaService } from '../service/ballerina.service';
import { IBallerina } from '../ballerina.model';

import { BallerinaUpdateComponent } from './ballerina-update.component';

describe('Ballerina Management Update Component', () => {
  let comp: BallerinaUpdateComponent;
  let fixture: ComponentFixture<BallerinaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ballerinaFormService: BallerinaFormService;
  let ballerinaService: BallerinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BallerinaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(BallerinaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BallerinaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ballerinaFormService = TestBed.inject(BallerinaFormService);
    ballerinaService = TestBed.inject(BallerinaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ballerina: IBallerina = { id: 456 };

      activatedRoute.data = of({ ballerina });
      comp.ngOnInit();

      expect(comp.ballerina).toEqual(ballerina);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBallerina>>();
      const ballerina = { id: 123 };
      jest.spyOn(ballerinaFormService, 'getBallerina').mockReturnValue(ballerina);
      jest.spyOn(ballerinaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ballerina });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ballerina }));
      saveSubject.complete();

      // THEN
      expect(ballerinaFormService.getBallerina).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ballerinaService.update).toHaveBeenCalledWith(expect.objectContaining(ballerina));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBallerina>>();
      const ballerina = { id: 123 };
      jest.spyOn(ballerinaFormService, 'getBallerina').mockReturnValue({ id: null });
      jest.spyOn(ballerinaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ballerina: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ballerina }));
      saveSubject.complete();

      // THEN
      expect(ballerinaFormService.getBallerina).toHaveBeenCalled();
      expect(ballerinaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBallerina>>();
      const ballerina = { id: 123 };
      jest.spyOn(ballerinaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ballerina });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ballerinaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

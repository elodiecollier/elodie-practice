import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BallerinaService } from '../service/ballerina.service';

import { BallerinaComponent } from './ballerina.component';

describe('Ballerina Management Component', () => {
  let comp: BallerinaComponent;
  let fixture: ComponentFixture<BallerinaComponent>;
  let service: BallerinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'ballerina', component: BallerinaComponent }]), HttpClientTestingModule],
      declarations: [BallerinaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(BallerinaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BallerinaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(BallerinaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.ballerinas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ballerinaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getBallerinaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getBallerinaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});

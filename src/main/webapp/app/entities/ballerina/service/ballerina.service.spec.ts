import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBallerina } from '../ballerina.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ballerina.test-samples';

import { BallerinaService } from './ballerina.service';

const requireRestSample: IBallerina = {
  ...sampleWithRequiredData,
};

describe('Ballerina Service', () => {
  let service: BallerinaService;
  let httpMock: HttpTestingController;
  let expectedResult: IBallerina | IBallerina[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BallerinaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Ballerina', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ballerina = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ballerina).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ballerina', () => {
      const ballerina = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ballerina).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ballerina', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ballerina', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ballerina', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBallerinaToCollectionIfMissing', () => {
      it('should add a Ballerina to an empty array', () => {
        const ballerina: IBallerina = sampleWithRequiredData;
        expectedResult = service.addBallerinaToCollectionIfMissing([], ballerina);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ballerina);
      });

      it('should not add a Ballerina to an array that contains it', () => {
        const ballerina: IBallerina = sampleWithRequiredData;
        const ballerinaCollection: IBallerina[] = [
          {
            ...ballerina,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBallerinaToCollectionIfMissing(ballerinaCollection, ballerina);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ballerina to an array that doesn't contain it", () => {
        const ballerina: IBallerina = sampleWithRequiredData;
        const ballerinaCollection: IBallerina[] = [sampleWithPartialData];
        expectedResult = service.addBallerinaToCollectionIfMissing(ballerinaCollection, ballerina);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ballerina);
      });

      it('should add only unique Ballerina to an array', () => {
        const ballerinaArray: IBallerina[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ballerinaCollection: IBallerina[] = [sampleWithRequiredData];
        expectedResult = service.addBallerinaToCollectionIfMissing(ballerinaCollection, ...ballerinaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ballerina: IBallerina = sampleWithRequiredData;
        const ballerina2: IBallerina = sampleWithPartialData;
        expectedResult = service.addBallerinaToCollectionIfMissing([], ballerina, ballerina2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ballerina);
        expect(expectedResult).toContain(ballerina2);
      });

      it('should accept null and undefined values', () => {
        const ballerina: IBallerina = sampleWithRequiredData;
        expectedResult = service.addBallerinaToCollectionIfMissing([], null, ballerina, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ballerina);
      });

      it('should return initial array if no Ballerina is added', () => {
        const ballerinaCollection: IBallerina[] = [sampleWithRequiredData];
        expectedResult = service.addBallerinaToCollectionIfMissing(ballerinaCollection, undefined, null);
        expect(expectedResult).toEqual(ballerinaCollection);
      });
    });

    describe('compareBallerina', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBallerina(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBallerina(entity1, entity2);
        const compareResult2 = service.compareBallerina(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBallerina(entity1, entity2);
        const compareResult2 = service.compareBallerina(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBallerina(entity1, entity2);
        const compareResult2 = service.compareBallerina(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

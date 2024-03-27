import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Instructor e2e test', () => {
  const instructorPageUrl = '/instructor';
  const instructorPageUrlPattern = new RegExp('/instructor(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const instructorSample = { firstName: 'Kailee', lastName: 'Schinner', email: 'Marilyne.Sawayn@gmail.com' };

  let instructor;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/instructors+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/instructors').as('postEntityRequest');
    cy.intercept('DELETE', '/api/instructors/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (instructor) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/instructors/${instructor.id}`,
      }).then(() => {
        instructor = undefined;
      });
    }
  });

  it('Instructors menu should load Instructors page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('instructor');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Instructor').should('exist');
    cy.url().should('match', instructorPageUrlPattern);
  });

  describe('Instructor page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(instructorPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Instructor page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/instructor/new$'));
        cy.getEntityCreateUpdateHeading('Instructor');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', instructorPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/instructors',
          body: instructorSample,
        }).then(({ body }) => {
          instructor = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/instructors+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [instructor],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(instructorPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Instructor page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('instructor');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', instructorPageUrlPattern);
      });

      it('edit button click should load edit Instructor page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Instructor');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', instructorPageUrlPattern);
      });

      it('edit button click should load edit Instructor page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Instructor');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', instructorPageUrlPattern);
      });

      it('last delete button click should delete instance of Instructor', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('instructor').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', instructorPageUrlPattern);

        instructor = undefined;
      });
    });
  });

  describe('new Instructor page', () => {
    beforeEach(() => {
      cy.visit(`${instructorPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Instructor');
    });

    it('should create an instance of Instructor', () => {
      cy.get(`[data-cy="firstName"]`).type('Nelson').should('have.value', 'Nelson');

      cy.get(`[data-cy="lastName"]`).type('Kovacek').should('have.value', 'Kovacek');

      cy.get(`[data-cy="email"]`).type('Carmella97@hotmail.com').should('have.value', 'Carmella97@hotmail.com');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        instructor = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', instructorPageUrlPattern);
    });
  });
});

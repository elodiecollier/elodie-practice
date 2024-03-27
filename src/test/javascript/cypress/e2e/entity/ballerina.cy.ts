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

describe('Ballerina e2e test', () => {
  const ballerinaPageUrl = '/ballerina';
  const ballerinaPageUrlPattern = new RegExp('/ballerina(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const ballerinaSample = { firstName: 'Rodger', lastName: 'Jenkins', email: 'Rupert.Gottlieb@gmail.com' };

  let ballerina;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ballerinas+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ballerinas').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ballerinas/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (ballerina) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ballerinas/${ballerina.id}`,
      }).then(() => {
        ballerina = undefined;
      });
    }
  });

  it('Ballerinas menu should load Ballerinas page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ballerina');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Ballerina').should('exist');
    cy.url().should('match', ballerinaPageUrlPattern);
  });

  describe('Ballerina page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(ballerinaPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Ballerina page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ballerina/new$'));
        cy.getEntityCreateUpdateHeading('Ballerina');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ballerinaPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ballerinas',
          body: ballerinaSample,
        }).then(({ body }) => {
          ballerina = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ballerinas+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [ballerina],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(ballerinaPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Ballerina page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('ballerina');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ballerinaPageUrlPattern);
      });

      it('edit button click should load edit Ballerina page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Ballerina');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ballerinaPageUrlPattern);
      });

      it('edit button click should load edit Ballerina page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Ballerina');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ballerinaPageUrlPattern);
      });

      it('last delete button click should delete instance of Ballerina', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('ballerina').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ballerinaPageUrlPattern);

        ballerina = undefined;
      });
    });
  });

  describe('new Ballerina page', () => {
    beforeEach(() => {
      cy.visit(`${ballerinaPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Ballerina');
    });

    it('should create an instance of Ballerina', () => {
      cy.get(`[data-cy="firstName"]`).type('Matt').should('have.value', 'Matt');

      cy.get(`[data-cy="lastName"]`).type('VonRueden').should('have.value', 'VonRueden');

      cy.get(`[data-cy="email"]`).type('Rosalia_Bradtke75@hotmail.com').should('have.value', 'Rosalia_Bradtke75@hotmail.com');

      cy.get(`[data-cy="classLevel"]`).type('99111').should('have.value', '99111');

      cy.get(`[data-cy="pointeShoeBrand"]`).type('Plastic Awesome Yemen').should('have.value', 'Plastic Awesome Yemen');

      cy.get(`[data-cy="pointeShoeSize"]`).type('71682').should('have.value', '71682');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        ballerina = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', ballerinaPageUrlPattern);
    });
  });
});

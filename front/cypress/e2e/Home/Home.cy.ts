Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Home Page", () => {
  before(() => {
    cy.visit("/");
  });
  it("should see the popular movies on app load", () => {
    cy.get("[data-cy=movie-card]").should("have.length", 20);
  });

  it("should have a button 'Show Tv'", () => {
    cy.get("[data-cy=switch]").should("exist");
    cy.get("[data-cy=switch]").should("contain", "Show Tv");
  });

  it("should show tv shows when the button is clicked", () => {
    cy.get("[data-cy=switch]").click();
    cy.get("[data-cy=tv-card]").should("have.length", 20);
  });

  it("should show movies when the button is clicked again", () => {
    cy.get("[data-cy=switch]").click();
    cy.get("[data-cy=movie-card]").should("have.length", 20);
  });

  describe("Slider", () => {
    it("should scroll to the right", () => {
      cy.get("[data-cy=slider]").scrollTo("right");
    });
    it("should scroll to the left", () => {
      cy.wait(1000);
      cy.get("[data-cy=slider]").scrollTo("left");
    });
  });
});

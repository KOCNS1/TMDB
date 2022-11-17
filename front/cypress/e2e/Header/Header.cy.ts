describe("Home Page", () => {
  before(() => {
    cy.visit("/");
  });
  describe("Large Viewport", () => {
    beforeEach(() => {
      cy.viewport("macbook-15");
    });
    it("Logo should exist", () => {
      cy.get("[data-cy=logo]").should("exist");
    });
    it("LargeScreenNavButtons shoud be visible", () => {
      cy.get("[data-cy=LargeScreenNavButtons]").should("be.visible");
    });
    it("SearchBar should be visible", () => {
      cy.get("[data-cy=SearchBar]").should("be.visible");
    });
    it("LargeScreenMenuContent should be visible", () => {
      cy.get("[data-cy=LargeScreenMenuContent]").should("be.visible");
    });
    it("BurgerMenu should not be visible", () => {
      cy.get("[data-cy=BurgerMenu]").should("not.be.visible");
    });
    it("BurgerMenuContent should not exist", () => {
      cy.get("[data-cy=BurgerMenuContent]").should("not.exist");
    });
  });
});

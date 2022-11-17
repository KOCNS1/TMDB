describe("Home Page", () => {
  before(() => {
    cy.visit("/");
  });
  describe("Large Viewport", () => {
    beforeEach(() => {
      cy.viewport("macbook-15");
    });

    describe("Logged Out", () => {
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
      it("should redirect to auth route when login button is clicked", () => {
        cy.get("[data-cy=login]").click();
        cy.url().should("include", "/auth");
      });
      it("should go back to the home page when logo is clicked ", () => {
        cy.get("[data-cy=logo]").click();
        cy.url().should("include", "/");
      });
    });
  });

  describe("Small Viewport", () => {
    beforeEach(() => {
      cy.viewport("ipad-2");
    });

    describe("Logged Out", () => {
      it("Logo should exist", () => {
        cy.get("[data-cy=logo]").should("exist");
      });
      it("LargeScreenNavButtons shoud not be visible", () => {
        cy.get("[data-cy=LargeScreenNavButtons]").should("not.be.visible");
      });
      it("SearchBar should be visible", () => {
        cy.get("[data-cy=SearchBar]").should("be.visible");
      });
      it("LargeScreenMenuContent should not be visible", () => {
        cy.get("[data-cy=LargeScreenMenuContent]").should("not.be.visible");
      });
      it("BurgerMenu should be visible", () => {
        cy.get("[data-cy=BurgerMenu]").should("be.visible");
      });
      it("BurgerMenuContent should exist when we click on the BurgerMenu", () => {
        cy.get("[data-cy=BurgerMenu]").click();
        cy.get("[data-cy=BurgerMenuContent]").should("exist");
      });
      it("should redirect to auth route when login button is clicked", () => {
        cy.get("[data-cy=login-responsive]").click();
        cy.url().should("include", "/auth");
      });
      it("should go back to the home page when logo is clicked", () => {
        cy.get("[data-cy=logo]").click();
        cy.url().should("include", "/");
      });
      it("BurgerMenuContent should not exist if BurgerMenu is not clicked", () => {
        cy.get("[data-cy=BurgerMenuContent]").should("not.exist");
      });
    });
  });
});

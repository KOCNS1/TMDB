import Footer from "./Footer";

describe("<Stepper>", () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });
  it("Should contain the right phrase", () => {
    cy.get(".text-center").should(
      "contain",
      "© TMDB Clone, made with ♥ by Enes KOC"
    );
  });
  it("Should 5 social links", () => {
    cy.get("[data-cy=footer-social]").children().should("have.length", 5);
  });
});

import SearchBar from "./SearchBar";

describe("<SearchBar>", () => {
  beforeEach(() => {
    const setOpen = () => {};
    cy.mount(<SearchBar setOpen={setOpen} />);
  });
  it("input should be disable", () => {
    cy.get("input").should("be.disabled");
  });
  it("should have a search icon", () => {
    cy.get("[data-cy=search-icon]").should("exist");
  });
  it("should have a placeholder", () => {
    cy.get("input").should("have.attr", "placeholder", "Search");
  });
  it("should have a label", () => {
    cy.get("label").should("have.text", "Search");
  });
  it("should have a label with the class .sr-only", () => {
    cy.get("label").should("have.class", "sr-only");
  });
});

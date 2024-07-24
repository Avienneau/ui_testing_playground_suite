Cypress._.times(5, () => {
  describe("the dynamic table app", () => {
    beforeEach(() => {
      cy.visit("/apps/dynamic-table");
    });
    it("should list spider-man's real name", () => {
      cy.get("table")
        .contains("Spider-Man")
        .closest("tr")
        .children()
        .last()
        .invoke("text")
        .then((name) => {
          const trimmed_name = name.trim();
          expect(trimmed_name).to.equal("Peter Parker");
        });
    });
  });
});

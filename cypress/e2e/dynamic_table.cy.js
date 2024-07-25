/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring
 **/

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

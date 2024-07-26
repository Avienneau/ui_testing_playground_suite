/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

Cypress._.times(5, () => {
  describe("the covered elements app", () => {
    beforeEach(() => {
      cy.visit("/apps/covered");
    });
    it("should have a clickable button", () => {
      cy.get("#fugitive").scrollIntoView();
      cy.get("#fugitive").click();
      cy.contains("Mission accomplished").should("exist");
    });
  });
});

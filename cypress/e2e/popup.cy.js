/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

Cypress._.times(5, () => {
  describe("the popup app", () => {
    beforeEach(() => {
      cy.visit("/apps/popup", {
        onBeforeLoad(win) {
          cy.stub(win, "open");
        },
      });
    });
    it("should open a new window", () => {
      cy.get("#login").click();
      cy.window().its("open").should("be.called");
    });
  });
});

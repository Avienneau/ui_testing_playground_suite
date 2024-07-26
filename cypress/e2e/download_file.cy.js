/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

Cypress._.times(5, () => {
  describe("the download app", () => {
    beforeEach(() => {
      cy.visit("/apps/download/");
    });
    it("should allow for file downloads", () => {
      cy.downloadFile(
        "https://qaplayground.dev/apps/download/sample.pdf",
        "cypress/downloads",
        "sample.pdf",
      );
      cy.readFile("cypress/downloads/sample.pdf").should("exist");
    });
  });
});

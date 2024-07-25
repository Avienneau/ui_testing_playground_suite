/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

Cypress._.times(5, () => {
  describe("the iframe app", () => {
    beforeEach(() => {
      cy.visit("/apps/iframe/");
    });
    it("should display a success message when the click me button is clicked", () => {
      cy.get("iframe").contents_search("#frame2").contents_search("a").click();
      cy.get("iframe")
        .contents_search("#frame2")
        .contents_search("#msg")
        .invoke("text")
        .should("equal", "Button Clicked");
    });
  });
});

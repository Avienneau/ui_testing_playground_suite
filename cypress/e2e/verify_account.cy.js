/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

const match_and_capture_confirmation_code = () => {
  const confirmation_code_regex =
    /^The confirmation code is (\d{1}-\d{1}-\d{1}-\d{1}-\d{1}-\d{1})$/;
  return cy.match_and_capture_text(confirmation_code_regex, "small.info", 1);
};

Cypress._.times(5, () => {
  describe("the verify account app", () => {
    beforeEach(() => {
      cy.visit("/apps/verify-account");
    });
    it("should list a six-digit confirmation code", () => {
      match_and_capture_confirmation_code().then((code) => {
        expect(code).to.not.be.empty;
      });
    });
    it("should allow the user to input the confirmation code", () => {
      match_and_capture_confirmation_code().then((code) => {
        const code_array = code.split("-"); // split to array
        for (let input = 0; input < code_array.length; input++) {
          // iterate over array
          /* for each number in the code, find the corresponding input element and type it in */
          cy.get(".code-container input").eq(input).type(code_array[input]);
        }
        cy.contains("Success").should("be.visible");
      });
    });
  });
});

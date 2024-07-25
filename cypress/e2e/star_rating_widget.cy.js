/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

const star_rating_test = (star_number, sentiment) => {
  it(`should update sentiment with ${star_number}* rating`, () => {
    cy.get(`.star-${star_number}`).click();
    cy.alias_pseudo_element_property_value("span.text", "::before", "content");
    cy.get("@pseudo_element_value").then((value) => {
      expect(value).to.equal(sentiment);
    });
    cy.alias_pseudo_element_property_value("span.numb", "::before", "content");
    cy.get("@pseudo_element_value").then((value) => {
      expect(value).to.equal(`"${star_number} out of 5"`);
    });
  });
};

Cypress._.times(5, () => {
  describe("the star rating widget", () => {
    beforeEach(() => {
      cy.visit("/apps/rating/");
    });
    star_rating_test(1, '"I just hate it"');
    star_rating_test(2, '"I don\'t like it"');
    star_rating_test(3, '"This is awesome"');
    star_rating_test(4, '"I just like it"');
    star_rating_test(5, '"I just love it"');
  });
});

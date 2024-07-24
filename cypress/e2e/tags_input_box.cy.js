/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

const new_tag = "c++";
const existing_tag = "node";

Cypress._.times(5, () => {
  describe("the tags input box", () => {
    beforeEach(() => {
      cy.visit("/apps/tags-input-box");
      get_number_of_tag_elements().then((number) =>
        cy.wrap(number).as("initial_number_of_tag_elements"),
      );
      match_and_get_number_of_tags_remaining().then((number) =>
        cy.wrap(number).as("initial_tag_count"),
      );
    });
    it("should allow you to add a tag", () => {
      cy.get("@initial_number_of_tag_elements").then((initial_number) => {
        add_new_tag(new_tag);
        get_number_of_tag_elements().then((new_number) => {
          expect(new_number).to.equal(initial_number + 1);
        });
      });
    });
    it("should allow you to remove tags", () => {
      cy.get("@initial_number_of_tag_elements").then((initial_number) => {
        remove_existing_tag(existing_tag);
        get_number_of_tag_elements().then((new_number) => {
          expect(new_number).to.equal(initial_number - 1);
        });
      });
    });
    it("should decrement its tags remaining count when adding or removing a tag", () => {
      cy.get("@initial_tag_count").then((initial_count) => {
        add_new_tag(new_tag);
        match_and_get_number_of_tags_remaining().then((remaining_count) => {
          expect(parseInt(remaining_count)).to.be.lessThan(
            parseInt(initial_count),
          );
        });
        remove_existing_tag(new_tag);
        match_and_get_number_of_tags_remaining().then((remaining_count) => {
          expect(parseInt(remaining_count)).to.equal(parseInt(initial_count));
        });
      });
    });
  });
});

const get_number_of_tag_elements = () => {
  return cy.get("ul li").then((elements) => {
    return elements.length;
  });
};

const add_new_tag = (newTag) => {
  cy.get("input").type(`${newTag}{enter}`);
};

const remove_existing_tag = (existingTag) => {
  cy.get("li").contains(existingTag).find("i").click();
};

const match_and_get_number_of_tags_remaining = () => {
  const tags_remaining_regex = /(\d+) tags are remaining/;
  return cy.match_and_capture_text(tags_remaining_regex, ".details", 1);
};

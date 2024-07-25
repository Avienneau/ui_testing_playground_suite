/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

const plus_icon = 0;
const bell_icon = 1;
const message_icon = 2;
const caret_icon = 3;

const dropdown_menu_item_test = (menu_item) => {
  it(`should display ${menu_item}`, () => {
    cy.get("@dropdown_element").contains(menu_item).should("exist");
  });
};

Cypress._.times(1, () => {
  describe("the multilevel dropdown app", () => {
    beforeEach(() => {
      cy.visit("/apps/multi-level-dropdown");
    });
    describe("home menu", () => {
      beforeEach(() => {
        cy.get(".nav-item").eq(caret_icon).click();
        cy.get("div.dropdown").as("dropdown_element");
      });
      dropdown_menu_item_test("My Profile");
      dropdown_menu_item_test("Settings");
      dropdown_menu_item_test("Animals");

      describe("settings sub-menu", () => {
        beforeEach(() => {
          cy.get("@dropdown_element").contains("Settings").click();
        });
        dropdown_menu_item_test("HTML");
        dropdown_menu_item_test("CSS");
        dropdown_menu_item_test("JavaScript");
        dropdown_menu_item_test("Awesome!");
      });

      describe("animals sub-menu", () => {
        beforeEach(() => {
          cy.get("@dropdown_element").contains("Animals").click();
        });
        dropdown_menu_item_test("Kangaroo");
        dropdown_menu_item_test("Frog");
        dropdown_menu_item_test("Horse");
        dropdown_menu_item_test("Hedgehog");
      });
    });
  });
});

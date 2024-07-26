/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

const menu_item_test = (alias, menu_item, selector) => {
  if (!selector) selector = `[onclick="itemClicked('${menu_item}')"]`;

  it(`should have menu item ${menu_item}`, () => {
    cy.get(alias)
      .find(selector)
      .invoke("text")
      .then((text) => {
        const trimmed_text = text.trim();
        expect(trimmed_text).to.include(menu_item);
      });
  });
};

Cypress._.times(1, () => {
  describe("the right click context menu app", () => {
    beforeEach(() => {
      cy.visit("/apps/context-menu/");
    });
    it("should open a context menu on right click", () => {
      cy.contains("Open Right-Click Context Menu").rightclick();
      cy.get(".menu-content").should("be.visible");
    });
    describe("the right-click-context menu", () => {
      beforeEach(() => {
        cy.contains("Open Right-Click Context Menu").rightclick();
        cy.get(".menu-content").as("menu_container");
      });
      menu_item_test("@menu_container", "Preview");
      menu_item_test("@menu_container", "Share", ".share");
      menu_item_test("@menu_container", "Get Link");
      menu_item_test("@menu_container", "Delete");
      menu_item_test("@menu_container", "Settings");

      describe('the "share" sub-menu', () => {
        beforeEach(() => {
          cy.get("@menu_container").find(".share").as("share_sub_menu");
        });
        menu_item_test("@share_sub_menu", "Twitter");
        menu_item_test("@share_sub_menu", "Instagram");
        menu_item_test("@share_sub_menu", "Dribble");
        menu_item_test("@share_sub_menu", "Telegram");
      });
    });
  });
});

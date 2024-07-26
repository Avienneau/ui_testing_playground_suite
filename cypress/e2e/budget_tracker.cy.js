/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

const date_selector = "td input.input-date";
const description_selector = "td input.input-description";
const type_selector = "td select.input-type";
const amount_selector = "td input.input-amount";

Cypress._.times(1, () => {
  describe("the budget tracker app", () => {
    beforeEach(() => {
      cy.visit("/apps/budget-tracker/");
    });

    describe("add entry", () => {
      beforeEach(() => {
        cy.get("button").contains("New Entry").click();
        cy.get(".budget-tracker tbody.entries").as("entries");
      });

      it("should create a new table row with date, type, description, amount", () => {
        cy.get("@entries").find("tr").should("have.length", 1);
        cy.get("@entries").find(date_selector).should("exist");
        cy.get("@entries").find(description_selector).should("exist");
        cy.get("@entries").find(type_selector).should("exist");
        cy.get("@entries").find(amount_selector).should("exist");
      });

      it("should allow deletion", () => {
        cy.get(".delete-entry").click();
        cy.get("@entries").children().should("have.length", 0);
      });

      describe("date field", () => {
        beforeEach(() => {
          cy.get("@entries").find(date_selector).as("date_element");
        });
        it("should allow date entry", () => {
          const date = "1991-08-25";
          cy.get("@date_element").type(date);
          cy.get("@date_element").invoke("val").should("eq", date);
        });
      });

      describe("description field", () => {
        beforeEach(() => {
          cy.get("@entries")
            .find(description_selector)
            .as("description_element");
        });
        it('should have placeholder text including "Add a Description"', () => {
          cy.get("@description_element")
            .invoke("attr", "placeholder")
            .should("include", "Add a Description");
        });
        it("should allow alpha-numeric chracters", () => {
          const alpha_numeric = "alpha123";
          cy.get("@description_element").do_and_assert(
            "type",
            alpha_numeric,
            "eq",
            "val",
          );
        });
        it("should allow special characters", () => {
          const special_characters = "!@#$%^&*()";
          cy.get("@description_element").do_and_assert(
            "type",
            special_characters,
            "eq",
            "val",
          );
        });
      });

      describe("type field", () => {
        beforeEach(() => {
          cy.get("@entries").find(type_selector).as("type_element");
        });
        it('should have "income" option', () => {
          cy.get("@type_element").do_and_assert(
            "select",
            "income",
            "eq",
            "val",
          );
        });
        it('should have "expense" option', () => {
          cy.get("@type_element").do_and_assert(
            "select",
            "expense",
            "eq",
            "val",
          );
        });
      });

      describe("amount field", () => {
        beforeEach(() => {
          cy.get("@entries").find(amount_selector).as("amount_element");
        });

        it("should not accept alphabetic characters", () => {
          cy.get("@amount_element").do_and_assert(
            "type",
            "abc",
            "not.equal",
            "val",
          );
        });

        it("should allow numeric characters", () => {
          cy.get("@amount_element").do_and_assert(
            "type",
            "123",
            "include",
            "val",
          );
        });

        it("should update the total", () => {
          cy.get("@amount_element").type("123{enter}");
          cy.get(".total").should("have.text", "$123.00");
        });
      });
    });
  });
});

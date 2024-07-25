/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

/**
 * match_and_capture_textreturns a cypress promise that, when invoked,
 * 1. finds a selector
 * 2. extracts its text
 * 3. normalizes the captured text
 * 4. compares it to a regular expression, potentially capturing data
 * 5. checks for a capture
 * 6. returns the capture at the specified index
 **/
Cypress.Commands.add(
  "match_and_capture_text",
  (regularExpression, selector, captureIndex = 0) => {
    return cy
      .get(selector)
      .invoke("text")
      .then((text) => {
        const trimmed_text = text.trim();
        const result = regularExpression.exec(trimmed_text);
        if (result) {
          return result[captureIndex];
        }
        return "";
      });
  },
);

/**
 * contents_search returns a cypress promise that, when invoked,
 * 1. wraps the previous subject
 * 2. inspects the subject's contents for a selector
 * 3. wraps and returns the selected element
 *
 * Child command to be called on an element with contents.
 * Specifically useful for iframes, as cy.get() does not
 * detect nested iframe contents.
 **/
Cypress.Commands.add(
  "contents_search",
  {
    prevSubject: true,
  },
  (subject, selector) => {
    return cy.wrap(subject).then(($parent) => {
      const result = $parent.contents().find(selector);
      return cy.wrap(result);
    });
  },
);

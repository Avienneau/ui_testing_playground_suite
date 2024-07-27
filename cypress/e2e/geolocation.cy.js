/**
 * © Aaron Daniel Vienneau-Herring, 2024. All rights reserved.
 * This software and its associated files are the property of Aaron Daniel Vienneau-Herring.
 * Unauthorized copying, distribution, reproduction, or any other use of this software or its associated files, in whole or in part, is strictly prohibited
 * without the prior written permission of Aaron Daniel Vienneau-Herring.
 **/

/**
 * stub out the windows geolocation #getCurrentPosition function to
 * return whatever lat and long you pass it.
 **/
function mock_location(latitude, longitude) {
  const on_before_load = {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (callback, error) => {
          if (latitude && longitude) {
            return callback({ coords: { latitude, longitude } });
          }
          throw err({ code: 1 });
        },
      );
    },
  };
  return on_before_load;
}

Cypress._.times(5, () => {
  describe("the geolocation app", () => {
    beforeEach(() => {
      cy.visit("/apps/geolocation/", mock_location(37.33182, -122.03118));
    });
    it("should return Cupertino", () => {
      cy.contains("Get Location").click();
      cy.get("#location-info").should("have.text", "Cupertino, United States");
    });
  });
});

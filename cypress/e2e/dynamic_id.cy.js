const get_dynamic_button_id = () => {
  return cy.contains("Button with Dynamic ID").invoke("attr", "id");
};

describe("the dynamic id playground page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[href="/dynamicid"]').click();
    get_dynamic_button_id().as("button_id");
    cy.get("@button_id").then((id) => cy.log(id));
  });
  it("should load a button with an id matching a uuid pattern", () => {
    const id_regex =
      /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;
    cy.get("@button_id").then((id) => {
      const test_result = id_regex.test(id);
      expect(test_result).to.be.true;
    });
  });
  describe("on refresh", () => {
    let originalId;
    beforeEach(() => {
      cy.get("@button_id").then((id) => (originalId = id));
      cy.reload(true);
    });
    it("should generate a new button id", () => {
      get_dynamic_button_id().then((newId) => {
        expect(originalId).to.not.equal(newId);
      });
    });
  });
});

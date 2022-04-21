import { constants } from "../../constants";

describe("Publish Drafts Tests", () => {

  it("Publish Drafts Test", () => {
    cy.wait(1000);
    cy.visit(`${constants.DRAFTS}`);
    cy.get("[id=publish3]").click();
  });

});
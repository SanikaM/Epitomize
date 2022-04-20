import { constants } from "../../constants";

describe("View Drafts Tests", () => {

  it("View Drafts Test", () => {
    cy.wait(1000);
    cy.visit(`${constants.DRAFTS}`);
    cy.get("[id=publish3]").click();
  });

});
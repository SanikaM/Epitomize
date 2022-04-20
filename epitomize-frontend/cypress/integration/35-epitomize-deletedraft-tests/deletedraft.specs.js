import { constants } from "../../constants";

describe("Delete Drafts Tests", () => {

  it("Delete Drafts Test", () => {
    cy.wait(1000);
    cy.visit(`${constants.DRAFTS}`);
    // cy.get("[id=delete2]").click();
  });

});
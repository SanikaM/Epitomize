import { constants } from "../../constants";

describe("Like Unlike Post List Tests", () => {

  it("Like Unlike Post List Test", () => {

    cy.visit(`${constants.LOGIN}`)
    cy.wait(1000);
    cy.get("[id=likeId2]").click();
    cy.wait(1000);
    cy.get("[id=unlikeId2]").click();
  });

});
import { constants } from "../../constants";

describe("Unfollow Tests", () => {

  it("Unfollow Test", () => {
    cy.visit(`${constants.LOGIN}`);
    cy.get("[id=follow]").click();
    cy.get("[id=follow]").click();
  });

});
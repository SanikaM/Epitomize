import { constants } from "../../constants";

describe("Logout Tests", () => {

  it("Logout Test", () => {
    cy.visit(`${constants.LOGIN}`);
    cy.get("[id=account").click();
    cy.get("[id=logout]").click();
    cy.visit(`${constants.LOGIN}`);

  });

});
import { constants } from "../../constants";

describe("Follow Tests", () => {

  it("Follow Test", () => {
    cy.visit(`${constants.LOGIN}`);
    cy.get("[id=follow]").click();
  });

});
import { constants } from "../../constants";

describe("Notifications Tests", () => {

  it("Delete Notifications Test", () => {

    cy.visit(`${constants.NOTIFICATION}`);
    cy.get("[id=delete]").click();
  });

});
import { constants } from "../../constants";

describe("Notifications Tests", () => {

  it("Read Notifications Test", () => {

    cy.visit(`${constants.NOTIFICATION}`);
    cy.get("[id=read]").click({ multiple: true });
  });

});
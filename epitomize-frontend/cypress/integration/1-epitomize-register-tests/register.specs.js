import { constants } from "../../constants";

describe("Register Tests", () => {

  it("Register Test", () => {
    cy.visit(`${constants.LOGIN}`);
    cy.get("[id=email]").type("test@test.com");
    cy.get("[id=password]").type("pass");
    cy.get("[id=signin]").click();
    cy.wait(2000);
  });

  

});
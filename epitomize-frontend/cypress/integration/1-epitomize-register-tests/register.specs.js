import { constants } from "../../constants";

describe("Register Tests", () => {

  it("Register Test", () => {
    cy.visit(`${constants.REGISTER}`);
    cy.get("[id=Emailid]").type("testemailtest@.com");
    cy.get("[id=Password]").type("pass123");
    cy.get("[id=Username]").type("test_test");
    cy.get("[id=About]").type("Testing about");
    cy.get("[id=Profilepicture]").type("PP_test");
    cy.get("[id=signup_submit]").click();
    cy.wait(2000);
  });

});
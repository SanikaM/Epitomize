import { constants } from "../../constants";

describe("Register Tests", () => {

  it("Register Test", () => {
    cy.visit(`${constants.REGISTER}`);
    cy.get("[id=Emailid]").type("test@epitomize.com");
    cy.get("[id=Password]").type("test123");
    cy.get("[id=Username]").type("test_test");
    cy.get("[id=About]").type("Testing about");
    cy.get("[id=Profilepicture]").type("PP_test");
    cy.get("[id=tags-outlined]").type("SE");
    cy.contains('SE').click({force:true})
    cy.get("[id=signup_submit]").click();
    cy.visit(`${constants.REGISTER}`);
    cy.get("[id=Emailid]").type("test2@epitomize.com");
    cy.get("[id=Password]").type("pass123");
    cy.get("[id=Username]").type("test_test");
    cy.get("[id=About]").type("Testing about");
    cy.get("[id=Profilepicture]").type("PP_test");
    cy.get("[id=tags-outlined]").type("SE");
    cy.contains('SE').click({force:true})
    cy.get("[id=signup_submit]").click();
  });

});
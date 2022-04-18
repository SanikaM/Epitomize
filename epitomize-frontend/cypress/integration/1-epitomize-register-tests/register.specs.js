import { constants } from "../../constants";

describe("Register Tests", () => {

  it("Register Test", () => {
    cy.visit(`${constants.REGISTER}`);
    cy.get("[id=Emailid]").type("testcypress@epitomize.com");
    cy.get("[id=Password]").type("test123");
    cy.get("[id=Username]").type("test_test");
    cy.get("[id=About]").type("Testing about");
    cy.get("[id=tags-outlined]").type("Database");
    cy.contains('Database').click({force:true})
    cy.get("[id=signup_submit]").click();
    cy.visit(`${constants.REGISTER}`);
    cy.get("[id=Emailid]").type("testcypress2@epitomize.com");
    cy.get("[id=Password]").type("pass123");
    cy.get("[id=Username]").type("test_test2");
    cy.get("[id=About]").type("Testing about");
    cy.get("[id=tags-outlined]").type("Database");
    cy.contains('Database').click({force:true})
    cy.get("[id=signup_submit]").click();
  });

});
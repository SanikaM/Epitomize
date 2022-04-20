import { constants } from "../../constants";

describe("Reading List Tests", () => {

  it("Reading List Test", () => {

    cy.visit(`${constants.LOGIN}`)
    cy.wait(1000);
    cy.get("[id=readinglist2]").click();
    
  });

});
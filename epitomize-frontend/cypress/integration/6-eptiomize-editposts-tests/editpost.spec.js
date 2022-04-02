import { constants } from "../../constants";

describe("Posts Tests", () => {

  it("Create Posts Test", () => {
    cy.visit(`${constants.EDIT_POST}`);
    cy.get("[id=title]").type("edit");
    cy.get("[id=publish]").click();
  });

});
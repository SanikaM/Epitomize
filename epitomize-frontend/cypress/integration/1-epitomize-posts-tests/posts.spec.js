import { constants } from "../../constants";

describe("Posts Tests", () => {

  it("Create Posts Test", () => {
    cy.visit(`${constants.CREATE_POST}`);
    cy.get("[id=title]").type("cypresstesting");
    cy.get("[id=summary]").type("testing through cypress");
    cy.get("[id=tags]").type("tcypress");
    cy.get("[id=posttype]").type("blog");
    cy.get("[id=publish]").click();
  });

  it("Delete Post Test", () => {
    cy.visit(`${constants.GET_POSTS}`);
    cy.get("[id=delete1]").click();

  });

});
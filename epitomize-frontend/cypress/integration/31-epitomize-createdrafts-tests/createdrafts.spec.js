import { constants } from "../../constants";

describe("Drafts Tests", () => {

  it("Create Drafts Test", () => {
    const d = new Date()
    cy.visit(`${constants.CREATE_POST}`);
    cy.getCookie('access_token')
    .then((cookie) => {
      console.log(cookie)
      cy.log(cookie.value)
    })
    cy.get("[id=title]").type("cypresstesting" + d);
    cy.get("[id=summary]").type("testing through cypress");
    cy.get("[id=tags]").type("tcypress");
    cy.get("[id=posttype]").type("blog");
    cy.get("[id=draft]").click();
    cy.visit(`${constants.CREATE_POST}`);
    cy.get("[id=title]").type("cypresstestingdraft2" + d);
    cy.get("[id=summary]").type("testing through cypress draft");
    cy.get("[id=tags]").type("tcypress");
    cy.get("[id=posttype]").type("blog");
    cy.get("[id=draft]").click();
  });

});
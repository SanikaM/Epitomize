import { constants } from "../../constants";

describe("Drafts Tests", () => {

  it("Create Drafts Test", () => {

    cy.visit(`${constants.CREATE_POST}`);
    cy.getCookie('access_token')
    .then((cookie) => {
      console.log(cookie)
      cy.log(cookie.value)
    })
    cy.get("[id=title]").type("cypresstesting");
    cy.get("[id=summary]").type("testing through cypress");
    cy.get("[id=tags]").type("tcypress");
    cy.get("[id=posttype]").type("blog");
    cy.get("[id=draft]").click();
  });

});
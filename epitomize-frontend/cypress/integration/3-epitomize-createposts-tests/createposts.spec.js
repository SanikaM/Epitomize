import { constants } from "../../constants";

describe("Posts Tests", () => {

  it("Create Posts Test", () => {

    cy.visit(`${constants.CREATE_POST}`);
    cy.getCookie('access_token')
    // .should('have.property', 'value')
    .then((cookie) => {
      console.log(cookie)
      cy.log(cookie.value)
      // cy.setCookie("access_token", cookie.value, { path: '/' })
        // cookieValue = cookie.value;
        // YOU SHOULD CONSUME `cookieValue` here
        // .. go ahead inside this `then` callback
    })
    cy.get("[id=title]").type("cypresstesting");
    cy.get("[id=summary]").type("testing through cypress");
    cy.get("[id=tags]").type("tcypress");
    cy.get("[id=posttype]").type("blog");
    cy.get("[id=publish]").click();
  });

});
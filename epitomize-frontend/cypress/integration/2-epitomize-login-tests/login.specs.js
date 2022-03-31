import { constants } from "../../constants";

describe("Login Tests", () => {

  it("Login Test", () => {
    cy.visit(`${constants.LOGIN}`);
    cy.get("[id=email]").type("test@test.com");
    cy.get("[id=password]").type("pass");
    cy.get("[id=signin]").click();
    cy.wait(2000);

    cy.getCookie('access_token')
    .then((cookie) => {
      cy.setCookie("access_token", cookie.value, { path: '/' })
    })
  });

  

});
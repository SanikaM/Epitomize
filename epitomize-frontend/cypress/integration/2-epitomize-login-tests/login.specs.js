import { constants } from "../../constants";

describe("Login Tests", () => {

  it("Login Test", () => {
    cy.visit(`${constants.LOGIN}`);
    cy.get("[id=email]").type("test@epitomize.com");
    cy.get("[id=password]").type("pass123");
    cy.get("[id=signin]").click();
    cy.wait(2000);

    cy.getCookie('access_token')
    .then((cookie) => {
      cy.log(cookie)
      cy.setCookie("access_token", cookie.value, { path: '/' })
    })
  });

  

});
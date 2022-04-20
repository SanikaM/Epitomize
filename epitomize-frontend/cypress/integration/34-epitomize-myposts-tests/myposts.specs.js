import { constants } from "../../constants";

describe("My Posts Tests", () => {

  it("My Posts Test", () => {
    cy.visit(`${constants.MYPOSTS}`);
  });

});
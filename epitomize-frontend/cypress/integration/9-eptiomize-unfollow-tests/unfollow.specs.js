import { constants } from "../../constants";

describe("Unfollow Tests", () => {

  it("Unollow Test", () => {
    cy.visit(`${constants.LOGIN}`);
    cy.get("[id=2unfollow]").click();
  });

});
describe("Basket", () => {
    it("Test basket", () => {
      cy.visit("http://localhost:3000");
      cy.wait(10000) // wait for 10 seconds
      cy.contains("Beth Smith").click();
      cy.get("#quantity").contains("20");
      cy.get('#addBasket').click();
      cy.get('#back').click();
      cy.get('#goToCart').click();
      cy.wait(5000) // wait for 10 seconds
      cy.get("#cartFigurine").contains("Figurine de Beth Smith");
      cy.get("#cartQuantity").contains("Quantitée 20");
    });
  });
  
import {Given,When,Then, And, Before} from "cypress-cucumber-preprocessor/steps";

When('Open Mall.sk page.', ()=>{
    cy.visit(Cypress.env('Mall'))
    cy.get('.legal-consent__wrap__right-container > .button--old-tertiary').click()
})

Then('Navigate to {string} buy page.', (Product)=>{
    cy.get('#site-search-input').type(Product)
})

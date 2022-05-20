// Import commands.js using ES2015 syntax:


// Alternatively you can use CommonJS syntax:
// require('./commands')

export class dashboardPage {

    get openHealtTab() {
        return cy.get('[data-cy="segment-button-health"]');
    }

}

export default dashboardPage;
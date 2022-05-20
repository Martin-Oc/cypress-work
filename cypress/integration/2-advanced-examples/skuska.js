
const requiredExample = require('../../fixtures/credentials')

context('Files', () => {
   

    before(function () {
        cy.fixture('credentials').then(function (data) {
          this.data = data;
        })
      })


      it('cy.fixture() - load a fixture',function () {


        cy.visit(Cypress.env('myUNIQA-mobile')) 
        cy.get('[data-cy=landing-page-login-button]').click()

       // expect(this.credentials, 'fixture in the test context')
       // .to.deep.equal(requiredExample)

       cy.get('#username').type(this.data.username)

      })

})
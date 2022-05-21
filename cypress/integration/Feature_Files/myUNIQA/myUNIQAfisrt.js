import {Given,When,Then, And, Before} from "cypress-cucumber-preprocessor/steps";
import dashboardPage from '../../../support/dashboard';

const dashboard = new dashboardPage();
//const tests = require('/Users/martinockay/CypressAutomation/cypress/fixtures/credentials.json');

Given('Navigate to myUNIQA development environment.',()=>
{
    //visit page
    cy.visit(Cypress.env('myUNIQA-mobile')) 
    //end of visit page 

    cy.get('[data-cy=landing-page-login-button]').click()

    /*cy.on('uncaught:exception', (err, runnable) =>{
        return false
    }) */
})

before(function () {
    cy.fixture('credentials').then(function (data) {
      this.data = data;
    })
  })

  Then('Log in', function() 
{
    cy.login(this.data.gntester.username,this.data.gntester.password)
})

Then('Log in with {string}.', function(content) 
{
    cy.viewport('iphone-5')
    cy.login(content,"pwtest1")
})

Then('Log in.', function(dataTable) 
{
    cy.login(dataTable.rawTable[0][1],dataTable.rawTable[1][1])
})



When('Home contract.',()=>
{
    // move to home contract
    cy.get('[data-cy=contracts_list_entry-Absicherung-HOME-1] > .section__contracts-list__contract', {timeout:10000}).should('be.visible')
    cy.get('[data-cy=contracts_list_entry-Absicherung-HOME-1] > .section__contracts-list__contract').click()
    // end of move to home contract

    // move to vertragsdetails 
    cy.get('[data-cy=segment-button-contractDetails]').click()
    // end of move to vertragsdetails
})

And('Verify basic information.',function(dataTable)
{
    cy.wait(5000)
    cy.get('body').then((body) => {
        if (body.find('span[data-cy=contract-detail-policy-holder-name]').length > 0)
        {
            //cy.get('span[data-cy=contract-detail-policy-holder-name]').click()
        } else{
            cy.get('[data-cy=segment-button-contractDetails]').click()
        }
    })

    cy.get('[data-cy=contract-status-label-text]').contains(dataTable.rawTable[0][1])
    cy.get('span[data-cy=contract-detail-policy-holder-name]').contains(dataTable.rawTable[1][1])
    cy.get('span[data-cy=contract-detail-policy-holder-birthdate').contains(dataTable.rawTable[2][1])
    cy.get('span[data-cy=contract-detail-policy-holder-roles]').contains(dataTable.rawTable[3][1])
    cy.get('span[data-cy=contract-detail-policy-holder-address]').contains(dataTable.rawTable[4][1])
    cy.get('span[data-cy=contract-detail-policy-holder-iban]').contains(dataTable.rawTable[5][1])
    cy.get('span[data-cy=contract-detail-contract-start-date]').contains(dataTable.rawTable[6][1])

})

Then('Log out.',()=>
{
    cy.get('.logout').click()

})

Then('Navigate to unfall contract',()=>{
    //navigate to cotract unfall
    cy.get('[data-cy=contracts_list_entry-Vorsorge-ACCIDENT-2]').click()
    // end of navigate to cotract unfall
})

Then('Navigate to contract {string}',function(content) 
{
    //navigate to cotract 
    cy.get(content).click()
    // end of navigate to cotract 
})


Given('Navigate to URL.', ()=>{
    cy.visit('https://login-test.uniqa.at/as/authorization.oauth2?response_type=code&client_id=bbweb&scope=openid%20profile&state=7f3c8a7c-0030-4ab9-9250-b565a0cdd1c6&redirect_uri=https://myuniqa-development.myu-awstest.uniqa.cloud/api/auth/openid&registration_id=bbweb')
})


Given('Navigate to dashboard.', ()=>{
    cy.visit('https://myu-advanced.myu-awstest.uniqa.cloud/master/login/dashboard')

   // cy.get('[data-cy=mobile-login-button]').should('be.visible')
   // cy.get('[data-cy=mobile-login-button]').click()

   cy.get('[data-cy=landing-page-login-button]').click()

    cy.get('#username').type('bblume')

    cy.get('#password').type('pwtest1')

    cy.get('#loading > .btn').click()
})


Given('Navigate to CPR page', ()=>{
    cy.visit('https://cpr-regression.myu-awstest.uniqa.cloud/registration/wizard/search')

    //accept all cookie
    cy.get('.d-none > .cc_buttons-accept_all_cookies').click()

    cy.on('uncaught:exception', (err, runnable) =>{
        return false
    })
})

Then('Fill up data', ()=>{
    cy.get('#birthday').type('31.07.1966')

    cy.get('#customerPostalCode').type('1230')

    cy.get('#customerPolicyNumber').type('01/021/001429')

    cy.get('.order-2 > .btn').click({force:true})
})

Then('Verify same page', ()=>{
    cy.get('.frc-container').should('be.visible')
})


//health, car, home, life

And('I visit {string} number {string} in {string}.', (element, number, title) => {
    cy.wait(5000)
    if(element === "health"){
        cy.get('[data-cy="contracts_list_entry_link-'+ title +'-HEALTH-'+ number +'"]').click()
    } 
    else if (element === "car"){
        cy.get('[data-cy="contracts_list_entry_link-'+ title +'-CAR-'+ number +'"]').click()
    } 
    else if (element === "home"){
        cy.get('[data-cy="contracts_list_entry_link-'+ title +'-HEALTH-'+ number +'"]').click()
    } 
    else if (element === "life"){
        cy.get('[data-cy="contracts_list_entry_link-'+ title +'-LIFE-'+ number +'"]').click()
    } else if (element === "no"){
        cy.get('[data-cy="section_name_web-Gesundheit"]').should('not.exist')
        cy.get('[data-cy="section_name_web-Absicherung"]').should('not.exist')
        cy.get('[data-cy="section_name_web-Vorsorge"]').should('not.exist')
    }
    cy.wait(2000)
    cy.get('a[data-tosca="header_uniqa-link"]').click()
})


Then('{string} and upload file.', (raise_claim) => {
 if (raise_claim === 'no')
 {

 } else if(raise_claim === 'yes')
 {
    cy.get('button[data-cy="claim_submission_button-health"]').click()

 }
})

And('{string} tab is not shown', (element) => {
    if (element === 'skip') {
      cy.log('step skipped for this test');
    } else {
      eval(element).should('not.exist');
    }
  });
  
  
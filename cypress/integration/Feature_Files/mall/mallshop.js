import {
  Given,
  When,
  Then,
  And,
  Before,
} from 'cypress-cucumber-preprocessor/steps'

Before(() => {
  cy.visit('https://www.mall.sk/kosik')
  cy.wait(1500)
  let delete2 = document.querySelector('.cart-overview-item-row__delete')

  if (delete2) {
    cy.get('div.cart-overview-item-row__delete').click()
  }
})

When('Open Mall.sk page.', () => {
  cy.visit(Cypress.env('Mall'))
  cy.get(
    '.legal-consent__wrap__right-container > .button--old-tertiary'
  ).click()
})

Then('Navigate to {string} buy page.', (Product) => {
  /*cy.get('#site-search-input').type(Product) //type to search bar

  cy.wait(2000)

  cy.get('li[data-testid="search-category-item"]') //get searched items
    .contains(Product) //contain for right item
    .click({ force: true })*/

  cy.visit('https://www.mall.sk/macbook-pro')
})

Then('Add {string} to cart.', (ProductName) => {
  cy.wait(3000)

  cy.get('h3.product-box-category__title') //get all names
    .contains(ProductName) //select neme product what i want
    .parent('.product-box-category__title-link') //get parent of link
    .siblings('.product-box-category__button') //get buttlon like sibling
    .click()

  cy.wait(3000)
})

Then('Navigate to cart.', () => {
  cy.get('.mobile-icons__cart > .mobile-icons__item__icon > svg > path').click() //navigate to cart
  cy.get('.cart-layout__submit  button[name="submitButton"]').click()
})

Then(
  'Shipping info {string} {string} {string} {string} {string} {string} {string}.',
  (Name, Surname, email, Phone, Street, Town, PLZ) => {
    cy.AddorVerify(Name, 'firstname')
    cy.AddorVerify(Surname, 'lastname')
    cy.AddorVerify(email, 'email')
    cy.AddorVerify(Phone, 'phone')
    cy.AddorVerify(Street, 'street')
    cy.AddorVerify(Town, 'city')
    cy.AddorVerify(PLZ, 'zip')

    cy.get('.col-sm-offset-4 > .btn').click()
  }
)

And(
  'Verification of warning {string} {string} {string} {string} {string} {string} {string} in shipping.',
  (Name, Surname, email, Phone, Street, Town, PLZ) => {
    cy.wait(2000)
    let Dorucovacie_udaje = document.querySelector('#shipping-firstname')

    console.log('ahoj1')
    cy.get('body').then((body) => {
      if (body.find('#shipping-firstname').length > 0) {
        console.log('ahoj2')
        cy.AddorVerify('verify', '1')
        cy.AddorVerify('verify', '2')
        cy.AddorVerify('verify', '3')
        cy.AddorVerify('verify', '4')
        cy.AddorVerify('verify', '5')
        cy.AddorVerify('verify', '6')
        cy.AddorVerify('verify', '7')
      } else {
        console.log('ahoj3')
      }
    })
  }
)

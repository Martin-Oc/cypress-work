import {Given,When,Then, And} from "cypress-cucumber-preprocessor/steps"

const url = 'https://rahulshettyacademy.com/angularpractice/shop'
Given('Navigate to rahulshetty shop page.', () =>
{
    cy.visit(url)
})

When('Add product to shoping cart.', () =>
{
  
    cy.get('button.btn.btn-info').eq('1').click()
    cy.get('button.btn.btn-info').eq('2').click()
  
})

And('Make purchase.', () =>
{
    cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link').click() 
    cy.wait(2000)
    cy.get('button.btn.btn-success').click()
    cy.get('#country').type('Ind')
    cy.wait(5000)

    cy.get('.suggestions >').contains("India").click()

   // cy.get('.suggestions > ul > li > a').click() // slovakia 
    cy.get('#checkbox2').click({force: true})
    cy.get('.ng-untouched > .btn').click()
})

Then('Verify if purchase was succesfull.', ()=>
{
    cy.get('.alert.alert-success.alert-dismissible').should('contain','Success! Thank you! Your order will be delivered in next few weeks :-).')
    
}) 


//scenario Second testing 


Given('Navigate to rahulshetty automation practise page.', ()=>
{
    cy.visit(Cypress.env('Rahulshetty-practice'))
})

When('Test fist part.', ()=>
{
    //Radiobuttons
    cy.get('[for=radio2]').as("Radiobutton2-name") // whole element
    cy.get('input[value=radio2]').as("Radiobutton2") 
    cy.get('input[value=radio3]').as("Radiobutton3") 
    cy.get('@Radiobutton2-name').contains('Radio2')
    cy.get('@Radiobutton2').check()
    cy.get('@Radiobutton3').click() 
    //End of Radiobuttons

    //Typebox
    cy.get('#autocomplete').type('Cze')
        //choose suggestion from drop down
        cy.get('.ui-menu-item-wrapper').contains('Czech Republic').click()
        //end of choose suggestion from drop down
    //End of Typebox

    //Dropdown
        cy.get('#dropdown-class-example').select('Option1') // select option1
    //End of Dropdown

    //Check box
        cy.get('div.right-align label input').check() // check all check boxes
    //end of Check box 
})

When('Test second part.',()=>
{
    //open tab button
        cy.get('#opentab').invoke('removeAttr','target').click() 
    //end open tab button

    //verify next page
        cy.get('nav.main-menu').should('be.visible')
    //end of verify next page 

    // navigate back
        cy.go('back')
    // end of navigate back

    //alert
    cy.get('input#name').type('Alert')
    cy.get('input#alertbtn').click()
    //end of alert

    // confirm single button alert
    cy.on('window:alert',(str)=>
    {
        expect(str).to.equal('Hello Alert, share this practice page and share your knowledge')
    })
    // end of confirm single button alert

    //multi button alert
    cy.get('input.btn-style#confirmbtn').click()
    //end of multi button alert

    // confirm multibutoon alert
    cy.on('window:confirm',(str)=>
    {
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
    })
    // end of confirm multibutoon alert
})

When('Test third part.',()=>
{
    //each
    cy.get('tr td:nth-child(2)').each(($e1, index, $list) =>{

        //create conts for e1
        const text = $e1.text()
        //end of create conts for e1
        
        //verify if in table is 20
        if(text.includes('Learn SQL in Practical + Database Testing from Scratch'))
        {
            // verify text in table 
            expect(text).to.equal('Learn SQL in Practical + Database Testing from Scratch')
            // end of verify text in table 

            //verify number 25
            cy.get('tr td:nth-child(2)').eq(index).next().then(function(price)
            {
                const priceText = price.text()
                expect(priceText).to.equal('25')
            })  
            //verify number 25
        }

        //verify name in table 
        if(text.includes('Master Selenium Automation in simple Python Language'))
        {
            expect(text).to.equal('Master Selenium Automation in simple Python Language')
        }    
        //end of verify name in table
    })
    //end of each
})

    And('Test another table.', ()=>{
        cy.get('tr td:nth-child(3)').each(($e1) =>{
            const text = $e1.text()
            
            if(text.includes('Delhi'))
            {
                expect(text).to.equal('Delhi')
            }
        })
    })

    When('Test fuorth part.',()=>{
        cy.get('button#mousehover').trigger('mouseover')
        cy.get('a').contains('Reload').click({force:true})
    })
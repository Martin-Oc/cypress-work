Feature: Mall shop automation test

    Mall.sk is Slovak internet web shop with a lot features.

    Scenario Outline:Add Products to cart.
        When Open Mall.sk page.
        Then Navigate to "<Product>" buy page.
        Then Add "<ProductName>" to cart.
        Then Navigate to cart.
        Then Shipping info "<Name>" "<Surname>" "<email>" "<Phone>" "<Street>" "<Town>" "<PLZ>".
        And Verification of warning "<Name>" "<Surname>" "<email>" "<Phone>" "<Street>" "<Town>" "<PLZ>" in shipping.
   

        Examples:
            | Product      | ProductName   | Name  | Surname | email                | Phone      | Street | Town | PLZ    | checkbox |
            | Macbook pro  | Apple MacBook | Jožko | Pavol   | jozkopavol@noway.com | 0908512369 | Main 7 | Wien | 941 01 | true     |
            | Macbook pro  | Apple MacBook | yes   | yes     | yes                  | yes        | yes    | yes  | yes    | yes      |
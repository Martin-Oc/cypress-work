Feature: Mall shop automation test

    Mall.sk is Slovak internet web shop with a lot features.

    Scenario Outline:Add Products to cart.
        When Open Mall.sk page.
        Then Navigate to "<Product>" buy page.
        Then Add "<Product>" to cart.
        Then Navigate to cart.
        Then Shipping info "<Name>" "<Surname>" "<email>" "<Phone>" "<Street>" "<Town>" "<PLZ>".
        And Verification of warning "<Name>" "<Surname>" "<email>" "<Phone>" "<Street>" "<Town>" "<PLZ>" in shipping.
        And Close

        Examples:
            | Product      | Name  | Surname | email                | Phone      | Street | Town | PLZ  | checkbox |
            | Mackbook Pro | Jožko | Pavol   | jožko.pavol.noway.co | 0908512369 | Main 7 | Wien | 1020 | true     |
            | Mackbook Pro | yes   | yes     | yes                  | yes        | yes    | yes  | yes  | yes      |
Feature: First testing

    Start with testing my UNIQA feature to try what this tool is capable on.


    Scenario: Log in
        Given Navigate to myUNIQA development environment.
        Then Log in.


    Scenario: Log in to myUNIQA developemnt, with bblume and navigate to health claim and verify data.
        Given Navigate to myUNIQA development environment.
        Given Log in
        Then Navigate to contract "[data-cy=contracts_list_entry-Gesundheit-HEALTH-1] > .section__contracts-list__contract"
        And Verify basic information.
            | Status         | AUFRECHT                                              |
            | Name           | Millaku UUmdasch                                      |
            | Geburtsdatum   | 03.01.1988                                            |
            | Rolle          | Versicherungsnehmer, Prämienzahler, Hauptversicherter |
            | Anschrift      | Schwand 16/1 Hof, 2202 Enzersfeld                     |
            | Prämienkonto   | AT441200010011908604                                  |
            | Vertragsbeginn | 01.06.2017                                            |
        Then Log out.

    Scenario: Log in to myUNIQA developemnt, with bblume and navigate to health claim and verify data.
        Given Navigate to myUNIQA development environment.
        Given Log in with "gntester".
        Then Navigate to contract "[data-cy=contracts_list_entry-Gesundheit-HEALTH-1] > .section__contracts-list__contract"
        And Verify basic information.
            | Status         | AUFRECHT                                              |
            | Name           | Millaku UUmdasch                                      |
            | Geburtsdatum   | 03.01.1988                                            |
            | Rolle          | Versicherungsnehmer, Prämienzahler, Hauptversicherter |
            | Anschrift      | Schwand 16/1 Hof, 2202 Enzersfeld                     |
            | Prämienkonto   | AT441200010011908604                                  |
            | Vertragsbeginn | 01.06.2017                                            |
        Then Log out.


    Scenario: Verify unfall contrat
        Given Navigate to myUNIQA development environment.
        Given Log in.
            | username | bblume  |
            | password | pwtest1 |
        Then Navigate to contract "[data-cy=contracts_list_entry-Absicherung-HOME-1] > .section__contracts-list__contract"
        And Verify basic information.
            | Status         | AUFRECHT                                  |
            | Name           | Felician BBluma                           |
            | Geburtsdatum   | 06.10.1975                                |
            | Rolle          | Versicherungsnehmer, Prämienzahler        |
            | Anschrift      | Adolf-Pichler-Platz 10/10, 6020 Innsbruck |
            | Prämienkonto   | AT253209200000245456                      |
            | Vertragsbeginn | 11.09.2015                                |
        Then Log out.


    Scenario:  Try to make one step to navigate
        Given Navigate to myUNIQA development environment.
        Given Log in.
            | username | bblume  |
            | password | pwtest1 |
        Then Navigate to contract "[data-cy=contracts_list_entry-Vorsorge-ACCIDENT-2] > .section__contracts-list__contract"
        And Verify basic information.
            | Status         | AUFRECHT PROLONGIERT                      |
            | Name           | Felician BBluma                           |
            | Geburtsdatum   | 06.10.1975                                |
            | Rolle          | Versicherungsnehmer, Prämienzahler        |
            | Anschrift      | Adolf-Pichler-Platz 10/10, 6020 Innsbruck |
            | Prämienkonto   | AT253209200000245456                      |
            | Vertragsbeginn | 01.05.2011                                |
        Then Log out.



    Scenario: Capcha test
        Given Navigate to CPR page
        Then Fill up data
        Then Verify same page

    @focus
    Scenario Outline: Contract tab: <title>
        Given Navigate to myUNIQA development environment.
        Given Log in with "<user>".
        And I visit "<type>" number "<number>" in "<title>".
        Then "<raise-claim>" and upload file.
        Then Log out.

        Examples:
            | user                 | type   | number | title       | raise-claim |
            | gntester             | health | 1      | Gesundheit  | no          |
            | ectester002          | car    | 1      | Absicherung | no          |
            | testernotactivated01 | life   | 2      | Vorsorge    | no          |
            | sibirien2            | health | 3      | Gesundheit  | no          |
            | rsperner2            | no     |        | no contract | no          |
            | eddreher             | health | 1      | Gesundheit  | yes         |


# Copyright 2022 Tolam Earth
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

Feature: Unlisted Offsets

  @SMOKE_TEST @HEM-88
  Scenario: Choose 1 or more of my unlisted offsets
    Given I open the HEM page
    And I enter the account id of "c"
    When I click the Sell Offsets button
    Then I verify that the List Selected button is disabled

    When I click the first offset listed on the page
    Then I verify that the List Selected button is enabled

  @SMOKE_TEST @HEM-157
  Scenario: Review summary of chosen unlisted asset
    Given I open the HEM page
    And I enter the account id of "0.0.47879120"
    And I click the Sell Offsets button
    When I click the first offset listed on the page
    And I click the List Selected button
    Then I verify that the title of the page is "SUMMARY"

  @SMOKE_TEST @HEM-158
  Scenario: Express intent to List
    Given I make a GET request for "offsets?account_id=0.0.47879120&list_type=UNLISTED"
    And I open the HEM page
    And I enter the account id of "0.0.47879120"
    And I click the Sell Offsets button
    And I click the first offset listed on the page
    And I click the List Selected button
    Then I verify that the there are 1 offsets listed on the summary page
    And I verify on the listing summary page that the 1st selected offset is displayed

    When I click the Cancel and Go Back button
    Then I verify that the List Selected button is enabled
    And I verify that the first offset listed on the page is selected

    When I click the second offset listed on the page
    Then I verify that the List Selected button is enabled
    And I click the List Selected button
    Then I verify that the there are 2 offsets listed on the summary page
    And I verify on the listing summary page that the 1st selected offset is displayed
    And I verify on the listing summary page that the 2nd selected offset is displayed

  @SMOKE_TEST @HEM-159
  Scenario: Final Cancel before Listing
    Given I open the HEM page
    And I enter the account id of "0.0.47879120"
    And I click the Sell Offsets button
    And I click the first offset listed on the page
    And I click the List Selected button
    And I pause for 500 milliseconds
    When I click the Finalize Listing button
    # this is going to require some behind the scenes work as cypress cannot interact with other windows

  @SMOKE_TEST @HEM-149
  Scenario: As a Seller, verify the correct messaging appears when they have no offsets
    Given I open the HEM page
    When I enter the account id of "0.0.47900310"
    And I click the Sell Offsets button
    Then I verify that there are no offsets listed

  @SMOKE_TEST @HEM-149 @HEM-87 @HEM-104
  Scenario: As a Seller, View all my offsets (if only unlisted)
    Given I make a GET request for "offsets?account_id=0.0.48436940&list_state=UNLISTED"
    Then Verify the response status code is 200
    And I open the HEM page
    And I enter the account id of "0.0.48436940"
    And I click the Sell Offsets button
    Then I verify that all of the "UNLISTED" offsets ids are displayed

  @HEM-305
  Scenario: Review summary of unlisted asset(s)" view with the required price
    Given I open the HEM page
    When I enter the account id of "0.0.48436940"
    And I click the Sell Offsets button
    And I click the first offset listed on the page
    And I click the List Selected button
    And I pause for 500 milliseconds
    When on the first offset on the page I enter the listing price of "5.51"

  Scenario: When I have listed offsets then I should see them in the Listed offsets section of the account page
    Given I make a GET request for "offsets?list_state=LISTED&account_id=0.0.48318929"
    Given I open the HEM page
    When I enter the account id of "0.0.48318929"
    And I click the Sell Offsets button
    Then I verify that all of the "LISTED" offsets ids are displayed

#    commented out until data like this persists
#Scenario: I am able to search for my previous transactions
#    Given I open the HEM page
#    When I enter the account id of "0.0.48318929"
#    And I click the Sell Offsets button
#    When I search for the transaction id of "0.0.48469584@1664404450.92572185"

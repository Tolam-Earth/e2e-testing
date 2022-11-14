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

@UI
Feature: Purchase Offsets

@SMOKE_TEST @HEM-283
Scenario: Choose 1 or more of available offsets for purchase
    Given I open the HEM page
    And I enter the account id of "0.0.48437013"
    When I click the Buy Offsets button
    Then I verify that the Purchase Selected button is disabled

    When I click the first offset listed on the page
    Then I verify that the "Purchase" Selected button is enabled

@SMOKE_TEST @HEM-157
Scenario: Review summary of chosen offset to purchase
    Given I open the HEM page
    And I enter the account id of "0.0.48437013"
    And I click the Buy Offsets button
    When I click the first offset listed on the page
    And I click the Purchase Selected button
    Then I verify that the title of the page is "SUMMARY"

@SMOKE_TEST @HEM-96 @HEM-154
Scenario: Express intent to Purchase
    Given I make a POST request to the simplesearch endpoint
    And Verify the response status code is 200
    And I open the HEM page
    And I enter the account id of "0.0.48437013"
    And I click the Buy Offsets button
    And I click the first offset listed on the page
    And I click the Purchase Selected button
    Then I verify that the there are 1 offsets listed on the summary page
    And I verify on the marketplace summary page that the 1st selected offset is displayed

    When I click the Cancel and Go Back button
    Then I verify that the "Purchase" Selected button is enabled
    And I verify that the first offset listed on the page is selected

    When I click the second offset listed on the page
    Then I verify that the Purchase Selected button is enabled
    And I click the Purchase Selected button
    Then I verify that the there are 2 offsets listed on the summary page
    And I verify on the marketplace summary page that the 1st selected offset is displayed
    And I verify on the marketplace summary page that the 2nd selected offset is displayed

@SMOKE_TEST @HEM-159
Scenario: Final Cancel before Purchasing
    Given I open the HEM page
    And I enter the account id of "0.0.48437013"
    And I click the Buy Offsets button
    And I click the first offset listed on the page
    And I click the Purchase Selected button
    And I pause for 500 milliseconds
    When I click the Finalize Listing button

@SMOKE_TEST @HEM-283
 Scenario: As a Buyer, View all listed offsets
     Given I make a POST request to the simplesearch endpoint
     Then Verify the response status code is 200
     And I open the HEM page
     And I enter the account id of "0.0.48437013"
     And I click the Buy Offsets button
     Then I verify that all of the all of the listed offsets are displayed in the Marketplace

@HEM-314
Scenario: View Buyer Detailed Listed Offset
    Given I open the HEM page
    And I enter the account id of "0.0.48437013"
    And I click the Buy Offsets button
    When I click the offset with the token serial id combination of "0.0.48243577 (27)"
    Then I verify that offset details modal is open

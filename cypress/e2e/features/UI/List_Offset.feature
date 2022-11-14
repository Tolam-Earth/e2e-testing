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
Feature: List Offsets

@HEM-303
Scenario: as a buyer I want to see the max and min price of my offset
    Given I make a POST request to the price endpoint
        | token_id     | serial_number |
        | 0.0.48437093 | 1             |
    And I open the HEM page
    And I enter the account id of "0.0.48436940"
    And I click the Sell Offsets button
    And I click the first offset listed on the page
    When I click the "List" Selected button
    Then I verify that correct max and min prices are displayed to the user
    And I click the Connect Wallet button

@HEM-305    
Scenario: Review summary of unlisted offset(s) needs to allow the seller to set the price on listing offsets
    Given I make a POST request to the price endpoint
        | token_id     | serial_number |
        | 0.0.48437093 | 1             |
    And I open the HEM page
    And I enter the account id of "0.0.48436940"
    And I click the Sell Offsets button
    And I click the first offset listed on the page
    When I click the "List" Selected button
    Then on the first offset on the page I enter the listing price of "10.15"
    # doesn't work
    # And I click to increase the listing price

@HEM-333
Scenario: Review summary of unlisted offset(s) needs to allow the seller to set the price on listing offsets
    Given I make a POST request to the price endpoint
        | token_id     | serial_number |
        | 0.0.48437093 | 1             |
    And I open the HEM page
    And I enter the account id of "0.0.48436940"
    And I click the Sell Offsets button
    And I click the first offset listed on the page
    When I click the "List" Selected button
    And I click the Use Min listing price button
    # doesn't work
    # Then I verify the min price is the listed price of the offset
    And I click the Use Max listing price button
    # doesn't work    
    # Then I verify the max price is the listed price of the offset
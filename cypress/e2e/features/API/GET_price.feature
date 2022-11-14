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

@API
Feature: Get offsets

  @HEM-300 @HEM-432
  Scenario: validate that a valid POST request to price returns a 200 and a max and min price
    Given I make a POST request to the price endpoint
      | token_id         | serial_number |
      | 0.0.0.0.48139644 | 51            |
      | 0.0.0.0.48139644 | 45            |
    Then Verify the response status code is 200
    When I verify that all returned NFTS have a max and min price

#    once we have the ability to create an offset with no min or max price then we can uncomment this test
#  @HEM-300 @HEM-432
#  Scenario: validate that a valid POST request to price returns a 207 when max or min price is null
#    Given I make a POST request to the price endpoint
#      | token_id                          | serial_number                     |
#      | need_offset_that_matches_criteria | need_offset_that_matches_criteria |
#    Then Verify the response status code is 207


  @SMOKE_TEST @HEM-300 @HEM-432
  Scenario: valid that a invalid POST request to price returns a 400
    Given I make a POST request to the price endpoint
      | token_id | serial_number |
      | abcde    | 51            |
    Then Verify the response status code is 400

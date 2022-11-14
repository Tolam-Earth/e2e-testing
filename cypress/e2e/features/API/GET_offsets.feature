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

  @SMOKE_TEST
  Scenario: verify that a valid GET request to offsets returns a 200 and the correct account and list type for UNLISTED offsets
    Given I make a GET request for "offsets?account_id=0.0.47879120&list_state=UNLISTED"
    Then Verify the response status code is 200
    When I verify that all returned offsets are of type "UNLISTED"
    And I verify that all returned offsets are owned by "0.0.47879120"

  @SMOKE_TEST @HEM-191
  Scenario: verify that a valid GET request to offsets returns a 200 and no results when list_state is LISTED but user doesn't have any
    Given I make a GET request for "offsets?account_id=0.0.47879120&list_state=LISTED"
    Then Verify the response status code is 200
    And I verify that no offsets are returned
    And I verify that all returned offsets are owned by "0.0.47879120"

  @SMOKE_TEST @HEM-191
  Scenario: verify that a valid GET request to offsets returns a 200 and the correct account when list_state is either LISTED or ALL for an account with only LISTED assets
    Given I make a GET request for "offsets?account_id=0.0.48469584&list_state=LISTED"
    Then Verify the response status code is 200
    And I verify that all returned offsets are of type "LISTED"
    And I verify that all returned offsets are owned by "0.0.48469584"

    When I make a GET request for "offsets?account_id=0.0.48469584&list_state=ALL"
    Then Verify the response status code is 200
    And I verify that all returned offsets are of type "LISTED"
    And I verify that all returned offsets are owned by "0.0.48469584"

  @SMOKE_TEST @HEM-191 @HEM-262
  Scenario: verify that a valid GET request to offsets returns a 200 and the correct account when list_state is either LISTED or ALL for an account with LISTED and UNLISTED assets
    Given I make a GET request for "offsets?account_id=0.0.47983222&list_state=LISTED"
    Then Verify the response status code is 200
    And I verify that all returned offsets are of type "LISTED"
    And I verify that all returned offsets are owned by "0.0.47983222"

    When I make a GET request for "offsets?account_id=0.0.47983222&list_state=UNLISTED"
    Then Verify the response status code is 200
    And I verify that all returned offsets are of type "UNLISTED"
    And I verify that all returned offsets are owned by "0.0.47983222"

    When I make a GET request for "offsets?account_id=0.0.47983222&list_state=ALL"
    Then Verify the response status code is 200
    And I verify that the returned offsets are of type "LISTED" and "UNLISTED"
    And I verify that all returned offsets are owned by "0.0.47983222"

  @SMOKE_TEST @HEM-191 @HEM-262
  Scenario: verify that a valid GET request to offsets returns a 200 and returns all offsets when list_state param is not provided
    When I make a GET request for "offsets?account_id=0.0.47983222"
    Then Verify the response status code is 200
    And I verify that the returned offsets are of type "LISTED" and "UNLISTED"
    And I verify that all returned offsets are owned by "0.0.47983222"

  @SMOKE_TEST
  Scenario: verify that a invalid GET request to offsets returns a 400
    Given I make a GET request for "offsets?account_id=abc&list_state=UNLISTED"
    Then Verify the response status code is 400

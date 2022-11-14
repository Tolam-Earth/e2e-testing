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
Feature: Search Offsets

  @SMOKE_TEST @HEM-303
  Scenario: as a buyer I want to be able to filter offsets by category
    Given I open the HEM page
    And I enter the account id of "0.0.48436940"
    And I click the Buy Offsets button
    When I click the product category dropdown
    And I select "Renewable Energy" from the product category dropdown

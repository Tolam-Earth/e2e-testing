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

#@DB
#Feature: Test DB connection
#
#Scenario: ARMM test
#    Given I make a POST request for "pubsub/publish" endpoint
#    Then Verify the response status code is 200
#    When I execute select query on postgres DB, where name equals "0.0.0-4555"

/*!
 * Copyright 2022 Tolam Earth
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import MarketplacePage from '../../../pages/MarketplacePage/MarketplacePage';
import AccountPage from '../../../pages/AccountPage/AccountPage';

const addContext = require('mochawesome/addContext');

const marketplacePage = new MarketplacePage();
const accountPage = new AccountPage();

Then(/^I verify that all of the all of the listed offsets are displayed in the Marketplace$/, () => {
    cy.getState("apiData").then(body => {
        for (let i = 0; i < body.results.length; i++) {
            let expectedValue = body.results[i].nft.token_id + ' (' + body.results[i].nft.serial_number + ')';
            if ((i) % 10 == 0 && (i != 1 && i != 0)) {
                accountPage.clickNextOffsetButton();
                accountPage.verifyUnlistedOrAvailableOffsetRowData(expectedValue)
            }
        }
    })
});

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
import AccountPage from '../../../pages/AccountPage/AccountPage';

const addContext = require('mochawesome/addContext');

const accountPage = new AccountPage();

When(/^I click the first offset listed on the page$/, () => {
    accountPage.clickFirstOffset();
});

When(/^I click the second offset listed on the page$/, () => {
    accountPage.clickOffset(1);
});

When(/^I click the offset with the token serial id combination of "(.*)"$/, (tokenSerialId) => {
    accountPage.clickOffsetDetail(tokenSerialId);
});

When(/^I click the (.*) Selected button$/, (value) => {
    accountPage.verifyOffsetSelectedButtonEnabled();
    accountPage.clickOffsetSelectedButton();
});

When(/^I click the product category dropdown$/, () => {
    accountPage.clickDropdown(1);
});

When(/^I select "(.*)" from the product category dropdown$/, (productCategory) => {
    cy.contains(productCategory).click();
});

When(/^I search for the transaction id of "(.*)"$/, (transactionId) => {
    accountPage.enterTransactionId(transactionId);
});

Then(/^I verify that the (.*) Selected button is enabled$/, (value) => {
    accountPage.verifyOffsetSelectedButtonEnabled();
});

Then(/^I verify that the (.*) Selected button is disabled$/, (value) => {
    accountPage.verifyOffsetSelectedButtonDisabled();
});

Then(/^I verify that account card on the page displays the account id of "(.*)"}$/, (accountId) => {
    accountPage.verifyAccountIdOnCard(accountId);
});

Then(/^I verify that the first offset listed on the page is selected$/, () => {
    accountPage.verifyFirstOffsetSelected();
});

Then(/^I verify that there are no offsets listed$/, () => {
    accountPage.verifyNoOffsetsListed();
});

Then(/^I verify that all of the "(.*)" offsets ids are displayed$/, (offsetType) => {
    cy.getState("apiData").then(body => {
        for (let i = 0; i < body.offsets.length; i++) {
            let expectedValue = body.offsets[i].offset.nft.token_id + ' (' + body.offsets[i].offset.nft.serial_number + ')';
            if ((i) % 10 == 0 && (i != 1 && i != 0)) {
                accountPage.clickNextOffsetButton();
            }
            if (offsetType == 'UNLISTED' || offsetType == 'AVAILABLE') {
                accountPage.verifyUnlistedOrAvailableOffsetRowData(expectedValue)
            } else if (offsetType == 'LISTED') {
                accountPage.verifyListedOffsetRowData(expectedValue, i)
            }

        }
    })
});

Then(/^I verify that offset details modal is open$/, () => {
    accountPage.verifyOffsetDetailOpen();
});

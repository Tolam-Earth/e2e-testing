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
import SummaryPage from '../../../pages/SummaryPage/SummaryPage';
const addContext = require('mochawesome/addContext');

const summaryPage = new SummaryPage();

Then(/^I verify that the title of the page is "(.*)"$/, (pageTitle) => {
    summaryPage.verifyTableTitle(pageTitle);
    });

Then(/^I verify that the there are (.*) offsets listed on the summary page$/, (countOfOffsets) => {
    summaryPage.verifyCountOfOffsetsListed(countOfOffsets)
    }); 

Then(/^I verify on the listing summary page that the (.*) selected offset is displayed$/, (rowNumber) => {
    rowNumber = rowNumber.replace(/[^\d.ex-]+/gi, '')
    verifyOffsetRow((parseInt(rowNumber)-1))
})

Then(/^I verify on the marketplace summary page that the (.*) selected offset is displayed$/, (rowNumber) => {
    rowNumber = rowNumber.replace(/[^\d.ex-]+/gi, '')
    verifyMarketplaceOffsetRow((parseInt(rowNumber)-1))
})

When(/^I click the Cancel and Go Back button$/, () => {
    summaryPage.clickCancelGoBackButton()
    });

When(/^I click the Finalize Listing button$/, () => {
    summaryPage.clickFinalizeListingButton()
    });

When(/^I click the Connect Wallet button$/,() => {
    summaryPage.clickConnectWalletButton();
    });

When(/^on the first offset on the page I enter the listing price of "(.*)"$/,(listPrice) => {
    summaryPage.enterPrice(listPrice);
    });

// doesn't work
When(/^I click to increase the listing price$/, () => {
    summaryPage.increasePrice()
    })

When(/^I click the Use Min listing price button$/, () => {
    summaryPage.clickUseMinButton()
})

When(/^I click the Use Max listing price button$/, () => {
    summaryPage.clickUseMaxButton()
    })

Then(/^I verify that correct max and min prices are displayed to the user$/, () => {
        cy.getState("apiData").then(body => {
                var expectedMinValue = minPrice(body, 0)
                var expectedMaxValue = maxPrice(body, 0)
                expectedMinValue = formatMinMaxPrice(expectedMinValue)
                expectedMaxValue = formatMinMaxPrice(expectedMaxValue)
                cy.contains('$' + expectedMinValue + ' - $' + expectedMaxValue).should('be.visible')
              })
    });

Then(/^I verify the min price is the listed price of the offset$/, () => {
        cy.getState("apiData").then(body => {
            var expectedMinValue = minPrice(body, 0)
            expectedMinValue = formatMinMaxPrice(expectedMinValue)
            summaryPage.verifyListedPrice(expectedMinValue)
            })
});    

Then(/^I verify the max price is the listed price of the offset$/, () => {
    cy.getState("apiData").then(body => {
        var expectedMaxValue = maxPrice(body, 0)
        expectedMaxValue = formatMinMaxPrice(expectedMaxValue)
        summaryPage.verifyListedPrice(expectedMaxValue)
        })
});

function verifyOffsetRow(rowId) {
    cy.getState("apiData").then(body => {
        let expectedValue = body.offsets[rowId].offset.nft.token_id + ' (' + body.offsets[rowId].offset.nft.serial_number + ')';
        summaryPage.verifyOffsetId(expectedValue)
    });
}

function verifyMarketplaceOffsetRow(rowId) {
    cy.getState("apiData").then(body => {
        let expectedValue = body.results[rowId].nft.token_id + ' (' + body.results[rowId].nft.serial_number + ')';
        summaryPage.verifyOffsetId(expectedValue)
    });
}

function minPrice(body, rowId) {
    return minPrice = (body.prices[rowId].min_price).toString()
}

function maxPrice(body, rowId) {
    return minPrice = (body.prices[rowId].max_price).toString()
}

function formatMinMaxPrice(nonFormatedPrice) {
    return [nonFormatedPrice.slice(0, (nonFormatedPrice.length-2)), '.', nonFormatedPrice.slice((nonFormatedPrice.length-2))].join('')
}
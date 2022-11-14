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
var elements = require('./elements')
class SummaryPage {
    verifyTableTitle(value) {
        cy.get(elements.SUMMARYPAGE.TABLE_TITLE).should('contain.text', value);
    }

    verifyOffsetId(value) {
        cy.get(elements.SUMMARYPAGE.SUMMARY_CELL).contains(value).should('contain.text', value);
    }

    verifyCountOfOffsetsListed(value) {
        cy.get(elements.SUMMARYPAGE.SUMMARY_TABLE_ROWS).find('tr').should('have.length', parseInt(value))
    }

    clickCancelGoBackButton(){
        cy.get(elements.SUMMARYPAGE.CANCEL_GO_BACK_BUTTON).contains('Cancel and Go back').click()
    }

    enterPrice(value) {
        cy.get(elements.SUMMARYPAGE.LIST_PRICE).type(value)
    }

    clickFinalizeListingButton(){
        cy.get(elements.SUMMARYPAGE.FINALIZE_LISTING_BUTTON).contains('Connect wallet').click()
    }

    clickConnectWalletButton() {
        cy.contains(elements.SUMMARYPAGE.CONNECT_WALLET_BUTTON).click();
    }

// doesn't work
    increasePrice() {
        // in chrome dev tools you can go to settings gear and select "Show user agent shadow DOM" to inspect shadow elements
        cy.get(elements.SUMMARYPAGE.PRICE_SHADOW).shadow().find(elements.LISTPAGE.INCREASE_PRICE).click()
    }

    clickUseMinButton() {
        cy.contains(elements.SUMMARYPAGE.USE_MIN_BUTTON).click()
    }

    clickUseMaxButton() {
        cy.contains(elements.SUMMARYPAGE.USE_MAX_BUTTON).click()
    }

    verifyListedPrice(listedPrice){
        cy.get(elements.SUMMARYPAGE.ENTERED_PRICE).contains(listedPrice).text().should((value) =>{
            expect(value).to.contain(listedPrice)
        })
    }
}
export default SummaryPage;
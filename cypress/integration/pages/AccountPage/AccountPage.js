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
class AccountPage {
    verifyAccountIdOnCard(account_id) {
        return cy.get(elements.ACCOUNTPAGE.ACCOUNT_CARD).text().then(value => {
            cy.log("Text is :", value);
            expect(value).to.include(account_id);
            
          });
    }

    clickFirstOffset(){
        cy.get(elements.ACCOUNTPAGE.SELECT_OFFSET).first().click()

    }

    clickOffset(rowId){
        cy.get(elements.ACCOUNTPAGE.SELECT_OFFSET).eq(parseInt(rowId)).click()
    }

    clickOffsetDetail(tokenSerialId){
        cy.contains(tokenSerialId).find(elements.ACCOUNTPAGE.OFFSET_DETAIL_BUTTON).first().click()
    }

    clickNextOffsetButton(){
        cy.get(elements.ACCOUNTPAGE.NEXT_PAGE).first().click()
    }

    verifyOffsetSelectedButtonEnabled(){
        cy.get(elements.ACCOUNTPAGE.OFFSET_SELECTED_BUTTON).should('be.enabled')
       }

       verifyOffsetSelectedButtonDisabled(){
        cy.get(elements.ACCOUNTPAGE.OFFSET_SELECTED_BUTTON).should('be.disabled')
       }

    clickOffsetSelectedButton(){
        cy.get(elements.ACCOUNTPAGE.OFFSET_SELECTED_BUTTON).click()
    }

    clickDropdown(dropdownIndex){
        cy.get(elements.ACCOUNTPAGE.PROJECT_CATEGORY_DROPDOWN).eq(parseInt(dropdownIndex)).click()
    }

    enterTransactionId(transactionId){
        cy.get(elements.ACCOUNTPAGE.TRANSACTION_SEARCH).clear().type(transactionId)
    }

    verifyFirstOffsetSelected(){
        cy.get(elements.ACCOUNTPAGE.OFFSET_CHECKBOX).first().should('be.visible')
    }

    verifyNoOffsetsListed(){
        cy.get(elements.ACCOUNTPAGE.NO_OFFSETS).should('be.visible')
    }

    verifyOffsetDetailOpen(){
        cy.get(elements.ACCOUNTPAGE.OFFSET_DETAIL_OPEN).should('be.visible')
    }

    verifyUnlistedOrAvailableOffsetRowData(offsetValue){
        cy.get(elements.ACCOUNTPAGE.OFFSET_DETAIL_ROW).first().contains(offsetValue).text().should((value) =>{
            expect(value).to.contain(offsetValue)
        })
    }

    verifyListedOffsetRowData(offsetValue, indexValue){
        cy.get(elements.ACCOUNTPAGE.OFFSET_DETAIL_ROW).eq(1).contains(offsetValue).text().should((value) =>{
            expect(value).to.contain(offsetValue)
        })
    }
}
export default AccountPage;
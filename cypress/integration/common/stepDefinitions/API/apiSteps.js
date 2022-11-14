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
Given(/^I make a GET request for "(.*)"$/, (urlPath) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('marketplace_api_server') + urlPath,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        cy.log("api response " + JSON.stringify(response))
        cy.saveState("apiResponseCode", response.status)
        cy.saveState("apiData", response.body)
    });
});

Given(/^I make a POST request for "(.*)" endpoint$/, (urlPath) => {
    // let countOfParameters = parameters.rawTable.length
    let serialNumber = Date.now().toString()
    cy.saveState("serialNumber", serialNumber)
    cy.request({
        method: 'POST',
        url: Cypress.env('armm_api_server') + urlPath,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        },
        body: publish

    }).then((response) => {
        cy.saveState("apiResponseCode", response.status)
        cy.saveState("apiData", response.body)
    });
});

Given(/^I make a POST request to the price endpoint$/, (dataTable) => {
    let nfts = []
    dataTable.hashes().forEach(elem => {
        nfts.push({
            "nft_id": {
                "token_id": elem.token_id,
                "serial_number": parseInt(elem.serial_number)
            }
        })
    })

    let priceBody = {"nfts": nfts}
    cy.log(priceBody)

    cy.request({
        method: 'POST',
        url: Cypress.env('marketplace_api_server') + 'price',
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        },
        body: priceBody

    }).then((response) => {
        cy.log("api response " + JSON.stringify(response))
        cy.saveState("apiResponseCode", response.status)
        cy.saveState("apiData", response.body)
    });
});

Given(/^I make a POST request to the simplesearch endpoint$/, (dataTable) => {
    let simpleSearchBody = {}

    cy.request({
        method: 'POST',
        url: Cypress.env('marketplace_api_server') + 'simplesearch',
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        },
        body: simpleSearchBody

    }).then((response) => {
        cy.log("api response " + JSON.stringify(response))
        cy.saveState("apiResponseCode", response.status)
        cy.saveState("apiData", response.body)
    });
});


Then(/^Verify the response status code is (.*)$/, (statusCode) => {
    cy.getState("apiResponseCode").should((response) => {
        expect(response).to.eq(parseInt(statusCode));

    })
});

When(/^I verify that all returned offsets are of type "(.*)"$/, (offsetType) => {
    cy.getState("apiData").then((body) => {
        for (let i = 0; i < body.offsets.length; i++) {
            expect(body.offsets[i]).to.have.property('list_state', offsetType);
        }
    })
});

When(/^I verify that all returned NFTS have a max and min price$/, () => {
    cy.getState("apiData").then((body) => {
        for (let i = 0; i < body.prices.length; i++) {
            expect(body.prices[i]).to.have.property('min_price');
            expect(body.prices[i]).to.have.property('max_price')
        }
    })
});


When(/^I verify that no offsets are returned$/, (offsetType) => {
    cy.getState("apiData").then((body) => {
        expect(body.offsets.length).to.have.equal(0);
    })
});

When(/^I verify that the returned offsets are of type "(.*)" and "(.*)"$/, (offsetType, offsetType2) => {
    cy.getState("apiData").then((body) => {
        for (let i = 0; i < body.offsets.length; i++) {
            expect(body.offsets[i].list_state).to.be.oneOf([offsetType, offsetType2]);
        }
    })
});


When(/^I verify that all returned offsets are owned by "(.*)"$/, (accountId) => {
    cy.getState("apiData").then((body) => {
        for (let i = 0; i < body.offsets.length; i++) {
            expect(body.offsets[i].offset).to.have.property('owner_id', accountId);
        }
    })
});

const list =
    {
        "txn_id": "",
        "account_id": "0.0.0",
        "nfts": [
            {
                "token_id": "",
                "serial_number": 1,
                "price": 100
            }
        ]
    }

const publish = {
    "details": [
        {
            "msgType": "MINTED",
            "tokenId": "0.0.0",
            "serialNumber": 1,
            "transactionId": "0514",
            "transactionTime": "2022-08-05T09:53:00.000Z",
            "country": "USA",
            "deviceId": "Solar Cell",
            "firstSubdivision": "1",
            "guardianId": "24234234",
            "newOwner": "New Owner 1",
            "quality": 7,
            "projectCategory": "Kategory super",
            "transactionMemo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacus ex, euismod vitae cursus vel, congue quis massa. Nullam auctor ante ac mattis maximus. Phasellus tincidunt maximus elit sit amet malesuada. In hac habitasse platea dictumst. Proin imperdiet ultrices eros nec fringilla. Proin interdum mauris a dui tempus, quis rutrum dolor porta. Quisque sed eros sed mauris gravida vehicula eget commodo arcu. Duis dui ex, efficitur at ultricies ac, molestie non enim. Vivamus fermentum elit et pharetra tempus. Praesent consectetur vulputate dolor id ornare.",
            "projectType": "Type 1"
        }
    ]
}  
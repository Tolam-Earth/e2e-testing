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
const addContext = require('mochawesome/addContext');

When(/^I execute select query on postgres DB, where name equals "(.*)"$/, (idValue) => {
    cy.pause()
    cy.getState("serialNumber").then(asset_id => {
        cy.task("DATABASE", {
            dbConfig: Cypress.env("DB"),
            sql: `
        select * from token_classifications where asset_id = '0.0.0-${asset_id}'   
        `
        }).then((result) => {
            debugger
            expect(result.rows[0].asset_id).to.have.string(`${asset_id}`);
        });
    })
});

# Tolam Markets E2E Automated Testing

## Setup

In order for these tests to run successfully it is necessary to have completed the setup
in Tolam-Demo repository in https://github.com/orgs/Tolam-Earth/repositories/tolam-demo.  Additionally 
it is necessary for you to have successfully listed one of your own offsets following the steps documented here
https://github.com/orgs/Tolam-Earth/repositories/tolam-demo/blob/main/TolamEarthHowTo.pdf

Install dependencies with `npm install`

To open Cypress and run tests you will need Chrome, 
Firefox or Electron browser installed.

There are 2 ways to run the tests:

1. From command line you can run `node runner.js cypress open --env TAGS="@SMOKE_TEST" configFile=qa --browser chrome --headed`
   (It is possible to replace "chrome" with "firefox" or "electron" however we are unable to certify the validity of these tests either browser).  If you wish to run tests
headless then just remove the --headed parameter.
2. To launch the Cypress UI run `./node_modules/.bin/cypress open` and select 
the browser you wish to use.  From the browser window that opens you are able to 
select the features (cypress/e2e/features) you would like to test (API, DB, or UI), however it is important
to note that only feature scenarios tagged with @SMOKE_TEST will work on a local setup
of Marketplace-Services and Marketplace-UI.

---

This framework is derived from https://github.com/far11ven/Cypress-TestFramework/blob/develop/v10/package.json#:~:text=far11ven%22%2C-,%22license%22%3A%20%22ISC%22%2C,-%22devDependencies%22%3A%20%7B which is under the ISC license.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

It was derived from
https://github.com/TheBrainFamily/cypress-cucumber-example/blob/master/LICENSE

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## License

Copyright 2022 Tolam Earth

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


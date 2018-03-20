# WebdriverIO | Typescript | Page Objects | Loadable Components
This project is an example of building a test automation framework using WebdriverIO, Page Object Pattern with Loadable Components, example written using TypeScript. The usefullness of the page object pattern is discussed on the [WebdriverIO website](http://webdriver.io/guide/testrunner/pageobjects.html).
## Getting Started
Install all dependencies:
```
npm install -g selenium-standalone
npm install
```
Start the Selenium Driver - in this sample, the standalone version:
```
selenium-standalone start
```
Run the tests:
```
npm test
```
## Why TypeScript
In short, TypeScript is a superset of JavaScript (as in all that "coming in ES6/7!" already built in) that allows optional typing.
### Intellisense
Adding typings to your functions and variables allows your text editor to better guess what you're trying to do next. More specifically to testing with WebdriverIO, browser elements will let you know what you can do with them and what they need to do their thing.

Typings for most libraries are availible from the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) project and, since the release of TypeScript 2.0, can be installed via `npm`. For example
```
npm install @types/webdriverio
```
## Pages From Objects to Classes
Each page is a [class](http://www.typescriptlang.org/docs/handbook/classes.html) (mainly because it helps the intellisense) which is instantiated and exported.
```
import { BaseObjectPage } from './BaseObjectPage';

export class LoginPage extends BaseObjectPage<LoginPage> {

  protected get username() { return this.byId('username'); }
  protected get password() { return this.byId('password'); }
  protected get form() { return this.byId('form'); }

  constructor() {
    super('/login');
  }

  public fillForm(user: string, pass: string): LoginPage {
    this.username.setValue(user);
    this.password.setValue(pass);
    return this;
  }

  public submit(): void {
    this.form.submitForm();
  }
}
```
## Running Tests
The WebdriverIO Test Runner still needs `.js` files to test, so we modify the `npm test` script to compile the `.ts` files into a `/src` directory, then run the tests from there. Then, `rimraf` is used to delete the `/src` directory so as to not clutter up the working space.
```
"scripts": {
  "pretest":"node ./node_modules/typescript/lib/tsc.js",
  "test": "node ./node_modules/webdriverio/bin/wdio",
  "posttest": "node ./node_modules/rimraf/bin.js src"
}
```
Notice that the `wdio.config.json` file knows to look in `/src` for specs
```
specs: [
  './src/specs/*.js'
],
```
## Inspirations
 -  [WebdriverIO_Typescript](https://github.com/WillLuce/WebdriverIO_Typescript) by [WillLuce](https://github.com/WillLuce)
  - [Page Objects Loadable Component](https://github.com/sargissargsyan/page-objects-loadable-component) by [Sargis Sargsyan](https://github.com/sargissargsyan)
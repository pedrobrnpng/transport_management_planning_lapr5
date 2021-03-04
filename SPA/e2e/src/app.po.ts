import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }


  //Tipos de tripulante
  async getButton(button: string) {
    return element(by.css(button)).getText();
  }

  async clickButtonByCss(button: string) {
    return element(by.css(button)).click();
  }

  async clickButtonByName(button: string) {
    return element(by.name(button)).click();
  }

  async submitButtonByName(button: string) {
    return element(by.name(button)).submit();
  }

  async setField(field: string, text: string) {
    return element(by.css(field)).sendKeys(text);
  }

  async getFieldByCss(field: string) {
    return element(by.css(field)).getText();
  }

  async getFieldByName(field:string) {
    return element(by.name(field)).getText();
  }

  async getFieldAttribute(field:string) {
    return element(by.css(field)).getAttribute('value');
  }
}

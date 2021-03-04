import { AppPage } from './app.po';
import { browser } from 'protractor';
import path = require('path');


describe('workspace-project App', () => {
  let page: AppPage;
  const fileToUploadMDR = '../test.glx';
  const fileToUploadMDV = '../mdvtest.glx';
  const absolutePathMDR = path.resolve(__dirname, fileToUploadMDR);
  const absolutePathMDV = path.resolve(__dirname, fileToUploadMDV);

  beforeEach(() => {
    page = new AppPage();
  });

  it('should import data mdr', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(2000);
    const buttonTP = '[routerLink="/importMDR"]';
    const idField = '[id=file]';
    //expect(await page.getFieldByCss(buttonTP)).toEqual('Importar Dados (MDR)');
    await page.clickButtonByCss(buttonTP);
    await browser.waitForAngularEnabled(false);
    expect(await page.getFieldByCss(idField)).toEqual('');
    await page.setField(idField, absolutePathMDR);
    await browser.sleep(4000);
    await page.clickButtonByName('enviarBtn');
    await browser.sleep(4000);
  });

  it('should import data mdv', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(2000);
    const buttonTP = '[routerLink="/importMDV"]';
    const idField = '[id=file]';
    //expect(await page.getFieldByCss(buttonTP)).toEqual('Importar Dados (MDR)');
    await page.clickButtonByCss(buttonTP);
    await browser.waitForAngularEnabled(false);
    expect(await page.getFieldByCss(idField)).toEqual('');
    await page.setField(idField, absolutePathMDV);
    await browser.sleep(2000);
    await page.clickButtonByName('enviarBtn');
    await browser.sleep(6000);
  });

});

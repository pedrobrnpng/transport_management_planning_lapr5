import { AppPage } from '../app.po';
import { browser } from 'protractor';
import path = require('path');

describe('Import Dados Test', () => {
    let page: AppPage;
    const fileToUpload = '../../test.glx';
    const absolutePath = path.resolve(__dirname, fileToUpload);
  
    beforeEach(() => {
      page = new AppPage();
    });
  
    it('should import dados', async () => {
        await page.navigateTo();
        await browser.waitForAngularEnabled(true);
        const buttonTP = '[routerLink="/import"]';
        const idField = '[id=file]';
        expect(await page.getFieldByCss(buttonTP)).toEqual('Importar Dados');
        await page.clickButtonByCss(buttonTP);
        await browser.waitForAngularEnabled(true);
        expect(await page.getFieldByCss(idField)).toEqual('');
        await page.setField(idField, absolutePath);
        await browser.sleep(4000);
        await page.clickButtonByName('enviarBtn');
        await browser.sleep(4000);
    });
  });
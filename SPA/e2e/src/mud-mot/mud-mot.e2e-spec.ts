import { AppPage } from '../app.po';
import { browser } from 'protractor';

describe('Mudança motorista Test', () => {
    let page: AppPage;
  
    beforeEach(() => {
      page = new AppPage();
    });
  
    it('should mostrar mudança', async () => {
        await page.navigateTo();
        await browser.waitForAngularEnabled(true);
        const buttonTP = '[routerLink="/mud-mot"]';
        const noInicial = '[name=sgIdNoInicio]';
        const noFinal = '[name=sgIdNoFim]';
        expect(await page.getFieldByCss(buttonTP)).toEqual('Mudança de motorista');
        await page.clickButtonByCss(buttonTP);
        await browser.waitForAngularEnabled(true);
        await browser.sleep(2000);
        await page.setField(noFinal, "LORDL");
        await page.setField(noInicial, "PARED");
        await browser.sleep(4000);
        await page.clickButtonByName('buttonAskPath');
        await browser.sleep(8000);
        expect(await page.getFieldByName('message')).toEqual('["PARED","MOURZ","BALTR","VANDO","LORDL"]');
    });
  });
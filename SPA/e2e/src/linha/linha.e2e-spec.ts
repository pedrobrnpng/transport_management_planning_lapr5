import { AppPage } from '../app.po';
import { browser } from 'protractor';


describe('Linha Test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

    it('should create linhas', async () => {
        await page.navigateTo();
        await browser.waitForAngularEnabled(false);
        await browser.sleep(1000);
        const buttonTP = '[routerLink="/linha"]';
        const id = '[id=id]';
        const noInicial = '[id=noInicial]';
        const noFinal = '[id=noFinal]';
        const nome = '[id=nome]';
        const idTrip = '[id=tipoTrip]';
        const idViat = '[id=tipoViat]';
        const cor = '[id=color]';


        expect(await page.getFieldByCss(buttonTP)).toEqual('Linhas');
        await page.clickButtonByCss(buttonTP);
        await browser.waitForAngularEnabled(false);
        expect(await page.getFieldByCss(id)).toEqual('');
        await page.setField(id, 'R');
        await page.setField(noInicial, 'Baltar');
        await page.setField(noFinal, 'Besteiros');
        await page.setField(nome, 'Testelinha1');
        await page.setField(idTrip, '3');

        expect(await page.getFieldAttribute(id)).toEqual('R');
        expect(await page.getFieldAttribute(noInicial)).toEqual('BALTR');
        expect(await page.getFieldAttribute(noFinal)).toEqual('BESTR');
        expect(await page.getFieldAttribute(nome)).toEqual('Testelinha1');
        expect(await page.getFieldAttribute(idTrip)).toEqual('3');
        expect(await page.getFieldAttribute(cor)).toEqual('#ff0000');

        await browser.sleep(4000);
        await page.clickButtonByName('button');
        await browser.sleep(4000);
        expect(await page.getFieldByName('message')).toEqual('Linha adicionado com êxito=R');
    });
});
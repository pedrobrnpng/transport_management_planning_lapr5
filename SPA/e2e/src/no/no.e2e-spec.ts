import { AppPage } from '../app.po';
import { browser } from 'protractor';

describe('No Test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create nós', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(1000);
    const buttonNo = '[routerlink="/no"]';
    const idAbreviatura = '[id=abrev]';
    const idNome = '[id=nome]';
    const idLatitude = '[id=lat]';
    const idLongitude = '[id=lon]';
    expect(await page.getFieldByCss(buttonNo)).toEqual('Nós');
    await page.clickButtonByCss(buttonNo);
    await browser.waitForAngularEnabled(false);
    expect(await page.getFieldByCss(idAbreviatura)).toEqual('');
    expect(await page.getFieldByCss(idNome)).toEqual('');
    expect(await page.getFieldByCss(idLatitude)).toEqual('');
    expect(await page.getFieldByCss(idLongitude)).toEqual('');
    await page.setField(idAbreviatura, 'noteste1');
    await page.setField(idNome, 'noteste1');
    await page.clickButtonByCss('[value=paragem]');
    await page.setField(idLatitude, '50');
    await page.setField(idLongitude, '50');
    await browser.sleep(4000);
    await page.clickButtonByName('adicionar');
    await browser.sleep(4000);
    expect(await page.getFieldByName('message')).toEqual('Nó \'noteste1\' adicionado com sucesso');
  });
});

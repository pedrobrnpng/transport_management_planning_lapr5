import { AppPage } from '../app.po';
import { browser } from 'protractor';


describe('No Test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create tipos de tripulante', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(1000);
    const buttonTP = '[routerLink="/tipoTripulante"]';
    const idField = '[id=tpid]';
    const idDesc = '[id=tpdesc]';
    expect(await page.getFieldByCss(buttonTP)).toEqual('Tipos de tripulante');
    await page.clickButtonByCss(buttonTP);
    await browser.waitForAngularEnabled(false);
    expect(await page.getFieldByCss(idField)).toEqual('');
    await page.setField(idField, 'tpteste1');
    await page.setField(idDesc, 'tptestedesc1');
    expect(await page.getFieldAttribute(idField)).toEqual('tpteste1');
    expect(await page.getFieldAttribute(idDesc)).toEqual('tptestedesc1');
    await browser.sleep(4000);
    await page.clickButtonByName('buttonAddTP');
    await browser.sleep(4000);
    expect(await page.getFieldByName('message')).toEqual('Tipo Tripulante adicionado com código=tpteste1');
  });
});
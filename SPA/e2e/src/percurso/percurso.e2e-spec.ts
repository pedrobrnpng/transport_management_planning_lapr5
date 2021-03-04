import { AppPage } from '../app.po';
import { browser } from 'protractor';


describe('Percurso', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create percurso', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(1000);
    const buttonTP = '[routerLink="/percurso"]';
    const idSg = '[id=idSg]';
    const idNoInicioSg = '[id=idNoInicio]';
    const idNoFimSg = '[id=idNoFim]';
    const distanciaValue = '[id=distanciaValue]';
    const distanciaUnidade = '[id=distanciaUnidade]';
    const tempoViagemValue = '[id=tempoViagemValue]';
    const tempoViagemUnidade = '[id=tempoViagemUnidade]';
    const idP = '[id=idP]';
    const idLinhaP = '[id=idLinhaP]';
    const direcaoP = '[id=direcaoP]';
    expect(await page.getFieldByCss(buttonTP)).toEqual('Percursos');
    await page.clickButtonByCss(buttonTP);
    await browser.waitForAngularEnabled(false);
    await page.setField(idSg, 'sgTeste');
    await page.setField(idNoInicioSg, 'AML');
    await page.setField(idNoFimSg, 'AGUIA');
    await page.setField(distanciaValue, '10');
    await page.setField(distanciaUnidade, 'm');
    await page.setField(tempoViagemValue, '10');
    await page.setField(tempoViagemUnidade, 'm');
    await page.setField(idP, 'pTeste');
    await page.setField(idLinhaP, '1');
    await page.setField(direcaoP, 'ida');
    expect(await page.getFieldAttribute(idSg)).toEqual('sgTeste');
    expect(await page.getFieldAttribute(idNoInicioSg)).toEqual('AML');
    expect(await page.getFieldAttribute(idNoFimSg)).toEqual('AGUIA');
    expect(await page.getFieldAttribute(distanciaValue)).toEqual('10');
    expect(await page.getFieldAttribute(distanciaUnidade)).toEqual('m');
    expect(await page.getFieldAttribute(tempoViagemValue)).toEqual('10');
    expect(await page.getFieldAttribute(tempoViagemUnidade)).toEqual('m');
    expect(await page.getFieldAttribute(idP)).toEqual('pTeste');
    expect(await page.getFieldAttribute(idLinhaP)).toEqual('1');
    expect(await page.getFieldAttribute(direcaoP)).toEqual('ida');
    await browser.sleep(4000);
    await page.clickButtonByName('buttonAddSg');
    await browser.sleep(4000);
    await page.clickButtonByName('buttonAddP');
    await browser.sleep(4000);
});
});
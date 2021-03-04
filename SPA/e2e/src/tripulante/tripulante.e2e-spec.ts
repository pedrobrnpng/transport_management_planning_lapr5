import { AppPage } from '../app.po';
import { browser } from 'protractor';


describe('Tripulante', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create tripulante', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(1000);
    const buttonTP = '[routerLink="/tripulante"]';
    const tripulanteNumeroMecanografico = '[id=tripulanteNumeroMecanografico]';
    const tripulanteNome = '[id=tripulanteNome]';
    const tripulanteDataNascimento = '[id=tripulanteDataNascimento]';
    const tripulanteNumeroCartaoCidadao = '[id=tripulanteNumeroCartaoCidadao]';
    const tripulanteNif = '[id=tripulanteNif]';
    const tripulanteTurno = '[id=tripulanteTurno]';
    const tripulanteTipoTripulanteId = '[id=tripulanteTipoTripulanteId]';
    const tripulanteDataEntrada = '[id=tripulanteDataEntrada]';
    expect(await page.getFieldByCss(buttonTP)).toEqual('Tripulantes');
    await page.clickButtonByCss(buttonTP);
    await browser.waitForAngularEnabled(false);
    await page.setField(tripulanteNumeroMecanografico, '123123123');
    await page.setField(tripulanteNome, 'Teste2');
    await page.setField(tripulanteDataNascimento, '12121975');
    await page.setField(tripulanteNumeroCartaoCidadao, '11231231');
    await page.setField(tripulanteNif, '123123123');
    await page.setField(tripulanteDataEntrada, '12/12/2010');
    expect(await page.getFieldAttribute(tripulanteNumeroMecanografico)).toEqual('123123123');
    expect(await page.getFieldAttribute(tripulanteNome)).toEqual('Teste2');
    expect(await page.getFieldAttribute(tripulanteDataNascimento)).toEqual('1975-12-12');
    expect(await page.getFieldAttribute(tripulanteNumeroCartaoCidadao)).toEqual('11231231');
    expect(await page.getFieldAttribute(tripulanteNif)).toEqual('123123123');
    expect(await page.getFieldAttribute(tripulanteTurno)).toEqual('diurno');
    expect(await page.getFieldAttribute(tripulanteTipoTripulanteId)).toEqual('3');
    expect(await page.getFieldAttribute(tripulanteDataEntrada)).toEqual('2010-12-12');
    await browser.sleep(4000);
    await page.clickButtonByName('buttonAddTripulante');
    await browser.sleep(4000);
    expect(await page.getFieldByName('message')).toEqual('Tripulante adicionado com número mecanografico=123123123');
  });
});

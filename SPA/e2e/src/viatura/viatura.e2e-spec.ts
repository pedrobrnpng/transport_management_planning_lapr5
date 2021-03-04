import { AppPage } from '../app.po';
import { browser } from 'protractor';

describe('Viatura', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create viatura', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(1000);
    const button = '[routerLink="/viaturas"]';
    const matricula = '[id=matricula]';
    const vin = '[id=vin]';
    const tipoViatura = '[id=tipoViat]';
    const dataEntrada = '[id=dataEntrada]';

    expect(await page.getFieldByCss(button)).toEqual('Viaturas');
    await page.clickButtonByCss(button);
    await browser.waitForAngularEnabled(false);
    await page.setField(matricula, 'AA-32-AA');
    await page.setField(vin, '1VWBP7A30CC002921');
    await page.setField(tipoViatura, 'MiniAutocarro');
    await page.setField(dataEntrada, '20/12/2020');

    expect(await page.getFieldAttribute(matricula)).toEqual('AA-32-AA');
    expect(await page.getFieldAttribute(vin)).toEqual('1VWBP7A30CC002921');
    expect(await page.getFieldAttribute(tipoViatura)).toEqual('22222222222222222222');
    expect(await page.getFieldAttribute(dataEntrada)).toEqual('2020-12-20');

    await browser.sleep(1000);
    await page.clickButtonByName('buttonAdicionarViatura');
    await page.clickButtonByName('buttonAdicionarViatura');
    await browser.sleep(4000);
    expect(await page.getFieldByName('message')).toEqual('Viatura adicionada com matricula = AA-32-AA')

  });
})

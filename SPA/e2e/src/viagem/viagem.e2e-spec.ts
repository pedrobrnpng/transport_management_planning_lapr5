import { AppPage } from '../app.po';
import { browser } from 'protractor';

describe('Viagem Test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create viagens', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(1000);
    const buttonViagem = '[routerlink="/viagem"]';
    const linha = '[id=linha]';
    const horaInicio = '[id=horaInicio]';
    const idPercurso = '[id=idPercurso]';
    expect(await page.getFieldByCss(buttonViagem)).toEqual('Viagem');
    await page.clickButtonByCss(buttonViagem);
    await browser.waitForAngularEnabled(false);
    await page.setField(linha, 'PAREDES_AGUIAR');
    await page.setField(horaInicio, '10/10/2021\t12:00');
    await page.setField(idPercurso, '1');
    await browser.sleep(4000);
    await page.clickButtonByName('adicionarViagem');
    await browser.sleep(4000);
    expect(true).toEqual(true);
  });
});

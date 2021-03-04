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
    const buttonTP = '[routerLink="/servicoTripulante"]';
    const servicoTripulanteNome = '[id=servicoTripulanteCodigo]';
    const blocosTrabalho = '[id=stblocosTrabalho2]';
    expect(await page.getFieldByCss(buttonTP)).toEqual('Serviços de tripulante');
    await page.clickButtonByCss(buttonTP);
    await browser.waitForAngularEnabled(false);
    await page.setField(servicoTripulanteNome, 'Teste1000');
    expect(await page.getFieldAttribute(servicoTripulanteNome)).toEqual('Teste1000');
    await browser.sleep(4000);
    await page.clickButtonByName('buttonAddServicoTripulante');
    await browser.sleep(4000);
    expect(await page.getFieldByName('message')).toEqual('Serviço de Tripulante adicionado com código=Teste1000');
  });
});

import { AppPage } from '../app.po';
import { browser } from 'protractor';


describe('ServicoViatura', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create servico viatura', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    await browser.sleep(1000);
    const buttonTP = '[routerLink="/servicoViatura"]';
    const servicoViaturaNome = '[id=servicoViaturaCodigo]';
    const blocosTrabalho = '[id=stblocosTrabalho2]';
    expect(await page.getFieldByCss(buttonTP)).toEqual('Serviços de viatura');
    await page.clickButtonByCss(buttonTP);
    await browser.waitForAngularEnabled(false);
    await page.setField(servicoViaturaNome, 'Teste1000');
    expect(await page.getFieldAttribute(servicoViaturaNome)).toEqual('Teste1000');
    await browser.sleep(4000);
    await page.clickButtonByName('buttonAddServicoViatura');
    await browser.sleep(4000);
    expect(await page.getFieldByName('message')).toEqual('Serviço de Viatura adicionado com código=Teste1000');
  });
});

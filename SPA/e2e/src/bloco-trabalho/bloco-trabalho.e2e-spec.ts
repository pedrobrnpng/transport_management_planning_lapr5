import { AppPage } from '../app.po';
import { browser } from 'protractor';


describe('BlocoTrabalho', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create bloco trabalho', async () => {
    await page.navigateTo();
    await browser.waitForAngularEnabled(false);
    const buttonTP = '[routerLink="/bloco-trabalho"]';
    const nblocoTrabalho = '[id=nbtId]';
    const horaInicio = '[id=tempoI]';
    const horaFim = '[id=tempoF]';
    const noInicio = '[id=noI]';
    const noFim = '[id=noF]';
    expect(await page.getFieldByCss(buttonTP)).toEqual('Blocos de trabalho');
    await page.clickButtonByCss(buttonTP);
    await browser.waitForAngularEnabled(false);
    await page.setField(nblocoTrabalho, '1');
    await page.setField(horaInicio, '10:10');
    await page.setField(horaFim, '10:15');
    await page.setField(noInicio, 'AGUIA');
    await page.setField(noFim, 'BALTR');
    expect(await page.getFieldAttribute(nblocoTrabalho)).toEqual('1');
    await browser.sleep(4000);
    await page.clickButtonByName('buttonAddBloco');
    await browser.sleep(4000);
    expect(await page.getFieldByName('message')).toContain('Bloco de Trabalho adicionado');
  });
});

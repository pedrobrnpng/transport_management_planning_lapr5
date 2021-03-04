import { AppPage } from '../app.po';
import { browser } from 'protractor';


describe('Tipo de viatura', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

    it('should create tipos de viatura', async () => {
        await page.navigateTo();
        await browser.waitForAngularEnabled(false);
        await browser.sleep(1000);
        const buttonTP = '[routerLink="/tipoViatura"]';
        const id = '[id=tvid]';
        const descricao = '[id=descricao]';
        const combustivel = '[id=combustivel]';
        const autonomia = '[id=autonomia]';
        const velocidade = '[id=velocidade]';
        const valor = '[id=valor]';
        const moeda = '[id=moeda]';
        const consumo = '[id=consumo]';

        expect(await page.getFieldByCss(buttonTP)).toEqual('Tipo Viatura');
        await page.clickButtonByCss(buttonTP);
        await browser.waitForAngularEnabled(false);
        expect(await page.getFieldByCss(id)).toEqual('');
        await page.setField(id, '12345123451234512345');
        await page.setField(descricao, 'tpteste1');
        await page.setField(autonomia, '42');
        await page.setField(velocidade, '31');
        await page.setField(valor, '5');
        await page.setField(consumo, '30');

        expect(await page.getFieldAttribute(id)).toEqual('12345123451234512345');
        expect(await page.getFieldAttribute(descricao)).toEqual('tpteste1');
        expect(await page.getFieldAttribute(autonomia)).toEqual('42');
        expect(await page.getFieldAttribute(velocidade)).toEqual('31');
        expect(await page.getFieldAttribute(valor)).toEqual('5');
        expect(await page.getFieldAttribute(consumo)).toEqual('30');

        await browser.sleep(4000);
        await page.clickButtonByName('button');
        await browser.sleep(4000);
        expect(await page.getFieldByName('message')).toEqual('Tipo de Viatura adicionado com êxito=12345123451234512345');
    });
});
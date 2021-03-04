import { AppPage } from '../app.po';
import { browser } from 'protractor';


describe('Login Test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

    it('should login', async () => {
        await page.navigateTo();
        await browser.waitForAngularEnabled(false);
        const buttonTP = '[routerLink="/account/login?returnUrl=%2Fmap"]';
        const email = '[id=email_input]';
        const password = '[id=password_input]';

        //await page.clickButtonByCss(buttonTP);
        //await browser.waitForAngularEnabled(true);
        //expect(await page.getFieldByCss(email)).toEqual('');
        await page.setField(email, 'lapr5g8@gmail.com');
        await page.setField(password, 'Adminteste');

        //expect(await page.getFieldAttribute(email)).toEqual('e2eAdmin@gmail.com');
        //expect(await page.getFieldAttribute(password)).toEqual('e2eAdmin');
        await page.clickButtonByName('button');
        await browser.sleep(4000);
        //expect(await page.getFieldByName('message')).toEqual('Linha adicionado com êxito=R');
    });
});

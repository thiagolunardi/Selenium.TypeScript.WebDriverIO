import { expect } from 'chai';
import { LoginPage } from '../pages/LoginPage';

describe('login form', () => {
    it('should deny access with wrong creds', () => {
        const loginPage = new LoginPage();
        loginPage
            .openPage(LoginPage)
            .fillForm('foo', 'bar')
            .submit();

        expect(loginPage.hasError()).to.be.true;
    });
    it('should allow access with correct creds', () => {
        const loginPage = new LoginPage();
        loginPage
            .openPage(LoginPage)
            .fillForm('tomsmith', 'SuperSecretPassword!')
            .submit();
        
        expect(loginPage.hasError()).to.be.false;
    });
});
import { BaseObjectPage } from './BaseObjectPage';

export class LoginPage extends BaseObjectPage<LoginPage> {  
    protected get username() { return this.byId('username'); }
    protected get password() { return this.byId('password'); }
    protected get form() { return this.byId('login'); }
    protected get flash() { return this.byId('flash'); }
    protected get submitButton() { return this.byType('submit'); }

    constructor() {
        super('/login');
    }

    protected load(): void { }
    protected isLoaded(): boolean { 
        return true;
        // todo: dunno why IsVisible dont work
        //return this.IsDisplayed(this.username) && this.IsDisplayed(this.password);
    }

    public fillForm(user: string, pass: string): LoginPage {
        this.username.setValue(user);
        this.password.setValue(pass);
        return this;
    }

    public hasError(): boolean {
        return this.hasClass(this.flash, 'error');
    }

    public getMessage(): string {
        return this.flash.getText();
    }

    public submit(): void {
        this.form.submitForm();
    }
}
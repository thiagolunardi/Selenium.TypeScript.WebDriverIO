import { CustomLoadableComponents } from './CustomLoadableComponent';

export abstract class BaseObjectPage<TPage extends CustomLoadableComponents<TPage>> extends CustomLoadableComponents<TPage> {

    private BASE_URL: string = browser.options.baseUrl || 'http://localhost';
    private PAGE_URL: string;

    constructor(pageUrl: string) {
        super();
        this.PAGE_URL = require('url').resolve(this.BASE_URL, pageUrl);
    }

    public getPageUrl(): string {
        return this.PAGE_URL;
    }

    public openPage(page: { new(): TPage }): TPage {
        browser.url(this.PAGE_URL);
        var newPage = new page();
        newPage.get();
        return newPage;
    }

    public openUrl(url: string): void {
        browser.url(url);
    }

    protected isDisplayed(element: WebdriverIO.Client<WebdriverIO.Element>) : boolean {
        try {
            return element.isVisible();
        } catch {
            return false;
        }
    }

    protected exists(element: WebdriverIO.Client<WebdriverIO.Element>) : boolean {
        try {
            return element.isExisting();
        } catch {
            return false;
        }
    }

    protected hasClass(elem: WebdriverIO.Client<WebdriverIO.Element>, className: string): boolean {
        var classAttr = elem.getAttribute('class');
        return classAttr.split(' ').indexOf(className) !== -1;
    }
    protected byId(id: string): WebdriverIO.Client<WebdriverIO.Element> {
        return browser.element<WebdriverIO.Element>(`#${id}`);
    }

    protected byType(type: string): WebdriverIO.Client<WebdriverIO.Element> {
        return browser.element<WebdriverIO.Element>(`[type=${type}]`);
    }
}
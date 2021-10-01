import { browser, by, element } from 'protractor';

export class AppPage {
	navigateTo() {
		return browser.get('/');
	}

	getTitleText() {
		return element(by.css('keyemporium-web-root h1')).getText();
	}
}

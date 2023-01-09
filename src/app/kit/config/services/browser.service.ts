import { Injectable } from '@angular/core';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';

@Injectable({
	providedIn: 'root',
})
export class BrowserService extends BaseService {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	getClassName(): string {
		return 'BrowserService';
	}

	public getBrowserName() {
		const agent = window.navigator.userAgent.toLowerCase();
		switch (true) {
			case agent.indexOf('edge') > -1:
			case agent.indexOf('edg') > -1:
				return 'edge';
			case agent.indexOf('opr') > -1 && !!(<any>window).opr:
				return 'opera';
			case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
				return 'chrome';
			case agent.indexOf('trident') > -1:
				return 'ie';
			case agent.indexOf('firefox') > -1:
				return 'firefox';
			case agent.indexOf('safari') > -1:
				return 'safari';
			default:
				return 'other';
		}
	}
}

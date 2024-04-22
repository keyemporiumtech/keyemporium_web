import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';

@Component({
	selector: 'wiki-test-captcha',
	templateUrl: './test-captcha.component.html',
	styleUrls: ['./test-captcha.component.scss'],
})
export class TestCaptchaComponent extends BaseModuleWikiPage {
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
}

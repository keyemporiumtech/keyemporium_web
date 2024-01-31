import { Component } from '@angular/core';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';

@Component({
	selector: 'wiki-test-validator-password',
	templateUrl: './test-validator-password.component.html',
	styleUrls: ['./test-validator-password.component.scss'],
})
export class TestValidatorPasswordComponent extends BaseModuleWikiPage {
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
}

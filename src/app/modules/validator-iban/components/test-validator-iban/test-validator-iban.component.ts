import { Component } from '@angular/core';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';

@Component({
	selector: 'wiki-test-validator-iban',
	templateUrl: './test-validator-iban.component.html',
	styleUrls: ['./test-validator-iban.component.scss'],
})
export class TestValidatorIbanComponent extends BaseModuleWikiPage {
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
}

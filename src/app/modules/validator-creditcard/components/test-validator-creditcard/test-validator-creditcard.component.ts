import { Component } from '@angular/core';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';

@Component({
	selector: 'wiki-test-validator-creditcard',
	templateUrl: './test-validator-creditcard.component.html',
	styleUrls: ['./test-validator-creditcard.component.scss'],
})
export class TestValidatorCreditcardComponent extends BaseModuleWikiPage {
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
}

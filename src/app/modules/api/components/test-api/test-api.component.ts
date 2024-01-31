import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';

@Component({
	selector: 'wiki-test-api',
	templateUrl: './test-api.component.html',
	styleUrls: ['./test-api.component.scss'],
})
export class TestApiComponent extends BaseModuleWikiPage {
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
}

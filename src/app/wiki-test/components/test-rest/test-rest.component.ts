import { Component } from '@angular/core';
import { BaseModuleWikiPage } from '../../../shared/wiki-test/base-module-wiki.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';

@Component({
	selector: 'wiki-test-rest',
	templateUrl: './test-rest.component.html',
	styleUrls: ['./test-rest.component.scss'],
})
export class TestRestComponent extends BaseModuleWikiPage {
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
}

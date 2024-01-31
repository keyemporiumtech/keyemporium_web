import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';
import { BaseModuleWikiPage } from '../../../shared/wiki-test/base-module-wiki.page';

@Component({
	selector: 'wiki-test-shared',
	templateUrl: './test-shared.component.html',
	styleUrls: ['./test-shared.component.scss'],
})
export class TestSharedComponent extends BaseModuleWikiPage {
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
}

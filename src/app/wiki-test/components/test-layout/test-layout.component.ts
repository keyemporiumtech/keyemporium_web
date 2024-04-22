import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';
import { BaseModuleWikiPage } from '../../../shared/wiki-test/base-module-wiki.page';

@Component({
	selector: 'wiki-test-layout',
	templateUrl: './test-layout.component.html',
	styleUrls: ['./test-layout.component.scss'],
})
export class TestLayoutComponent extends BaseModuleWikiPage {
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
}

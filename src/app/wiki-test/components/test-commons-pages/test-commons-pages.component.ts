import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';
import { BaseModuleWikiPage } from '../../../shared/wiki-test/base-module-wiki.page';

@Component({
	selector: 'wiki-test-commons-pages',
	templateUrl: './test-commons-pages.component.html',
	styleUrls: ['./test-commons-pages.component.scss'],
})
export class TestCommonsPagesComponent extends BaseModuleWikiPage {
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
}

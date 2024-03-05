import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApplicationLoggerService } from '@ddc/kit';
import { BaseModuleWikiPage } from '../../../shared/wiki-test/base-module-wiki.page';

@Component({
	selector: 'wiki-test-shared',
	templateUrl: './test-shared.component.html',
	styleUrls: ['./test-shared.component.scss'],
})
export class TestSharedComponent extends BaseModuleWikiPage {
	checkAble: boolean;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}

	manageQueryParams(data: ParamMap): void {
		super.manageQueryParams(data);
		this.checkAble = data.get('returnByAuth2fa') ? true : false;
		if (data.has('returnByAuth2fa')) {
			this.view = 'AUTH2FA-PAGE';
		}
	}
}

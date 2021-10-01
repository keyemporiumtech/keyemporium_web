import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';

@Component({
	selector: 'wiki-test-api',
	templateUrl: './test-api.component.html',
	styleUrls: ['./test-api.component.scss'],
})
export class TestApiComponent extends BaseModuleWikiPage implements OnInit {
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}

	ngOnInit() {}
}

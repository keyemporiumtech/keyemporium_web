import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModuleWikiPage } from '../../../shared/wiki-test/base-module-wiki.page';

@Component({
	selector: 'wiki-test-shared',
	templateUrl: './test-shared.component.html',
	styleUrls: ['./test-shared.component.scss'],
})
export class TestSharedComponent extends BaseModuleWikiPage implements OnInit {
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}

	ngOnInit() {}
}

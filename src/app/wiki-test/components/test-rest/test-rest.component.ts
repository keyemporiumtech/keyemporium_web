import { Component, OnInit } from '@angular/core';
import { BaseModuleWikiPage } from '../../../shared/wiki-test/base-module-wiki.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'wiki-test-rest',
	templateUrl: './test-rest.component.html',
	styleUrls: ['./test-rest.component.scss'],
})
export class TestRestComponent extends BaseModuleWikiPage implements OnInit {
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}

	ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModuleWikiPage } from '../../../shared/wiki-test/base-module-wiki.page';

@Component({
	selector: 'wiki-test-commons-pages',
	templateUrl: './test-commons-pages.component.html',
	styleUrls: ['./test-commons-pages.component.scss'],
})
export class TestCommonsPagesComponent extends BaseModuleWikiPage implements OnInit {
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}
	ngOnInit() {}
}

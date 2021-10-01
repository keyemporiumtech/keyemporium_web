import { Component, OnInit } from '@angular/core';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'wiki-test-localesystem',
	templateUrl: './test-localesystem.component.html',
	styleUrls: ['./test-localesystem.component.scss'],
})
export class TestLocalesystemComponent extends BaseModuleWikiPage implements OnInit {
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}

	ngOnInit() {}
}

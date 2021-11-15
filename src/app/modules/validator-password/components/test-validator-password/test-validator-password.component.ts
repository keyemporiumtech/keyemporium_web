import { Component, OnInit } from '@angular/core';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'wiki-test-validator-password',
	templateUrl: './test-validator-password.component.html',
	styleUrls: ['./test-validator-password.component.scss'],
})
export class TestValidatorPasswordComponent extends BaseModuleWikiPage implements OnInit {
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}

	ngOnInit() {}
}

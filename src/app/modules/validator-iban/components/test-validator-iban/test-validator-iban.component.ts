import { Component, OnInit } from '@angular/core';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'wiki-test-validator-iban',
	templateUrl: './test-validator-iban.component.html',
	styleUrls: ['./test-validator-iban.component.scss'],
})
export class TestValidatorIbanComponent extends BaseModuleWikiPage implements OnInit {
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}

	ngOnInit() {}
}

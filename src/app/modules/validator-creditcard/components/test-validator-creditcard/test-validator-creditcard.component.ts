import { Component, OnInit } from '@angular/core';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'wiki-test-validator-creditcard',
	templateUrl: './test-validator-creditcard.component.html',
	styleUrls: ['./test-validator-creditcard.component.scss'],
})
export class TestValidatorCreditcardComponent extends BaseModuleWikiPage implements OnInit {
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		super(router, activatedRoute);
	}
	ngOnInit() {}
}

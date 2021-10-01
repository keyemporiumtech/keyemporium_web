import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthCommonService } from '../../services/auth-common.service';
import { Subscription } from 'rxjs';
import { restConstants } from '../../../api/cakeutils/constants/rest.constants';
import { AuthenticationService } from '../../base/authentication.service';

@Component({
	selector: 'wiki-test-authentication',
	templateUrl: './test-authentication.component.html',
	styleUrls: ['./test-authentication.component.scss'],
})
export class TestAuthenticationComponent extends BaseModuleWikiPage implements OnInit, OnDestroy {
	subVerifyToken: Subscription;
	subLogout: Subscription;
	currentToken: string;
	resultVerify: any;
	enableProfiles: boolean;
	constructor(
		router: Router,
		activatedRoute: ActivatedRoute,
		private authCommonService: AuthCommonService,
		private authenticationService: AuthenticationService,
	) {
		super(router, activatedRoute);
		this.currentToken = restConstants.clienttoken;
	}

	ngOnInit() {}

	ngOnDestroy() {
		if (this.subVerifyToken) {
			this.subVerifyToken.unsubscribe();
		}
		if (this.subLogout) {
			this.subLogout.unsubscribe();
		}
	}

	verifyToken() {
		this.subVerifyToken = this.authCommonService.tokenValid().subscribe((res) => {
			this.resultVerify = res;
		});
	}

	evalLogin(value: boolean) {
		this.enableProfiles = value;
	}

	logout() {
		this.subLogout = this.authenticationService.logout().subscribe((res) => {
			this.evalLogin(!res);
		});
	}

	set(view: string) {
		this.resultVerify = undefined;
		super.set(view);
	}
}

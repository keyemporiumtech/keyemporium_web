import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationStorageService } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { BaseModuleWikiPage } from '../../../../shared/wiki-test/base-module-wiki.page';
import { restConstants } from '../../../api/cakeutils/constants/rest.constants';
import { AuthenticationService } from '../../base/authentication.service';
import { AuthCommonService } from '../../services/auth-common.service';

@Component({
	selector: 'wiki-test-authentication',
	templateUrl: './test-authentication.component.html',
	styleUrls: ['./test-authentication.component.scss'],
})
export class TestAuthenticationComponent
	extends BaseModuleWikiPage
	implements OnInit, AfterViewInit, OnDestroy
{
	subVerifyToken: Subscription;
	subLogout: Subscription;
	currentToken: string;
	resultVerify: any;
	subCheckLogin: Subscription;
	enableProfiles: boolean;
	userId: string;
	constructor(
		router: Router,
		activatedRoute: ActivatedRoute,
		private applicationStorage: ApplicationStorageService,
		private authCommonService: AuthCommonService,
		private authenticationService: AuthenticationService,
	) {
		super(router, activatedRoute);
		this.currentToken = restConstants.clienttoken;
	}

	ngOnInit() {
		this.subCheckLogin = this.authCommonService.listenSession().subscribe((res) => {
			this.enableProfiles = res;
		});
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.authCommonService.notifySession(this.applicationStorage.userId.get() ? true : false);
		}, 0);
	}

	ngOnDestroy() {
		if (this.subVerifyToken) {
			this.subVerifyToken.unsubscribe();
		}
		if (this.subLogout) {
			this.subLogout.unsubscribe();
		}
		if (this.subCheckLogin) {
			this.subCheckLogin.unsubscribe();
		}
	}

	verifyToken() {
		this.subVerifyToken = this.authCommonService.tokenValid().subscribe((res) => {
			this.resultVerify = res;
		});
	}

	logout() {
		this.subLogout = this.authenticationService.logout().subscribe((res) => {
			this.enableProfiles = !res;
		});
	}

	set(view: string) {
		this.resultVerify = undefined;
		super.set(view);
	}
}

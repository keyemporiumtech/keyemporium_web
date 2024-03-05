import { Component } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { ApplicationLoggerService, BasePageComponent } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApplicationService } from '../../../modules/authentication/services/application.service';
import { QueryUtility } from '@ddc/rest';

@Component({
	selector: 'key-auth2fa-key',
	templateUrl: './auth2fa-key.component.html',
	styleUrls: ['./auth2fa-key.component.scss'],
})
export class Auth2faKeyComponent extends BasePageComponent {
	showLoader: boolean;
	showLogin: boolean;
	// params for auth2fa
	token: string;
	applicationname: string;
	username: string;

	// sub
	subCheck: Subscription;
	subGenerate: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		private applicationService: ApplicationService,
	) {
		super(applicationLogger, router, activatedRoute);
	}
	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {}
	manageQueryParams(data: ParamMap) {
		const keyParam = atob(data.get('p1'));
		const keyAppUser = atob(data.get('p2'));

		const arrAppUser: string[] = keyAppUser.split('.');

		if (keyParam && arrAppUser && arrAppUser.length === 2) {
			this.token = keyParam;
			this.applicationname = arrAppUser[0];
			this.username = atob(arrAppUser[1]);
			this.check(keyParam);
		} else {
			this.showLogin = true;
		}
	}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subCheck) {
			this.subCheck.unsubscribe();
		}
		if (this.subGenerate) {
			this.subGenerate.unsubscribe();
		}
	}
	getClassName(): string {
		return 'Auth2faKeyComponent';
	}

	check(token: string) {
		this.subCheck = this.applicationService
			.check(token, undefined, QueryUtility.SKIP_ERROR_RES)
			.subscribe((res) => {
				if (res) {
					this.token = token;
				}
				this.showLoader = res;
				this.showLogin = !res;
			});
	}

	/*
	onTokenLogin(token: string) {
		this.check(token);
	}

	generaAuth2fa() {
		this.subGenerate = this.applicationService
			.generate(this.applicationname, this.username)
			.subscribe((res) => {
				this.token = res;
				this.check(res);
			});
	}
  */
}

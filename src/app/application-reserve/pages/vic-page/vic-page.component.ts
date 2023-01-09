import { Component } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BasePageComponent,
	PageUtility,
} from '@ddc/kit';
import { Router, ActivatedRoute, Data, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../../modules/authentication/base/authentication.service';
import { EnumPermissions } from '../../../application-shared/constants/permissions.enum';

@Component({
	selector: 'reserve-vic-page',
	templateUrl: './vic-page.component.html',
	styleUrls: ['./vic-page.component.scss'],
})
export class VicPageComponent extends BasePageComponent {
	// var
	queryParams: ParamMap;
	blocked: boolean;
	id_user: string;
	idUserLogged: string;
	// qr-code
	textQr: string;
	// sizes
	sizeImagePrincipal;
	sizeProfile;
	sizeAddressPrincipal;
	sizePhonePrincipal;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		private applicationStorage: ApplicationStorageService,
		private authenticationService: AuthenticationService,
	) {
		super(applicationLogger, router, activatedRoute);
		this.idUserLogged = this.applicationStorage.userId.get();
		if (this.queryParams) {
			this.setParams(this.queryParams);
		}
	}

	ngOnInitForChildren() {
		this.changeSizeAddressPrincipal(true);
		this.changeSizePhonePrincipal(true);
		this.changeSizeImagePrincipal(true);
		this.changeSizeProfile(true);
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'ProfilePageComponent';
	}

	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {}
	manageQueryParams(data: ParamMap) {
		this.queryParams = data;
		if (this.idUserLogged) {
			this.setParams(data);
		}
	}

	private setParams(data: ParamMap) {
		if (data.has('ID_USER')) {
			this.id_user = PageUtility.decodeParam(data.get('ID_USER'));
			if (
				this.id_user !== this.idUserLogged &&
				!this.authenticationService.checkPermissions([
					EnumPermissions.SUPERVISOR,
					EnumPermissions.CHANGE_PROFILES,
				])
			) {
				this.blocked = true;
			}
		} else {
			this.id_user = this.idUserLogged;
		}
		// qr-code
		this.textQr = window.location.host + '/#/reserve/vic/' + PageUtility.encodeParam(this.id_user);
	}

	// manager size
	changeSizeImagePrincipal(viewmode: boolean) {
		this.sizeImagePrincipal = viewmode ? '2|3|12' : '3|4|12';
	}
	changeSizeProfile(viewmode: boolean) {
		this.sizeProfile = viewmode ? '3|6|12' : '6|8|12';
	}
	changeSizeAddressPrincipal(viewmode: boolean) {
		this.sizeAddressPrincipal = viewmode ? '2|4|12' : '8|12|12';
	}
	changeSizePhonePrincipal(viewmode: boolean) {
		this.sizePhonePrincipal = viewmode ? '2|4|12' : '8|12|12';
	}
}

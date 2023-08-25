import { Component } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	MessageService,
	PageUtility,
	PreviousRouteService,
} from '@ddc/kit';
import { KeBasePageComponent } from '../../../application-shared/components/ke-base-page.component';
import { AuthenticationService } from '../../../modules/authentication/base/authentication.service';

@Component({
	selector: 'reserve-vic-page',
	templateUrl: './vic-page.component.html',
	styleUrls: ['./vic-page.component.scss'],
})
export class VicPageComponent extends KeBasePageComponent {
	// var
	blocked: boolean;
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
		previousRoute: PreviousRouteService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		authenticationService: AuthenticationService,
	) {
		super(
			applicationLogger,
			router,
			activatedRoute,
			previousRoute,
			messageService,
			applicationStorage,
			authenticationService,
		);
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
		super.manageQueryParams(data);
	}

	// ----- inherit
	workParams(data: ParamMap) {
		// qr-code
		this.textQr = window.location.host + '/#/reserve/vic/' + PageUtility.encodeParam(this.id_user);
	}
	declarePermissions(): Map<string, string[]> {
		const mapPermissions: Map<string, string[]> = new Map<string, string[]>();
		return mapPermissions;
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

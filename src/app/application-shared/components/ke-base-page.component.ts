import { Directive } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BasePageComponent,
	PageUtility,
} from '@ddc/kit';
import { AuthenticationService } from '../../modules/authentication/base/authentication.service';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class KeBasePageComponent extends BasePageComponent {
	// var
	queryParams: ParamMap;
	id_user: string;
	idUserLogged: string;
	// services
	applicationStorage: ApplicationStorageService;
	authenticationService: AuthenticationService;
	// checks
	isMine: boolean;
	assignedPermission: Map<string, boolean>;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		applicationStorage: ApplicationStorageService,
		authenticationService: AuthenticationService,
	) {
		super(applicationLogger, router, activatedRoute);
		this.applicationStorage = applicationStorage;
		this.authenticationService = authenticationService;
		this.idUserLogged = this.applicationStorage.userId.get();
		if (this.queryParams) {
			this.setParams(this.queryParams);
		}
	}

	// ---- inherit
	manageQueryParams(data: ParamMap) {
		this.queryParams = data;
		if (this.idUserLogged) {
			this.setParams(data);
		}
	}

	// ----- specific
	setParams(data: ParamMap) {
		if (data.has('ID_USER')) {
			this.id_user = PageUtility.decodeParam(data.get('ID_USER'));
			this.isMine = this.id_user === this.idUserLogged;
		} else {
			this.id_user = this.idUserLogged;
			this.isMine = true;
		}
		this.workParams(data);
		this.assignPermission();
	}

	assignPermission() {
		this.assignedPermission = new Map<string, boolean>();
		for (const entry of Array.from(this.declarePermissions().entries())) {
			const mapKey: string = entry[0];
			const mapValue: string[] = entry[1];
			this.assignedPermission.set(mapKey, this.authenticationService.checkPermissions(mapValue));
		}
	}

	// ----- abstract
	abstract workParams(data: ParamMap);
	abstract declarePermissions(): Map<string, string[]>;
}

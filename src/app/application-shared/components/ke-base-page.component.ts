import { Directive } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BasePageComponent,
	EnumMessageType,
	MessageModel,
	MessageService,
	PageUtility,
	PreviousRouteService,
} from '@ddc/kit';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../modules/authentication/base/authentication.service';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class KeBasePageComponent extends BasePageComponent {
	// var
	id_user: string;
	idUserLogged: string;
	piva: string;
	pivaLogged: string;
	// services
	previousRoute: PreviousRouteService;
	messageService: MessageService;
	applicationStorage: ApplicationStorageService;
	authenticationService: AuthenticationService;
	// checks
	isMine: boolean;
	isMineActivity: boolean;
	assignedPermission: Map<string, boolean>;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		previousRoute: PreviousRouteService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		authenticationService: AuthenticationService,
	) {
		super(applicationLogger, router, activatedRoute);
		this.previousRoute = previousRoute;
		this.messageService = messageService;
		this.applicationStorage = applicationStorage;
		this.authenticationService = authenticationService;
		this.idUserLogged = this.applicationStorage.userId.get();
		this.pivaLogged = this.applicationStorage.activityPIVA.get();
		/*
    if (this.queryParams) {
			this.setParams(this.queryParams);
		}
    */
	}

	// ---- inherit
	manageQueryParams(data: ParamMap) {
		// this.queryParams = data;
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
		if (data.has('PIVA')) {
			this.piva = PageUtility.decodeParam(data.get('PIVA'));
			this.isMineActivity = this.pivaLogged && this.piva === this.pivaLogged;
		} else {
			this.piva = this.pivaLogged;
			this.isMineActivity = this.pivaLogged ? true : false;
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

	checkPermission(key: string) {
		const grant: boolean = this.assignedPermission.get(key);
		if (!grant) {
			this.failPermissionRoute();
		}
	}

	failPermissionRoute() {
		this.messageService.sendSubjectMessage(
			new MessageModel(
				EnumMessageType.ERROR,
				undefined,
				'LABEL.INFO',
				'PERSONAL.ERROR.USER_NOT_AUTH',
			),
		);
		this.router.navigate(environment.url.home);
	}

	back() {
		this.previousRoute.back();
	}

	// ----- abstract
	abstract workParams(data: ParamMap);
	abstract declarePermissions(): Map<string, string[]>;
}

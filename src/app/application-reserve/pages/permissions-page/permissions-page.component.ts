import { Component } from '@angular/core';
import { ActivatedRoute, Data, NavigationExtras, ParamMap, Router } from '@angular/router';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	EnumFormMode,
	MessageService,
	PageUtility,
	PreviousRouteService,
} from '@ddc/kit';
import { Subscription } from 'rxjs';
import { KeBasePageComponent } from '../../../application-shared/components/ke-base-page.component';
import { AuthenticationService } from '../../../modules/authentication/base/authentication.service';
import { ActivityService } from '../../../modules/authentication/services/activity.service';

@Component({
	selector: 'reserve-permissions-page',
	templateUrl: './permissions-page.component.html',
	styleUrls: ['./permissions-page.component.scss'],
})
export class PermissionsPageComponent extends KeBasePageComponent {
	subActivity: Subscription;
	id_activity: string;
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		previousRoute: PreviousRouteService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		authenticationService: AuthenticationService,
		private activityService: ActivityService,
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
		if (this.piva) {
			this.subActivity = this.activityService.unique(undefined, this.piva).subscribe((activity) => {
				this.id_activity = activity ? activity.id : undefined;
			});
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subActivity) {
			this.subActivity.unsubscribe();
		}
	}
	getClassName(): string {
		return 'PermissionsPageComponent';
	}

	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {}
	manageQueryParams(data: ParamMap) {
		super.manageQueryParams(data);
	}

	// overrides
	assignPermission() {
		super.assignPermission();
		if (this.piva) {
			this.checkPermission('activity');
		} else {
			this.checkPermission('user');
		}
	}
	// implements
	workParams(data: ParamMap) {}
	declarePermissions(): Map<string, string[]> {
		const mapPermissions: Map<string, string[]> = new Map<string, string[]>();
		mapPermissions.set('user', ['SUPERVISOR', 'ALL_PERMISSIONS', 'VIEW_PROFILES']);
		if (this.piva) {
			mapPermissions.set('activity', [
				'MANAGER',
				'ALL_ACTIVITY_PERMISSIONS',
				'VIEW_ACTIVITY_PROFILES',
			]);
		}
		return mapPermissions;
	}

	// operations
	goToNewProfile(flgActivity?: boolean) {
		const extras: NavigationExtras = {};
		extras.queryParams = { mode: PageUtility.encodeParam('' + EnumFormMode.NEW.toString()) };
		if (flgActivity) {
			extras.queryParams.PIVA = PageUtility.encodeParam(this.piva);
		}
		this.previousRoute.navigate(['reserve', 'role'], extras);
	}
}

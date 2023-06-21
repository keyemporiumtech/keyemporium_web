import { Component } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
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
import { PermissionModel } from '../../../modules/authentication/models/permission.model';
import { ActivityService } from '../../../modules/authentication/services/activity.service';
import { ProfilepermissionService } from '../../../modules/authentication/services/profilepermission.service';

@Component({
	selector: 'reserve-role-page',
	templateUrl: './role-page.component.html',
	styleUrls: ['./role-page.component.scss'],
})
export class RolePageComponent extends KeBasePageComponent {
	// params
	modeIn: EnumFormMode;
	editModePermissions: boolean;
	id_profile: string;

	id_activity: string;

	// permissions
	permissions: PermissionModel[];
	// sub
	subActivity: Subscription;
	subUpdatePermissions: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		previousRoute: PreviousRouteService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		authenticationService: AuthenticationService,
		private activityService: ActivityService,
		private profilepermissionService: ProfilepermissionService,
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
		if (this.subUpdatePermissions) {
			this.subUpdatePermissions.unsubscribe();
		}
	}
	getClassName(): string {
		return 'PermissionsPageComponent';
	}

	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {}
	manageQueryParams(data: ParamMap) {
		if (data.has('mode')) {
			const mode = PageUtility.decodeParam(data.get('mode'));
			switch (mode) {
				case '1':
					this.modeIn = EnumFormMode.DETAIL;
					this.editModePermissions = false;
					break;
				case '2':
					this.modeIn = EnumFormMode.UPDATE;
					this.editModePermissions = true;
					break;
				case '3':
					this.modeIn = EnumFormMode.NEW;
					this.editModePermissions = true;
					break;
				default:
					this.modeIn = undefined;
					break;
			}
		}
		if (data.has('ID')) {
			this.id_profile = PageUtility.decodeParam(data.get('ID'));
		}

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
		mapPermissions.set('user', ['SUPERVISOR', 'ALL_PERMISSIONS', 'MANAGE_PROFILES']);
		if (this.piva) {
			mapPermissions.set('activity', [
				'MANAGER',
				'ALL_ACTIVITY_PERMISSIONS',
				'MANAGE_ACTIVITY_PROFILES',
			]);
		}
		return mapPermissions;
	}

	// manage permission save

	selectPermissions(permissions: PermissionModel[]) {
		this.permissions = permissions;
	}
	OnSaveRole(id_profile: string) {
		if (id_profile && this.permissions && this.permissions.length) {
			this.subUpdatePermissions = this.profilepermissionService
				.updatePermissions(id_profile, this.permissions)
				.subscribe();
		}
	}
}

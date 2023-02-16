import { Component } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { ApplicationLoggerService, ApplicationStorageService } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { KeBasePageComponent } from '../../../application-shared/components/ke-base-page.component';
import { ApiFast } from '../../../modules/api/cakeutils/utility/api-fast.utility';
import { AuthenticationService } from '../../../modules/authentication/base/authentication.service';
import { PermissionModel } from '../../../modules/authentication/models/permission.model';
import { ProfileModel } from '../../../modules/authentication/models/profile.model';
import { ProfileService } from '../../../modules/authentication/services/profile.service';
import { ProfilepermissionService } from '../../../modules/authentication/services/profilepermission.service';

@Component({
	selector: 'reserve-permissions-page',
	templateUrl: './permissions-page.component.html',
	styleUrls: ['./permissions-page.component.scss'],
})
export class PermissionsPageComponent extends KeBasePageComponent {
	profiles: ProfileModel[];
	permissions: PermissionModel[];

	subProfiles: Subscription;
	subPermissions: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		applicationStorage: ApplicationStorageService,
		authenticationService: AuthenticationService,
		private profileService: ProfileService,
		private profilepermissionService: ProfilepermissionService,
	) {
		super(applicationLogger, router, activatedRoute, applicationStorage, authenticationService);
		this.profiles = [];
		this.permissions = [];
	}

	ngOnInitForChildren() {
		this.subProfiles = this.profileService
			.paginate(ApiFast.paginatorList(), {})
			.subscribe((paginatorModel) => {
				if (paginatorModel && paginatorModel.list && paginatorModel.list.length) {
					this.profiles = paginatorModel.list;
				}
			});
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subProfiles) {
			this.subProfiles.unsubscribe();
		}
		if (this.subPermissions) {
			this.subPermissions.unsubscribe();
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

	workParams(data: ParamMap) {}
	declarePermissions(): Map<string, string[]> {
		const mapPermissions: Map<string, string[]> = new Map<string, string[]>();
		return mapPermissions;
	}

	// ---
	openPermissions(profile: ProfileModel) {
		this.permissions.length = 0;
		this.subPermissions = this.profilepermissionService
			.paginate(ApiFast.paginatorList([ApiFast.queryField('profile', profile.id)]), {
				belongs: ['permission_fk'],
			})
			.subscribe((paginatorModel) => {
				if (paginatorModel && paginatorModel.list && paginatorModel.list.length) {
					const list = paginatorModel.list;
					list.forEach((el) => {
						this.permissions.push(el.permission);
					});
				}
			});
	}
}

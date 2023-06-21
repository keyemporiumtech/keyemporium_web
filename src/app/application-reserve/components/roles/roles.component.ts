import { Component, Input } from '@angular/core';
import { ApplicationLoggerService, BaseComponent } from '@ddc/kit';
import { map, Observable, Subscription } from 'rxjs';
import { ApiFast } from '../../../modules/api/cakeutils/utility/api-fast.utility';
import { ProfileModel } from '../../../modules/authentication/models/profile.model';
import { ActivityprofileService } from '../../../modules/authentication/services/activityprofile.service';
import { ProfileService } from '../../../modules/authentication/services/profile.service';
import { UserprofileService } from '../../../modules/authentication/services/userprofile.service';

@Component({
	selector: 'reserve-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.scss'],
})
export class RolesComponent extends BaseComponent {
	@Input() id_user: string;
	@Input() id_activity: string;

	id_profile: string;
	profiles: ProfileModel[];

	subProfiles: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private profileService: ProfileService,
		private userprofileService: UserprofileService,
		private activityprofileService: ActivityprofileService,
	) {
		super(applicationLogger);
		this.profiles = [];
	}

	ngOnInitForChildren() {
		let $obsProfiles: Observable<ProfileModel[]>;
		if (this.id_activity) {
			$obsProfiles = this.profilesActivity();
		} else if (this.id_user) {
			$obsProfiles = this.profilesUser();
		} else {
			$obsProfiles = this.profilesAll();
		}

		this.subProfiles = $obsProfiles.subscribe((list) => {
			this.profiles = list;
		});
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subProfiles) {
			this.subProfiles.unsubscribe();
		}
	}
	getClassName(): string {
		return 'RolesComponent';
	}

	// operations
	openPermission(profile: ProfileModel) {
		this.id_profile = profile ? profile.id : undefined;
	}
	// specific

	profilesActivity(): Observable<ProfileModel[]> {
		return this.activityprofileService
			.paginate(ApiFast.paginatorList([ApiFast.queryField('activity', this.id_activity)]), {
				belongs: ['profile_fk'],
			})
			.pipe(
				map((paginator) => {
					if (paginator && paginator.list && paginator.list.length) {
						return paginator.list
							.filter(
								(activityprofile) =>
									activityprofile.profile &&
									!['PROFILE', 'SUPERVISOR', 'EMPLOYER', 'MANAGER'].includes(
										activityprofile.profile.cod,
									),
							)
							.map((ap) => ap.profile);
					} else {
						return [];
					}
				}),
			);
	}

	profilesUser(): Observable<ProfileModel[]> {
		return this.userprofileService
			.paginate(ApiFast.paginatorList([ApiFast.queryField('user', this.id_user)]), {
				belongs: ['profile_fk'],
			})
			.pipe(
				map((paginator) => {
					if (paginator && paginator.list && paginator.list.length) {
						return paginator.list
							.filter(
								(userprofile) =>
									userprofile.profile &&
									!['PROFILE', 'SUPERVISOR', 'EMPLOYER', 'MANAGER'].includes(
										userprofile.profile.cod,
									),
							)
							.map((up) => up.profile);
					} else {
						return [];
					}
				}),
			);
	}

	profilesAll() {
		return this.profileService.paginate(ApiFast.paginatorList(), {}).pipe(
			map((paginator) => {
				if (paginator && paginator.list && paginator.list.length) {
					return paginator.list.filter(
						(profile) => !['PROFILE', 'SUPERVISOR', 'EMPLOYER', 'MANAGER'].includes(profile.cod),
					);
				} else {
					return [];
				}
			}),
		);
	}
}

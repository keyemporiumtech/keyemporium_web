import { Component } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BaseComponent,
	OptionListModel,
} from '@ddc/kit';
import { Subscription } from 'rxjs';
import { ApiFast } from '../../../modules/api/cakeutils/utility/api-fast.utility';
import { ApiServiceUtility } from '../../../modules/api/cakeutils/utility/api-service.utility';
import { AuthenticationService } from '../../../modules/authentication/base/authentication.service';
import { PayloadUserInterface } from '../../../modules/authentication/interfaces/payload-user.interface';
import { UserprofileModel } from '../../../modules/authentication/models/userprofile.model';
import { UserprofileService } from '../../../modules/authentication/services/userprofile.service';

@Component({
	selector: 'shared-user-profiles-dropdown',
	templateUrl: './user-profiles-dropdown.component.html',
	styleUrls: ['./user-profiles-dropdown.component.scss'],
})
export class UserProfilesDropdownComponent extends BaseComponent {
	optionProfiles: OptionListModel[];
	currentProfile: OptionListModel;

	// sub
	subProfiles: Subscription;
	subListenProfile: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private applicationStorage: ApplicationStorageService,
		private userprofileService: UserprofileService,
		private authenticationService: AuthenticationService,
	) {
		super(applicationLogger);
		this.optionProfiles = [];
	}

	ngOnInitForChildren() {
		// load profiles
		const idUserLogged: string = this.applicationStorage.userId.get();
		if (idUserLogged) {
			this.subProfiles = this.userprofileService
				.paginate(
					ApiFast.paginatorList([ApiFast.queryField('user', idUserLogged)]),
					{
						belongs: ['profile_fk', 'activity_fk'],
					},
					ApiServiceUtility.sendUserInfo(),
				)
				.subscribe(
					(paginatorModel) => {
						if (paginatorModel && paginatorModel.list) {
							paginatorModel.list.forEach((element: UserprofileModel) => {
								this.optionProfiles.push(
									new OptionListModel(element.profile.cod, element.description, element),
								);
							});
							this.manageListen();
						}
					},
					(err) => console.error(err),
				);
		}
	}

	ngAfterViewInitForChildren() {}

	manageListen() {
		// manage listen
		if (this.applicationStorage.profile.get()) {
			setTimeout(() => {
				this.setCurrent(this.applicationStorage.profile.get());
			}, 0);
		}
		this.subListenProfile = this.authenticationService
			.getProfile()
			// .pipe(distinctUntilChanged())
			.subscribe((profile) => {
				if ((this.currentProfile && this.currentProfile.key !== profile) || !this.currentProfile) {
					setTimeout(() => {
						this.setCurrent(profile);
					}, 0);
				}
			});
	}
	ngOnDestroyForChildren() {
		if (this.subProfiles) {
			this.subProfiles.unsubscribe();
		}
		if (this.subListenProfile) {
			this.subListenProfile.unsubscribe();
		}
	}
	getClassName(): string {
		return 'UserProfilesDropdownComponent';
	}

	// ---- inner functions
	setCurrent(codProfile: string) {
		if (codProfile) {
			const searchProfile: OptionListModel = this.getProfile(codProfile);
			this.currentProfile = searchProfile;
		}
	}
	getProfile(codProfile: string): OptionListModel {
		return this.optionProfiles && this.optionProfiles.length
			? this.optionProfiles.find((el) => el.key === codProfile)
			: undefined;
	}

	changeProfile(option: OptionListModel) {
		const userLogged: PayloadUserInterface = this.applicationStorage.userLogged.getObj();
		const userProfile: UserprofileModel = option.payload;
		this.authenticationService.setProfileWithActivity(
			option.key,
			userLogged.username,
			userProfile.activity && userProfile.activity.id ? userProfile.activity.piva : undefined,
		);
		this.setCurrent(option.key);
	}

	isCurrent(option: OptionListModel) {
		return this.currentProfile && option && this.currentProfile.key === option.key;
	}
}

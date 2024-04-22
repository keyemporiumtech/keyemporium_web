import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BaseComponent,
	MagicValidatorUtil,
	OptionListModel,
	StringTranslate,
} from '@ddc/kit';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { InputSelectComponent } from '../../../../shared/form/input-select/input-select.component';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { ApiFast } from '../../../api/cakeutils/utility/api-fast.utility';
import { AuthenticationService } from '../../base/authentication.service';
import { UserprofileModel } from '../../models/userprofile.model';
import { UserprofileService } from '../../services/userprofile.service';

@Component({
	selector: 'ddc-init-user-profiles',
	templateUrl: './user-profiles.component.html',
	styleUrls: ['./user-profiles.component.scss'],
})
export class UserProfilesComponent extends BaseComponent {
	@Input() isAppend: boolean;
	@Input() label: string | StringTranslate;
	@Input() showLabel: boolean = true;
	@ViewChild('profiles', { static: false }) profiles: InputSelectComponent;
	@Output() emitCount: EventEmitter<number> = new EventEmitter<number>();

	formUserProfiles: FormGroup;
	validations: any = {};
	selectProfiles: FormFieldModel;
	optionProfiles: OptionListModel[];

	// sub
	subProfiles: Subscription;
	subChangeProfile: Subscription;
	subListenProfile: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private applicationStorage: ApplicationStorageService,
		private fb: FormBuilder,
		private userprofileService: UserprofileService,
		private authenticationService: AuthenticationService,
	) {
		super(applicationLogger);
		this.optionProfiles = [];
		// build form
		this.formUserProfiles = this.fb.group({
			profile: new MagicValidatorUtil((this.validations.profile = []), undefined)
				.required()
				.build(),
		});
	}

	ngOnInitForChildren() {
		// load profiles
		const idUserLogged: string = this.applicationStorage.userId.get();
		if (idUserLogged) {
			this.subProfiles = this.userprofileService
				.paginate(ApiFast.paginatorList([ApiFast.queryField('user', idUserLogged)]), {
					belongs: ['profile_fk', 'activity_fk'],
				})
				.subscribe((paginatorModel) => {
					if (paginatorModel && paginatorModel.list) {
						paginatorModel.list.forEach((element: UserprofileModel) => {
							this.optionProfiles.push(
								new OptionListModel(element.profile.cod, element.description, element.profile),
							);
							this.emitCount.emit(this.optionProfiles.length);
						});
					}
				});
		}

		// creation form
		this.selectProfiles = new FormFieldModel(
			EnumFormType.SELECT,
			this.formUserProfiles.get('profile') as FormControl,
			this.label ? this.label : 'APP.LABEL.PROFILE',
		)
			.validation(this.validations.profile)
			.onInit();

		// manage change
		this.subChangeProfile = this.formUserProfiles
			.get('profile')
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((profile) => {
				if (this.isAppend) {
					this.authenticationService.appendProfile(
						this.authenticationService.loadPermissions(profile),
						profile,
					);
				} else {
					this.authenticationService.setProfile(profile);
				}
			});
	}
	ngAfterViewInitForChildren() {
		// manage listen
		if (this.applicationStorage.profile.get()) {
			setTimeout(() => {
				this.formUserProfiles.get('profile').setValue(this.applicationStorage.profile.get());
			}, 0);
		}
		this.subListenProfile = this.authenticationService
			.getProfile()
			// .pipe(distinctUntilChanged())
			.subscribe((profile) => {
				if (
					this.formUserProfiles &&
					this.formUserProfiles.get('profile').value &&
					this.formUserProfiles.get('profile').value !== profile
				) {
					setTimeout(() => {
						this.formUserProfiles.get('profile').setValue(profile);
					}, 0);
				}
			});
	}
	ngOnDestroyForChildren() {
		if (this.subProfiles) {
			this.subProfiles.unsubscribe();
		}
		if (this.subChangeProfile) {
			this.subChangeProfile.unsubscribe();
		}
		if (this.subListenProfile) {
			this.subListenProfile.unsubscribe();
		}
	}
	getClassName(): string {
		return 'UserProfilesComponent';
	}
}

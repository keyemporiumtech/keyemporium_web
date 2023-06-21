import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationLoggerService, BaseComponent, OptionListModel } from '@ddc/kit';
import { distinctUntilChanged, map, Observable, Subscription } from 'rxjs';
import { ApiFast } from '../../../../modules/api/cakeutils/utility/api-fast.utility';
import { ApiServiceUtility } from '../../../../modules/api/cakeutils/utility/api-service.utility';
import { PermissionModel } from '../../../../modules/authentication/models/permission.model';
import { PermissionService } from '../../../../modules/authentication/services/permission.service';
import { ProfilepermissionService } from '../../../../modules/authentication/services/profilepermission.service';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';

@Component({
	selector: 'reserve-role-permissions',
	templateUrl: './role-permissions.component.html',
	styleUrls: ['./role-permissions.component.scss'],
})
export class RolePermissionsComponent extends BaseComponent {
	@Output() emitPermissions: EventEmitter<PermissionModel[]> = new EventEmitter<
		PermissionModel[]
	>();
	@Input() editMode: boolean;
	private _id_profile: string;
	@Input() set id_profile(val: string) {
		this._id_profile = val;
		this.openPermission(val);
	}

	get id_profile(): string {
		return this._id_profile;
	}

	permissions: PermissionModel[];
	optionsPermissions: OptionListModel[];
	formPermissions: FormGroup;
	FLD_checkPermissions: FormFieldModel;

	subPermissions: Subscription;
	changePermissions: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private profilepermissionService: ProfilepermissionService,
		private permissionService: PermissionService,
	) {
		super(applicationLogger);
		this.permissions = [];
		this.optionsPermissions = [];
	}

	ngOnInitForChildren() {
		if (this.editMode) {
			this.formPermissions = this.fb.group({
				permissions: [],
			});

			this.FLD_checkPermissions = new FormFieldModel(
				EnumFormType.CHECKBOX,
				this.formPermissions.get('permissions') as FormControl,
				'',
			).onInit();

			this.changePermissions = this.formPermissions.valueChanges
				.pipe(distinctUntilChanged())
				.subscribe((permissions) => {
					this.emitPermissions.emit(this.permissions.filter((el) => permissions.includes(el.id)));
				});
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subPermissions) {
			this.subPermissions.unsubscribe();
		}
		if (this.changePermissions) {
			this.changePermissions.unsubscribe();
		}
	}
	getClassName(): string {
		return 'RolePermissionsComponent';
	}

	openPermission(id_profile) {
		this.permissions.length = 0;

		let $obs: Observable<PermissionModel[]>;

		if (id_profile) {
			$obs = this.profilepermissionService
				.paginate(
					ApiFast.paginatorList([ApiFast.queryField('profile', id_profile)]),
					{
						belongs: ['permission_fk'],
					},
					ApiServiceUtility.sendActivityInfo(),
				)
				.pipe(
					map((paginatorModel) => {
						let list: PermissionModel[] = [];

						if (paginatorModel && paginatorModel.list && paginatorModel.list.length) {
							list = paginatorModel.list.map((val) => val.permission);
						}
						return list;
					}),
				);
		} else {
			$obs = this.permissionService
				.paginate(ApiFast.paginatorList(), undefined, ApiServiceUtility.sendActivityInfo())
				.pipe(map((paginatorModel) => paginatorModel.list));
		}

		this.subPermissions = $obs.subscribe((list) => {
			this.permissions = list;
			if (this.editMode) {
				this.optionsPermissions = this.permissions.map(
					(el) => new OptionListModel(el.id, '[' + el.cod + '] - ' + el.name),
				);
			}
		});
	}
}

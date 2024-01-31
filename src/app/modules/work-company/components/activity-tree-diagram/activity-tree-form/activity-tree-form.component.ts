import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	ApplicationLoggerService,
	BaseFormComponent,
	BehaviourObserverModel,
	EnumFormMode,
	MagicValidatorUtil,
	OptionListModel,
} from '@ddc/kit';
import { combineLatest, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { OrgTreeModel } from 'gojs-diagram';
import { QueryUtility } from '@ddc/rest';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { EnumDBLike } from '../../../../api/cakeutils/enums/db-like.enum';
import { RequestConditionInterface } from '../../../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestPaginatorInterface } from '../../../../api/cakeutils/interfaces/request-paginator.interface';
import { ActivityConverter } from '../../../../authentication/converters/activity.converter';
import { UserConverter } from '../../../../authentication/converters/user.converter';
import { EnumSexType } from '../../../../authentication/enums/sex-type.enum';
import { ActivityModel } from '../../../../authentication/models/activity.model';
import { UserModel } from '../../../../authentication/models/user.model';
import { ActivityService } from '../../../../authentication/services/activity.service';
import { UserService } from '../../../../authentication/services/user.service';
import { ActivityuserConverter } from '../../../converters/activityuser.converter';
import { WorkroleConverter } from '../../../converters/workrole.converter';
import { ActivityuserModel } from '../../../models/activityuser.model';
import { WorkroleModel } from '../../../models/workrole.model';
import { ActivityuserService } from '../../../services/activityuser.service';
import { WorkroleService } from '../../../services/workrole.service';
import { ActivityOrgTreePayload } from '../models/activity-org-tree.payload';

@Component({
	selector: 'ddc-init-activity-tree-form',
	templateUrl: './activity-tree-form.component.html',
	styleUrls: ['./activity-tree-form.component.scss'],
})
export class ActivityTreeFormComponent extends BaseFormComponent {
	@Input() id_activity: string;
	@Input() piva: string;
	private _modelIn: OrgTreeModel;
	@Input() set modelIn(val: OrgTreeModel) {
		this._modelIn = val;
		if (this.model) {
			this.reloadModel();
		}
	}
	get modelIn(): OrgTreeModel {
		return this._modelIn;
	}
	@Input() list: ActivityuserModel[] = [];
	@Input() labels: any = {
		name: 'Nome',
		surname: 'Cognome',
		sex: 'Sesso',
		born: 'Data di Nascita',
		cf: 'Codice Fiscale',
		role: 'Ruolo Aziendale',
		roleCod: 'Codice',
		roleDescription: 'Descrizione',
		cod: 'Matricola',
		parent: 'Depend by',
		otherRole: 'Nuovo',
	};
	// fields
	FLD_name: FormFieldModel;
	FLD_surname: FormFieldModel;
	FLD_sex: FormFieldModel;
	FLD_born: FormFieldModel;
	FLD_cf: FormFieldModel;
	FLD_role1: FormFieldModel;
	FLD_role2: FormFieldModel;
	FLD_roleSearch: FormFieldModel;
	FLD_cod: FormFieldModel;
	FLD_parent: FormFieldModel;
	optionsSex: OptionListModel[] = [];
	optionsParents: OptionListModel[] = [];
	optionsRoles: OptionListModel[] = [];
	keyRole: string | undefined;

	subSearchRole: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private activityService: ActivityService,
		private userService: UserService,
		private workroleService: WorkroleService,
		private activityuserService: ActivityuserService,
	) {
		super(applicationLogger, fb);
		this.initFields();
	}

	getForm(): FormGroup<any> {
		return this.fb.group({
			name: new MagicValidatorUtil((this.validationMessages.name = []), undefined)
				.required()
				.build(),
			surname: new MagicValidatorUtil((this.validationMessages.surname = []), undefined)
				.required()
				.build(),
			sex: new MagicValidatorUtil((this.validationMessages.sex = []), undefined).required().build(),
			born: new MagicValidatorUtil((this.validationMessages.born = []), undefined)
				.required()
				.isDate()
				.mustBeLessOrEqualThanCurrent()
				.build(),
			cf: new MagicValidatorUtil((this.validationMessages.cf = []), undefined).build(),
			roleSearch: new MagicValidatorUtil(
				(this.validationMessages.roleSearch = []),
				undefined,
			).build(),
			role1: new MagicValidatorUtil((this.validationMessages.role1 = []), undefined)
				.required()
				.build(),
			role2: new MagicValidatorUtil((this.validationMessages.role1 = []), undefined)
				.required()
				.build(),
			cod: new MagicValidatorUtil((this.validationMessages.cod = []), undefined).required().build(),
			parent: new MagicValidatorUtil((this.validationMessages.parent = []), undefined).build(),
		});
	}
	getValidationMessages() {
		return {};
	}
	setValueChanges() {}
	setLoader() {}
	setLoaderAsync(): Observable<boolean> {
		return this.activityService.unique(this.id_activity, this.piva).pipe(
			map((activity) => {
				this.id_activity = activity.id;

				this.optionsSex = [
					new OptionListModel(EnumSexType.MASCHIO, EnumSexType.MASCHIO),
					new OptionListModel(EnumSexType.FEMMINA, EnumSexType.FEMMINA),
					new OptionListModel(EnumSexType.ALTRO, EnumSexType.ALTRO),
				];

				if (this.list) {
					this.list.forEach((el) => {
						if (el.activity.id === this.id_activity)
							this.optionsParents.push(new OptionListModel(el.user.id, el.user.completeName));
					});
				}
				return true;
			}),
		);
	}
	extractData(): OrgTreeModel {
		const values = this.form.getRawValue();

		const activity: ActivityModel =
			this.model && this.model.payloads && this.model.payloads.activity
				? this.model.payloads.activity
				: new ActivityConverter().getEmptyModel();
		activity.id = this.id_activity;

		const user: UserModel =
			this.model && this.model.payloads && this.model.payloads.user
				? this.model.payloads.user
				: new UserConverter().getEmptyModel();
		user.name = values.name;
		user.surname = values.surname;
		user.sex = values.sex;
		user.born = values.born;
		user.cf = values.cf;

		const role: WorkroleModel =
			this.model && this.model.payloads && this.model.payloads.role
				? this.model.payloads.role
				: new WorkroleConverter().getEmptyModel();
		role.name = values.role1;
		role.description = values.role2;

		const activityuser: ActivityuserModel =
			this.model && this.model.payloads && this.model.payloads.activityuser
				? this.model.payloads.activityuser
				: new ActivityuserConverter().getEmptyModel();
		activityuser.cod = values.cod;

		if (activity && activity.id && activityuser.activity) {
			activityuser.activity.id = activity.id;
		} else if (activity) {
			if (!activityuser.activity) {
				activityuser.activity = new ActivityConverter().getEmptyModel();
			}
			activityuser.activity = activity;
			if (!activity.id) {
				activityuser.activity.id = this.id_activity;
			}
		}

		if (user && user.id && activityuser.user) {
			activityuser.user.id = user.id;
		} else if (user) {
			if (!activityuser.user) {
				activityuser.user = new UserConverter().getEmptyModel();
			}
			activityuser.user = user;
		}

		if (role && role.id && activityuser.role) {
			activityuser.role.id = role.id;
		} else if (role) {
			if (!activityuser.role) {
				activityuser.role = new WorkroleConverter().getEmptyModel();
			}
			activityuser.role = role;
		}

		if (!activityuser.father) {
			activityuser.father = new UserConverter().getEmptyModel();
		}
		activityuser.father.id = values.parent;

		const payload: ActivityOrgTreePayload = {
			user: user,
			activityuser: activityuser,
			role: role,
			activity:
				this.model && this.model.payloads && this.model.payloads.activity
					? this.model.payloads.activity
					: undefined,
			father: activityuser.father,
			pic:
				this.model && this.model.payloads && this.model.payloads.pic
					? this.model.payloads.pic
					: undefined,
		};

		const model: OrgTreeModel = {
			name: values.name + ' ' + values.surname,
			role: values.role,
			matricola: values.cod,
			parent: values.parent,
			payloads: payload,
		};

		return model;
	}
	setModel(): Observable<OrgTreeModel> {
		return of(
			this.modelIn
				? this.modelIn
				: {
						name: undefined,
						role: undefined,
				  },
		);
	}
	fillForm(form: FormGroup<any>, model: OrgTreeModel) {
		form
			.get('name')
			.setValue(model.payloads && model.payloads.user ? model.payloads.user.name : undefined);
		form
			.get('surname')
			.setValue(model.payloads && model.payloads.user ? model.payloads.user.surname : undefined);
		form
			.get('sex')
			.setValue(model.payloads && model.payloads.user ? model.payloads.user.sex : undefined);
		form
			.get('born')
			.setValue(model.payloads && model.payloads.user ? model.payloads.user.born : undefined);
		form
			.get('cf')
			.setValue(model.payloads && model.payloads.user ? model.payloads.user.cf : undefined);
		form
			.get('role1')
			.setValue(model.payloads && model.payloads.role ? model.payloads.role.name : undefined);
		form
			.get('role2')
			.setValue(
				model.payloads && model.payloads.role ? model.payloads.role.description : undefined,
			);
		form
			.get('cod')
			.setValue(
				model.payloads && model.payloads.activityuser ? model.payloads.activityuser.cod : undefined,
			);
		form
			.get('parent')
			.setValue(model.payloads && model.payloads.father ? model.payloads.father.id : undefined);
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: any) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: OrgTreeModel) {
		const indexMine: number = this.optionsParents.findIndex((el) => el.key === res.key);
		if (indexMine !== -1) {
			this.optionsParents.splice(indexMine, 1);
		}
		this.form.get('role1').disable();
		this.form.get('role2').disable();
	}
	getModelFieldForId(): string {
		return 'key';
	}
	saveModel(model: OrgTreeModel): Observable<string> {
		const $obsUser: Observable<string> = this.userService.save(model.payloads.user);
		const $obsRole: Observable<string> = this.keyRole
			? of(this.keyRole)
			: this.workroleService.save(model.payloads.role);

		return combineLatest([$obsUser, $obsRole]).pipe(
			switchMap((data) => {
				model.payloads.activityuser.user.id = data[0];
				model.payloads.activityuser.role.id = data[1];
				return this.activityuserService.save(model.payloads.activityuser);
			}),
		);
	}
	updateModel(model: OrgTreeModel): Observable<string> {
		const $obsUser: Observable<string> = this.userService.edit(
			model.payloads.user,
			model.payloads.user.id,
		);
		const $obsRole: Observable<string> = this.keyRole
			? of(this.keyRole)
			: this.workroleService.save(model.payloads.role);

		return combineLatest([$obsUser, $obsRole]).pipe(
			switchMap((data) => {
				model.payloads.activityuser.user.id = data[0];
				model.payloads.activityuser.role.id = data[1];
				return this.activityuserService.edit(
					model.payloads.activityuser,
					model.payloads.activityuser.id,
				);
			}),
		);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: string) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterSave(res: any) {}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subSearchRole) {
			this.subSearchRole.unsubscribe();
		}
	}
	getClassName(): string {
		return 'ActivityTreeFormComponent';
	}

	// ---- OVERRIDE
	changeMode(mode: EnumFormMode) {
		const reset = () => {
			if (this.form) {
				this.form.get('role1').disable();
				this.form.get('role2').disable();
			}
		};
		super.changeMode(mode, reset, reset);
	}

	// COMPONENTE

	searchRole(term: string) {
		const filters: any[] = [
			{
				type: 0,
				value: term,
				between: [],
				children: [],
				key: 'description',
				like: EnumDBLike.LR,
			},
		];
		const paginator: RequestPaginatorInterface = {
			filters: filters,
			orders: [{ key: 'description', value: 'asc' }],
			paginate: { limit: 5, page: 1 },
		};
		const conditions: RequestConditionInterface = {
			belongs: undefined,
			virtualfields: undefined,
			flags: undefined,
		};
		this.subSearchRole = this.workroleService
			.paginate(paginator, undefined, undefined, QueryUtility.SKIP_ERROR_RES)
			.subscribe((paginate) => {
				const options: OptionListModel[] = [];
				if (paginate && paginate.list && paginate.list.length) {
					paginate.list.forEach((role) => {
						options.push(new OptionListModel(role.id, role.description, role));
					});
				}

				options.push(
					new OptionListModel('-1', this.labels.otherRole, undefined, 'btn btn-sm btn-primary'),
				);

				this.optionsRoles = options;
			});
	}

	selectRole(option: OptionListModel) {
		if (option.key !== '-1') {
			this.form.get('role1').disable();
			this.form.get('role2').disable();
			this.form.get('role1').setValue(option.payload.name);
			this.form.get('role2').setValue(option.text);
			this.keyRole = option.key;
		} else {
			this.form.get('role1').enable();
			this.form.get('role2').enable();
			this.form.get('role1').setValue('');
			this.form.get('role2').setValue('');
			this.keyRole = undefined;
		}
	}

	initFields() {
		this.FLD_name = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('name') as FormControl,
			this.labels.name,
		)
			.validation(this.validationMessages.name)
			.onInit();

		this.FLD_surname = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('surname') as FormControl,
			this.labels.surname,
		)
			.validation(this.validationMessages.surname)
			.onInit();

		this.FLD_sex = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get('sex') as FormControl,
			this.labels.sex,
		)
			.validation(this.validationMessages.sex)
			.onInit();

		this.FLD_born = new FormFieldModel(
			EnumFormType.DATE,
			this.form.get('born') as FormControl,
			this.labels.born,
		)
			.validation(this.validationMessages.born)
			.onInit();

		this.FLD_cf = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('cf') as FormControl,
			this.labels.cf,
		)
			.validation(this.validationMessages.cf)
			.onInit();

		this.FLD_roleSearch = new FormFieldModel(
			EnumFormType.SEARCH,
			this.form.get('roleSearch') as FormControl,
			this.labels.role,
		)
			.validation(this.validationMessages.roleSearch)
			.onInit();

		this.FLD_role1 = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('role1') as FormControl,
			this.labels.roleCod,
		)
			.validation(this.validationMessages.role1)
			.onInit();

		this.FLD_role2 = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('role2') as FormControl,
			this.labels.roleDescription,
		)
			.validation(this.validationMessages.role2)
			.onInit();

		this.FLD_cod = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('cod') as FormControl,
			this.labels.cod,
		)
			.validation(this.validationMessages.cod)
			.onInit();

		this.FLD_parent = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get('parent') as FormControl,
			this.labels.parent,
		)
			.validation(this.validationMessages.parent)
			.onInit();
	}
}

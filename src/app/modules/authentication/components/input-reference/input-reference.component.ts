import {
	Component,
	OnInit,
	OnDestroy,
	AfterViewInit,
	Input,
	ViewChild,
	EventEmitter,
	Output,
} from '@angular/core';
import { BaseReferenceComponent } from '@ddc/rest';
import {
	ApplicationLoggerService,
	BehaviourObserverModel,
	OptionListModel,
	MagicValidatorUtil,
	CustomValidatorsMessages,
} from '@ddc/kit';
import { InputSelectComponent } from '../../../../shared/form/input-select/input-select.component';
import { EnumContactreferenceType } from '../../enums/contactreference-type.enum';
import { Subscription, Observable } from 'rxjs';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { DbFilterInterface } from '../../../api/cakeutils/interfaces/db-filter.interface';
import { ApiFast } from '../../../api/cakeutils/utility/api-fast.utility';
import { ContactreferenceService } from '../../services/contactreference.service';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { NationModel } from '../../../localesystem/models/nation.model';
import { NationService } from '../../../localesystem/services/nation.service';
import { RequestPaginatorInterface } from '../../../api/cakeutils/interfaces/request-paginator.interface';
import { RequestConditionInterface } from '../../../api/cakeutils/interfaces/request-conditions.interface';
import { TypologicalModel } from '../../../api/cakeutils-be/models/typological.model';
import { ContactreferenceModel } from '../../models/contactreference.model';

@Component({
	selector: 'ddc-init-input-reference',
	templateUrl: './input-reference.component.html',
	styleUrls: ['./input-reference.component.scss'],
})
export class InputReferenceComponent extends BaseReferenceComponent
	implements OnInit, OnDestroy, AfterViewInit {
	@Input() cssClass: any;
	@Input() cssStyle: any;
	@Input() flgHtmlPrefix: boolean;
	@Input() flgHtmlSocial: boolean;
	// TP REFERENCE
	@ViewChild('tpreferenceComponent') tpreferenceComponent: InputSelectComponent;
	@Input() fieldTpreference: string;
	@Input() tpreference: EnumContactreferenceType;
	@Input() tpreferences: EnumContactreferenceType[];
	@Input() tpreferenceFlag: boolean;
	@Input() tpreferenceReadonly: boolean;
	@Output() tpreferenceEmitter: EventEmitter<any> = new EventEmitter<any>();
	optionsTpreference: OptionListModel[];
	subTpreference: Subscription;
	subFieldTpreference: Subscription;
	// DESCRIPTION
	@Input() fieldDescription: string;
	@Input() descriptionFlag: boolean;
	@Input() descriptionReadonly: boolean;
	// FIELDS
	@Input() validationsReference: any;
	@Input() required: boolean;
	tpReferenceFormField: FormFieldModel;
	descriptionFormField: FormFieldModel;
	telFormField: FormFieldModel;
	telFormSearch: FormFieldModel;
	telListSearch: OptionListModel[];
	socialFormField: FormFieldModel;
	socialFormSearch: FormFieldModel;
	socialListSearch: OptionListModel[];
	valFormField: FormFieldModel;
	// val control
	enableNumber: boolean;
	enableEmail: boolean;
	enableLink: boolean;
	showPrefix: boolean;
	showSocial: boolean;
	// loaded
	loadedTpreference: boolean;
	loadedPrefix: boolean;
	loadedSocial: boolean;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private contactreferenceService: ContactreferenceService,
		private nationService: NationService,
	) {
		super(applicationLogger);
		this.optionsTpreference = [];
		this.fieldTpreference = 'tpreference';
		this.fieldDescription = 'description';
		this.telListSearch = [];
		this.socialListSearch = [];
	}

	ngOnInit() {
		this.manageFields();
		this.manageTpReference();
		super.ngOnInit();
	}

	ngAfterViewInit() {
		super.ngAfterViewInit();
	}

	ngOnDestroy() {
		if (this.subTpreference) {
			this.subTpreference.unsubscribe();
		}
		if (this.subFieldTpreference) {
			this.subFieldTpreference.unsubscribe();
		}
		super.ngOnDestroy();
	}

	// TP REFERENCE
	manageTpReference() {
		const filters: DbFilterInterface[] =
			this.tpreferences && this.tpreferences.length
				? [ApiFast.queryField('id', this.tpreferences)]
				: undefined;

		const paginator = ApiFast.paginatorList(filters, [{ key: 'title', value: 'asc' }], undefined);

		this.subTpreference = this.contactreferenceService
			.tpcontactreference(paginator)
			.subscribe((list) => {
				list.forEach((el) => {
					this.optionsTpreference.push(new OptionListModel(el.id, el.title, el));
				});
				this.loadedTpreference = true;
			});
		this.subFieldTpreference = this.form
			.get(this.fieldTpreference)
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((tpreference) => {
				this.tpreferenceEmitter.emit(tpreference);
				switch (tpreference) {
					case EnumContactreferenceType.CEL.toString():
					case EnumContactreferenceType.TEL.toString():
					case EnumContactreferenceType.FAX.toString():
						this.enableEmail = false;
						this.enableLink = false;
						this.enableNumber = true;
						this.showSocial = false;
						this.showPrefix = true;
						this.evaluateVal();
						this.validateTel(true);
						this.validateSocial(false);
						break;
					case EnumContactreferenceType.EMAIL.toString():
					case EnumContactreferenceType.PEC.toString():
						this.enableEmail = true;
						this.enableLink = false;
						this.enableNumber = false;
						this.showSocial = false;
						this.showPrefix = false;
						this.evaluateVal();
						this.validateTel(false);
						this.validateSocial(false);
						break;
					case EnumContactreferenceType.SOCIAL.toString():
						this.enableEmail = false;
						this.enableLink = true;
						this.enableNumber = false;
						this.showSocial = true;
						this.showPrefix = false;
						this.evaluateVal();
						this.validateTel(false);
						this.validateSocial(true);
						break;
					case EnumContactreferenceType.SITE.toString():
					case EnumContactreferenceType.BLOG.toString():
						this.enableEmail = false;
						this.enableLink = true;
						this.enableNumber = false;
						this.showSocial = false;
						this.showPrefix = false;
						this.evaluateVal();
						this.validateTel(false);
						this.validateSocial(false);
						break;
					default:
						this.enableEmail = false;
						this.enableLink = false;
						this.enableNumber = false;
						this.showSocial = false;
						this.showPrefix = false;
						this.evaluateVal();
						this.validateTel(false);
						this.validateSocial(false);
						break;
				}
			});

		if (this.tpreference) {
			this.form.get(this.fieldTpreference).setValue(this.tpreference.toString());
		}
		if (this.tpreferenceReadonly) {
			this.form.get(this.fieldTpreference).disable();
		}
		// description
		if (this.descriptionReadonly) {
			this.form.get(this.fieldDescription).disable();
		}
	}

	// TEL AND SOCIAL
	searchTel(term: string) {
		this.telListSearch = this.telOptions.filter(
			(el) =>
				el.payload.tel.toLowerCase().includes(term.toLowerCase()) ||
				el.payload.name.toLowerCase().includes(term.toLowerCase()),
		);
	}

	selectTel(item: OptionListModel) {
		this.form.get(this.fieldTel).setValue(item.key);
		this.form.get(this.fieldTel).updateValueAndValidity();
		this.telFormSearch.formControl.setValue(item.payload.tel);
	}

	searchSocial(term: string) {
		this.socialListSearch = this.socialOptions.filter((el) =>
			el.payload.title.toLowerCase().includes(term.toLowerCase()),
		);
	}

	selectSocial(item: OptionListModel) {
		this.form.get(this.fieldSocial).setValue(item.key);
		this.form.get(this.fieldSocial).updateValueAndValidity();
		this.socialFormSearch.formControl.setValue(item.payload.title);
	}

	private evaluateVal() {
		this.valFormField.validations.length = 0;
		if (this.required) {
			this.form.get(this.fieldVal).setValidators([Validators.required]);
			this.valFormField.validations.push(CustomValidatorsMessages.REQUIRED());
			this.form.get(this.fieldVal).updateValueAndValidity({ onlySelf: true, emitEvent: false });
		} else {
			this.form.get(this.fieldVal).setValidators([]);
			this.form.get(this.fieldVal).updateValueAndValidity({ onlySelf: true, emitEvent: false });
		}
	}
	private validateTel(flg: boolean) {
		if (flg) {
			this.form.get(this.fieldTel).setValidators([Validators.required]);
			this.telFormField.validations.push(CustomValidatorsMessages.REQUIRED());
			this.form.get(this.fieldTel).updateValueAndValidity({ onlySelf: true, emitEvent: false });
			if (this.flgHtmlPrefix) {
				this.form.get('telFormSearch').setValidators([Validators.required]);
				this.telFormSearch.validations.push(CustomValidatorsMessages.REQUIRED());
				this.form.get('telFormSearch').updateValueAndValidity({ onlySelf: true, emitEvent: false });
			}
		} else {
			this.form.get(this.fieldTel).setValidators([]);
			let index: number;
			index = this.telFormField.validations.findIndex(
				(el) => el.type === CustomValidatorsMessages.REQUIRED().type,
			);
			if (index !== -1) {
				this.telFormField.validations.splice(index, 1);
			}
			this.form.get(this.fieldTel).updateValueAndValidity({ onlySelf: true, emitEvent: false });
			if (this.flgHtmlPrefix) {
				this.form.get('telFormSearch').setValidators([]);
				index = this.telFormSearch.validations.findIndex(
					(el) => el.type === CustomValidatorsMessages.REQUIRED().type,
				);
				if (index !== -1) {
					this.telFormSearch.validations.splice(index, 1);
				}
				this.form.get('telFormSearch').updateValueAndValidity({ onlySelf: true, emitEvent: false });
			}
		}
	}

	private validateSocial(flg: boolean) {
		if (flg) {
			this.form.get(this.fieldSocial).setValidators([Validators.required]);
			this.socialFormField.validations.push(CustomValidatorsMessages.REQUIRED());
			this.form.get(this.fieldSocial).updateValueAndValidity({ onlySelf: true, emitEvent: false });
			if (this.flgHtmlSocial) {
				this.form.get('socialFormSearch').setValidators([Validators.required]);
				this.socialFormSearch.validations.push(CustomValidatorsMessages.REQUIRED());
				this.form
					.get('socialFormSearch')
					.updateValueAndValidity({ onlySelf: true, emitEvent: false });
			}
		} else {
			this.form.get(this.fieldSocial).setValidators([]);
			let index: number;
			index = this.socialFormField.validations.findIndex(
				(el) => el.type === CustomValidatorsMessages.REQUIRED().type,
			);
			if (index !== -1) {
				this.socialFormField.validations.splice(index, 1);
			}
			this.form.get(this.fieldSocial).updateValueAndValidity({ onlySelf: true, emitEvent: false });
			if (this.flgHtmlSocial) {
				this.form.get('socialFormSearch').setValidators([]);
				index = this.socialFormSearch.validations.findIndex(
					(el) => el.type === CustomValidatorsMessages.REQUIRED().type,
				);
				if (index !== -1) {
					this.socialFormSearch.validations.splice(index, 1);
				}
				this.form
					.get('socialFormSearch')
					.updateValueAndValidity({ onlySelf: true, emitEvent: false });
			}
		}
	}

	// SEPCIFIC MANAGEMENT
	setForm() {
		this.fieldTel = 'tel';
		this.fieldSocial = 'social';
		this.fieldVal = 'val';
		if (this.required) {
			this.form = this.fb.group({
				tpreference: this.tpreferenceFlag
					? new MagicValidatorUtil((this.validationsReference.tpreference = []), undefined)
							.required()
							.build()
					: new MagicValidatorUtil((this.validationsReference.tpreference = []), undefined).build(),

				description: this.descriptionFlag
					? new MagicValidatorUtil((this.validationsReference.description = []), undefined)
							.required()
							.build()
					: new MagicValidatorUtil((this.validationsReference.description = []), undefined).build(),
				tel: new MagicValidatorUtil(
					(this.validationsReference[this.fieldTel] = []),
					undefined,
				).build(),
				telFormSearch: new MagicValidatorUtil(
					(this.validationsReference['telFormSearch'] = []),
					undefined,
				).build(),
				social: new MagicValidatorUtil(
					(this.validationsReference[this.fieldSocial] = []),
					undefined,
				).build(),
				socialFormSearch: new MagicValidatorUtil(
					(this.validationsReference['socialFormSearch'] = []),
					undefined,
				).build(),
				val: new MagicValidatorUtil((this.validationsReference[this.fieldVal] = []), undefined)
					.required()
					.build(),
			});
		} else {
			this.form = this.fb.group({
				tpreference: new MagicValidatorUtil(
					(this.validationsReference.tpreference = []),
					undefined,
				).build(),
				description: new MagicValidatorUtil(
					(this.validationsReference.description = []),
					undefined,
				).build(),
				tel: new MagicValidatorUtil(
					(this.validationsReference[this.fieldTel] = []),
					undefined,
				).build(),
				telFormSearch: new MagicValidatorUtil(
					(this.validationsReference['telFormSearch'] = []),
					undefined,
				).build(),
				social: new MagicValidatorUtil(
					(this.validationsReference[this.fieldSocial] = []),
					undefined,
				).build(),
				socialFormSearch: new MagicValidatorUtil(
					(this.validationsReference['socialFormSearch'] = []),
					undefined,
				).build(),
				val: new MagicValidatorUtil(
					(this.validationsReference[this.fieldVal] = []),
					undefined,
				).build(),
			});
		}
	}
	manageFields() {
		if (!this.validationsReference) {
			this.validationsReference = {};
		}
		if (!this.form) {
			this.setForm();
		} else {
			this.form.addControl(
				'tpreference',
				this.required
					? new MagicValidatorUtil((this.validationsReference.tpreference = []), undefined)
							.required()
							.buildControl()
					: new MagicValidatorUtil(
							(this.validationsReference.tpreference = []),
							undefined,
					  ).buildControl(),
			);
			this.form.addControl(
				'description',
				this.required
					? new MagicValidatorUtil((this.validationsReference.description = []), undefined)
							.required()
							.buildControl()
					: new MagicValidatorUtil(
							(this.validationsReference.description = []),
							undefined,
					  ).buildControl(),
			);

			this.form.addControl(
				'telFormSearch',
				new MagicValidatorUtil(
					(this.validationsReference.telFormSearch = []),
					undefined,
				).buildControl(),
			);
			this.form.addControl(
				'socialFormSearch',
				new MagicValidatorUtil(
					(this.validationsReference.socialFormSearch = []),
					undefined,
				).buildControl(),
			);
		}

		this.tpReferenceFormField = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get('tpreference') as FormControl,
			'APP.LABEL.CONTACTREFERENCE.TYPE',
		)
			.validation(this.validationsReference.tpaddress)
			.onInit();

		this.descriptionFormField = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('description') as FormControl,
			'APP.LABEL.CONTACTREFERENCE.DESCRIPTION',
		)
			.validation(this.validationsReference.description)
			.onInit();

		this.telFormField = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get(this.fieldTel) as FormControl,
			'APP.LABEL.CONTACTREFERENCE.TEL',
		)
			.validation(this.validationsReference[this.fieldTel])
			.onInit();

		this.telFormSearch = new FormFieldModel(
			EnumFormType.SEARCH,
			this.form.get('telFormSearch') as FormControl,
			'APP.LABEL.CONTACTREFERENCE.TEL',
		)
			.validation(this.validationsReference['telFormSearch'])
			.onInit();

		this.socialFormField = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get(this.fieldSocial) as FormControl,
			'APP.LABEL.CONTACTREFERENCE.SOCIAL',
		)
			.validation(this.validationsReference[this.fieldSocial])
			.onInit();

		this.socialFormSearch = new FormFieldModel(
			EnumFormType.SEARCH,
			this.form.get('socialFormSearch') as FormControl,
			'APP.LABEL.CONTACTREFERENCE.SOCIAL',
		)
			.validation(this.validationsReference['socialFormSearch'])
			.onInit();

		this.valFormField = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get(this.fieldVal) as FormControl,
			'APP.LABEL.CONTACTREFERENCE.VAL',
		)
			.validation(this.validationsReference[this.fieldVal])
			.onInit();
	}

	// BASE - REFERENCE
	fnChangeTel(tel: any) {}
	fnChangeSocial(social: any) {}

	// prefix
	fnTels(): Observable<NationModel[]> {
		const paginator: RequestPaginatorInterface = {
			filters: [],
			orders: [
				{ key: 'priority', value: 'desc' },
				// { key: 'continent = "EU"', value: 'desc' },
				{ key: 'name', value: 'asc' },
			],
			paginate: undefined,
		};
		const conditions: RequestConditionInterface = {
			belongs: undefined,
			virtualfields: undefined,
			flags: this.flgHtmlPrefix ? undefined : ['avoidContent'],
		};
		return this.nationService
			.paginate(paginator, conditions, { storage: { flgEval: true, name: 'ADDRESS_NATIONS' } })
			.pipe(
				map((paginatorModel) => {
					this.loadedPrefix = true;
					return paginatorModel ? paginatorModel.list.filter((el) => el.tel) : [];
				}),
			);
	}

	behaviourTels(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: NationModel[]) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	decodeTelToOptionList(nation: NationModel): OptionListModel {
		let content = nation.tel;
		if (this.flgHtmlPrefix) {
			const img =
				'<img src="' + nation.iconimage + '" class="img-fluid select-image-icon language-image" />';
			content = img + '<span class="ml-2">' + nation.tel + '</span>';
		}
		const option = new OptionListModel(nation.tel, content, nation);
		option.textClear = nation.tel;
		return option;
	}

	fnSocials(): Observable<TypologicalModel[]> {
		const paginator: RequestPaginatorInterface = {
			filters: [],
			orders: [{ key: 'title', value: 'asc' }],
			paginate: undefined,
		};
		const conditions: RequestConditionInterface = {
			belongs: undefined,
			virtualfields: undefined,
			flags: this.flgHtmlSocial ? undefined : ['avoidContent'],
		};
		return this.contactreferenceService.tpsocialreference(paginator, conditions).pipe(
			map((res) => {
				this.loadedSocial = true;
				return res;
			}),
		);
	}
	behaviourSocials(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: NationModel[]) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	decodeSocialToOptionList(social: TypologicalModel): OptionListModel {
		let content = social.title;
		if (this.flgHtmlSocial) {
			content = social.titleHtml();
		}
		const option = new OptionListModel(social.id, content, social);
		option.textClear = social.title;
		return option;
	}
	getReferenceValueForTel(reference: ContactreferenceModel) {
		return reference ? reference.prefix : undefined;
	}
	getReferenceValueForSocial(reference: ContactreferenceModel) {
		return reference && reference.tpsocialreference ? reference.tpsocialreference.id : undefined;
	}
	getReferenceValueForVal(reference: ContactreferenceModel) {
		return reference ? reference.val : undefined;
	}

	exportReference(form?: FormGroup): ContactreferenceModel {
		if (!form) {
			form = this.form;
		}
		const model = new ContactreferenceModel();
		model.id = this.reference ? this.reference.id : undefined;
		model.cod = this.reference ? this.reference.cod : undefined;
		model.val = this.fieldVal ? form.get(this.fieldVal).value : undefined;
		model.description = this.fieldDescription ? form.get(this.fieldDescription).value : undefined;
		model.tpcontactreference = new TypologicalModel();
		model.tpcontactreference.id = this.fieldTpreference
			? form.get(this.fieldTpreference).value
			: undefined;
		model.tpsocialreference = new TypologicalModel();
		model.tpsocialreference.id = this.fieldSocial ? form.get(this.fieldSocial).value : undefined;
		model.prefix = this.fieldTel ? form.get(this.fieldTel).value : undefined;

		return model;
	}

	fillReference(reference: ContactreferenceModel) {
		if (this.form && reference) {
			this.form.get(this.fieldVal).setValue(reference.val);
			this.form.get(this.fieldDescription).setValue(reference.description);
			this.form
				.get(this.fieldTpreference)
				.setValue(reference.tpcontactreference ? reference.tpcontactreference.id : undefined);
			this.form.get(this.fieldTel).setValue(reference.prefix);
			this.form
				.get(this.fieldSocial)
				.setValue(reference.tpsocialreference ? reference.tpsocialreference.id : undefined);
		}
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'InputReferenceComponent';
	}
}

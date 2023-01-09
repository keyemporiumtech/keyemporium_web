import { Component, Input, ViewChild } from '@angular/core';
import {
	BaseFormComponent,
	ApplicationLoggerService,
	MagicValidatorUtil,
	OptionListModel,
	BehaviourObserverModel,
	ApplicationStorageService,
} from '@ddc/kit';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MultilanguageService } from '../../services/multilanguage.service';
import { Subscription, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';
import { MultilanguageModel } from '../../models/multilanguage.model';
import { DbFilterInterface } from '../../../api/cakeutils/interfaces/db-filter.interface';
import { environment } from '../../../../../environments/environment';
import { ApiFast } from '../../../api/cakeutils/utility/api-fast.utility';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { InputSelectComponent } from '../../../../shared/form/input-select/input-select.component';
import { QueryUtility } from '@ddc/rest';

@Component({
	selector: 'ddc-init-input-multilanguage',
	templateUrl: './input-multilanguage.component.html',
	styleUrls: ['./input-multilanguage.component.scss'],
})
export class InputMultilanguageComponent extends BaseFormComponent {
	@Input() showImage: boolean;
	@Input() idIn: string;
	@Input() keys: { table: string; field: string; objraw: string; language?: string; type?: string };
	@Input() languagesAvailable: string[];
	// style
	@Input() languagesSettedStyle: any;
	@Input() languagesSettedClass: any;
	@ViewChild('languages', { static: false }) languages: InputSelectComponent;
	optionsLanguages: OptionListModel[];
	languagesSetted: string[];
	contentField: FormFieldModel;
	languageField: FormFieldModel;
	ready: boolean = false;

	// sub
	subLanguages: Subscription;
	subLanguagecod: Subscription;
	subAfterSave: Subscription;
	subDelete: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private applicationStorage: ApplicationStorageService,
		private multilanguageService: MultilanguageService,
		private languageService: LanguageService,
	) {
		super(applicationLogger, fb);
		this.showImage = true;
		this.optionsLanguages = [];
		this.languagesSetted = [];
		this.languagesAvailable = environment.default.languages;
		this.languagesSettedStyle = { 'background-color': 'yellow' };
	}

	getForm(): FormGroup {
		return this.fb.group({
			tablename: new MagicValidatorUtil((this.validationMessages.tablename = []), undefined)
				.required()
				.build(),
			fieldname: new MagicValidatorUtil((this.validationMessages.fieldname = []), undefined)
				.required()
				.build(),
			content: new MagicValidatorUtil((this.validationMessages.content = []), undefined)
				.required()
				.build(),
			languagecod: new MagicValidatorUtil((this.validationMessages.languagecod = []), undefined)
				.required()
				.build(),
		});
	}

	getValidationMessages() {
		return {};
	}
	setValueChanges() {}

	setLoader() {
		// manage default language
		if (this.keys && !this.keys.language) {
			this.keys.language = this.applicationStorage.language.get();
		}
	}

	setLoaderAsync(): Observable<boolean> {
		// avoid if yet loaded
		if (
			this.languagesSetted &&
			this.languagesSetted.length &&
			this.optionsLanguages &&
			this.optionsLanguages.length
		) {
			return of(true);
		}
		// load languages
		const filters: DbFilterInterface[] = [];
		if (this.languagesAvailable && this.languagesAvailable.length) {
			filters.push(ApiFast.queryField('cod', this.languagesAvailable));
		}

		this.optionsLanguages.length = 0;
		return this.languageService
			.paginate({ filters: filters, orders: [{ key: 'cod', value: 'asc' }], paginate: undefined })
			.pipe(
				switchMap((paginatorModel) => {
					const languages = paginatorModel ? paginatorModel.list : [];
					let title;
					languages.forEach((language) => {
						title = this.showImage
							? language.imgHtml({ cssClass: 'img-fluid', cssStyle: 'width: 1.5rem' })
							: language.title;
						this.optionsLanguages.push(new OptionListModel(language.cod, title, language));
					});
					return !this.keys
						? of(true)
						: this.multilanguageService
								.tplanguagesfield(this.keys.table, this.keys.field, this.keys.objraw)
								.pipe(
									map((data) => {
										this.languagesSetted = data;
										this.manageStyleSetted();
										return true;
									}),
								);
				}),
			);
	}

	getModelFieldForId(): string {
		return 'id';
	}

	setModel(): Observable<MultilanguageModel> {
		let $obsModel: Observable<MultilanguageModel>;
		if (this.idIn) {
			$obsModel = this.multilanguageService.unique(
				this.idIn,
				undefined,
				undefined,
				QueryUtility.SKIP_ERROR_RES,
			);
		} else {
			$obsModel = this.multilanguageService.uniqueByField(
				this.keys.table,
				this.keys.field,
				this.keys.objraw,
				undefined,
				this.keys.language,
				undefined,
				undefined,
				QueryUtility.SKIP_ERROR_RES,
			);
		}
		return $obsModel.pipe(
			switchMap((res) => {
				this.idIn = undefined;
				const model = res ? res : new MultilanguageModel();
				if (!res) {
					model.tablename = this.keys.table;
					model.fieldname = this.keys.field;
					model.objraw = this.keys.objraw;
					model.languagecod = this.keys.language;
					model.type = this.keys.type;
				}
				this.keys = {
					table: model.tablename,
					field: model.fieldname,
					objraw: model.objraw,
					language: model.languagecod,
					type: model.type,
				};

				return this.languagesSetted.length
					? of(model)
					: this.multilanguageService
							.tplanguagesfield(this.keys.table, this.keys.field, this.keys.objraw)
							.pipe(
								map((data) => {
									this.languagesSetted = data;
									this.manageStyleSetted();
									return model;
								}),
							);
			}),
		);
	}
	fillForm(form: FormGroup, model: MultilanguageModel) {
		form.get('tablename').setValue(model.tablename);
		form.get('fieldname').setValue(model.fieldname);
		form.get('content').setValue(model.content);
		this.languages.selectItem(this.optionsLanguages.find((el) => el.key === model.languagecod));
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: MultilanguageModel) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: MultilanguageModel) {}

	extractData(): MultilanguageModel {
		const values = this.form.getRawValue();
		const model = new MultilanguageModel();
		model.tablename = values.tablename;
		model.fieldname = values.fieldname;
		model.content = values.content;
		model.languagecod = values.languagecod;
		model.objraw = this.model ? this.model.objraw : undefined;
		model.type = this.model ? this.model.type : undefined;
		model.id = this.idModel;
		return model;
	}

	saveModel(model: MultilanguageModel): Observable<string> {
		return this.multilanguageService.save(model);
	}
	updateModel(model: MultilanguageModel): Observable<string> {
		return this.multilanguageService.edit(model, model.id);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: string) => {
			this.idModel = res;
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterSave(res: string) {
		if (this.keys) {
			this.subAfterSave = this.multilanguageService
				.tplanguagesfield(this.keys.table, this.keys.field, this.keys.objraw)
				.subscribe((data) => {
					this.languagesSetted = data;
					this.manageStyleSetted();
				});
		}
	}

	ngOnInitForChildren() {
		this.contentField = new FormFieldModel(
			EnumFormType.TEXTAREA,
			this.form.get('content') as FormControl,
			'',
		)
			.validation(this.validationMessages.content)
			.onInit();

		this.languageField = new FormFieldModel(
			this.showImage ? EnumFormType.SELECT_DIV : EnumFormType.SELECT,
			this.form.get('languagecod') as FormControl,
			'APP.LABEL.LANGUAGE',
		)
			.validation(this.validationMessages.languagecod)
			.onInit();

		this.ready = true;
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subLanguagecod) {
			this.subLanguagecod.unsubscribe();
		}
		if (this.subLanguages) {
			this.subLanguages.unsubscribe();
		}
		if (this.subAfterSave) {
			this.subAfterSave.unsubscribe();
		}
		if (this.subDelete) {
			this.subDelete.unsubscribe();
		}
	}
	getClassName(): string {
		return 'InputMultilanguageComponent';
	}

	// adding
	manageChange(value: string) {
		if (value && value !== this.keys.language) {
			this.keys.language = value;
			this.subLanguagecod = this.setModel().subscribe((model) => {
				this.model = model;
			});
		}
	}
	private manageStyleSetted() {
		if (
			this.languagesSetted &&
			this.languagesSetted.length &&
			this.optionsLanguages &&
			this.optionsLanguages.length
		) {
			for (let i = 0; i < this.optionsLanguages.length; i++) {
				const current = this.optionsLanguages[i];
				if (this.languagesSetted.includes(current.key)) {
					this.optionsLanguages[i].cssStyle = this.languagesSettedStyle;
					this.optionsLanguages[i].cssClass = this.languagesSettedClass;
				} else {
					this.optionsLanguages[i].cssStyle = undefined;
					this.optionsLanguages[i].cssClass = undefined;
				}
			}
		}
	}

	deleteRecord() {
		this.startLoading();
		this.subDelete = this.multilanguageService
			.delete(
				this.idModel,
				undefined,
				QueryUtility.fnResponseManager(
					undefined,
					QueryUtility.FN_ERROR(() => {
						this.stopLoading();
					}),
					QueryUtility.SKIP_ERROR_RES,
				),
			)
			.pipe(
				switchMap((res) => {
					return !this.keys
						? of(res)
						: this.multilanguageService
								.tplanguagesfield(this.keys.table, this.keys.field, this.keys.objraw)
								.pipe(
									map((data) => {
										this.languagesSetted = data;
										this.manageStyleSetted();
										return res;
									}),
								);
				}),
			)
			.subscribe(
				(result) => {
					this.manageChange(this.languagesSetted[0]);
					this.stopLoading();
				},
				(err) => {
					this.stopLoading();
				},
			);
	}
}

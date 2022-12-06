import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import {
	BaseComponent,
	ApplicationLoggerService,
	OptionListModel,
	MagicValidatorUtil,
	StringTranslate,
} from '@ddc/kit';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { Subscription, Observable } from 'rxjs';
import { LanguageSystemService } from '../../base/language-system.service';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { InputSelectComponent } from '../../../../shared/form/input-select/input-select.component';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
	selector: 'ddc-init-app-languages',
	templateUrl: './app-languages.component.html',
	styleUrls: ['./app-languages.component.scss'],
})
export class AppLanguagesComponent extends BaseComponent {
	@Input() showImage: boolean;
	@Input() filters: string[];
	@Output() changeEmit: EventEmitter<string> = new EventEmitter<string>();

	@Input() label: string | StringTranslate;
	@Input() showLabel: boolean = true;
	@Input() hideArrows: boolean = false;
	@ViewChild('languages', { static: false }) languages: InputSelectComponent;

	formLanguage: FormGroup;
	validations: any = {};
	selectLanguages: FormFieldModel;
	optionLanguages: OptionListModel[];

	// sub
	subLanguages: Subscription;
	subChangeLanguages: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private languageSystemService: LanguageSystemService,
	) {
		super(applicationLogger);
		this.showImage = true;
		this.filters = undefined;
		this.optionLanguages = [];
		// build form
		this.formLanguage = this.fb.group({
			language: new MagicValidatorUtil((this.validations.language = []), undefined)
				.required()
				.build(),
		});
	}

	ngOnInitForChildren() {
		const $obsLanguages = this.showImage
			? this.languageSystemService.languagesHTML(this.filters)
			: this.languageSystemService.languages(this.filters);
		this.subLanguages = $obsLanguages.subscribe((res) => {
			this.optionLanguages = res;
		});
		// creation form
		this.selectLanguages = new FormFieldModel(
			this.showImage ? EnumFormType.SELECT_DIV : EnumFormType.SELECT,
			this.formLanguage.get('language') as FormControl,
			this.label ? this.label : 'APP.LABEL.LANGUAGE',
		)
			.validation(this.validations.language)
			.onInit();

		// manage change
		this.subChangeLanguages = this.formLanguage
			.get('language')
			.valueChanges.pipe(distinctUntilChanged())
			.pipe(
				switchMap((language) => {
					return this.setupAndReload(language);
				}),
			)
			.subscribe((resp) => {
				this.optionLanguages.length = 0;
				this.optionLanguages = resp.options;
				if (this.languages) {
					this.languages.setOnlySelectedOption(
						this.optionLanguages.find((el) => el.key === resp.selected),
					);
				}
			});
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subLanguages) {
			this.subLanguages.unsubscribe();
		}
		if (this.subChangeLanguages) {
			this.subChangeLanguages.unsubscribe();
		}
	}
	getClassName(): string {
		return 'AppLanguagesComponent';
	}

	private setupAndReload(
		language: string,
	): Observable<{ selected: string; options: OptionListModel[] }> {
		const $obsLanguagesReload = this.showImage
			? this.languageSystemService.languagesHTML(this.filters)
			: this.languageSystemService.languages(this.filters);
		return this.languageSystemService.setupLanguage(language).pipe(
			switchMap((data) => {
				this.changeEmit.emit(language);
				return $obsLanguagesReload.pipe(
					map((resp) => {
						return { selected: language, options: resp };
					}),
				);
			}),
		);
	}

	// utils
	selectByCod(cod: string) {
		const language = this.optionLanguages.find((el) => el.key === cod);
		if (language && this.languages) {
			this.languages.selectItem(language);
		}
	}
	select(language: OptionListModel) {
		const index = this.optionLanguages.findIndex((el) => el.key === language.key);
		if (index !== -1 && this.languages) {
			this.languages.selectItem(language);
		}
	}
}

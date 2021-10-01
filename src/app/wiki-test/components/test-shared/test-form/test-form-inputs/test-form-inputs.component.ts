import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
	CustomValidators,
	CustomValidatorsMessages,
	DateModel,
	DateValidators,
	DateValidatorsMessages,
	EnumSizeFormat,
	EnumTypeMime,
	FileEmbedModel,
	FileService,
	MagicValidatorUtil,
	OptionListModel,
	TranslateUtility,
} from '@ddc/kit';
import { TranslateService } from '@ngx-translate/core';
import { of, Subscription } from 'rxjs';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';

@Component({
	selector: 'wiki-test-form-inputs',
	templateUrl: './test-form-inputs.component.html',
	styleUrls: ['./test-form-inputs.component.scss'],
})
export class TestFormInputsComponent implements OnInit, OnDestroy {
	EnumSizeFormat = EnumSizeFormat;
	fileService: FileService;
	translate: TranslateService;
	fb: FormBuilder;
	form1: FormGroup;
	validations: any;
	validationsAV: any = {};
	// TEXT
	text1: FormFieldModel;
	number1: FormFieldModel;
	number2: FormFieldModel;
	decimal1: FormFieldModel;
	decimal2: FormFieldModel;
	decimal3: FormFieldModel;
	decimal4: FormFieldModel;
	currency1: FormFieldModel;
	// SELECT
	select1: FormFieldModel;
	select2: FormFieldModel;
	select3: FormFieldModel;
	select4: FormFieldModel;
	select5: FormFieldModel;
	check1: FormFieldModel;
	check2: FormFieldModel;
	check3: FormFieldModel;
	check4: FormFieldModel;
	radio1: FormFieldModel;
	radio2: FormFieldModel;
	radio3: FormFieldModel;
	radio4: FormFieldModel;
	optionSingle: OptionListModel[];
	optionList: OptionListModel[];
	optionListHTML: OptionListModel[];
	// date
	date1: FormFieldModel;
	date2: FormFieldModel;
	date3: FormFieldModel;
	date4: FormFieldModel;
	date5: FormFieldModel;
	date6: FormFieldModel;
	// TEXTAREA
	textarea1: FormFieldModel;
	// FILE
	showFiles: boolean;
	embedFile: FileEmbedModel;
	subFile: Subscription;
	file1: FormFieldModel;
	file2: FormFieldModel;
	// AUTOCOMPLETE
	autocomplete1: FormFieldModel;
	autocomplete2: FormFieldModel;
	searchList: OptionListModel[];
	listAutocomplete1: OptionListModel[];
	optionItem: OptionListModel;
	// PHONE
	phone1: FormFieldModel;
	phone2: FormFieldModel;
	optionsPrefix: OptionListModel[];
	optionsPrefixHtml: OptionListModel[];
	// EMAIL
	email1: FormFieldModel;
	// COLOR
	color1: FormFieldModel;
	// PASSWORD
	password1: FormFieldModel;
	password2: FormFieldModel;
	// AUTOMATIC VALIDATION
	text1AV: FormFieldModel;
	text2AV: FormFieldModel;
	number1AV: FormFieldModel;
	decimal1AV: FormFieldModel;

	constructor(fb: FormBuilder, fileService: FileService, translate: TranslateService) {
		this.fileService = fileService;
		this.fb = fb;
		this.translate = translate;

		this.form1 = this.fb.group({
			text1: [undefined, [Validators.required]],
			number1: [undefined, [Validators.required]],
			number2: [undefined, [Validators.required, Validators.min(2), Validators.max(6)]],
			decimal1: [undefined, [Validators.required]],
			decimal2: [undefined, [Validators.required, Validators.min(2), Validators.max(6)]],
			decimal3: [
				undefined,
				[
					Validators.required,
					Validators.min(2.05),
					Validators.max(12.15),
					CustomValidators.isDoublePrecision,
				],
			],
			decimal4: [
				undefined,
				[
					Validators.required,
					Validators.min(2.05),
					Validators.max(12.15),
					CustomValidators.isSpecificPrecision(3),
				],
			],
			currency1: [undefined, [Validators.required, CustomValidators.isDoublePrecision]],
			select1: [undefined, [Validators.required]],
			select2: [undefined, [Validators.required]],
			select3: [undefined, [Validators.required]],
			select4: [undefined, [Validators.required]],
			select5: [undefined, [Validators.required]],
			check1: [undefined, [Validators.required]],
			check2: [undefined, [Validators.required]],
			check3: [undefined, [Validators.required]],
			check4: [undefined, [Validators.required]],
			radio1: [undefined, [Validators.required]],
			radio2: [undefined, [Validators.required]],
			radio3: [undefined, [Validators.required]],
			radio4: [undefined, [Validators.required]],
			date1: [undefined, [Validators.required]],
			date2: [undefined, [Validators.required]],
			date3: [
				undefined,
				[
					Validators.required,
					DateValidators.mustBeLessOrEqualThan(new DateModel('2020-10-29')),
					DateValidators.mustBeGreaterOrEqualThan(new DateModel('2020-10-20')),
				],
			],
			date4: [undefined, [Validators.required]],
			date5: [undefined, [Validators.required]],
			date6: [
				undefined,
				[
					Validators.required,
					DateValidators.mustBeLessOrEqualThan(new DateModel('2020-10-29 00:01:00')),
					DateValidators.mustBeGreaterOrEqualThan(new DateModel('2020-10-20 23:59:00')),
				],
			],
			textarea1: [undefined, [Validators.required]],
			file1: new MagicValidatorUtil((this.validationsAV.file1AV = []), undefined)
				.required()
				.build(),
			file2: new MagicValidatorUtil((this.validationsAV.file2AV = []), undefined)
				.required()
				.build(),
			text1AV: [undefined, [Validators.required, CustomValidators.isInteger, Validators.min(5)]],
			text2AV: [undefined, [Validators.required, CustomValidators.isInteger]],
			number1AV: new MagicValidatorUtil((this.validationsAV.number1AV = []), undefined)
				.required()
				.build(),
			decimal1AV: new MagicValidatorUtil((this.validationsAV.decimal1AV = []), undefined)
				.required()
				.build(),
			autocomplete1: [undefined, [Validators.required]],
			autocomplete2: [undefined, [Validators.required]],
			phone1: [undefined, [Validators.required]],
			phone2: [undefined, [Validators.required]],
			email1: [undefined, [Validators.required]],
			color1: [undefined, [Validators.required]],
			password1: [undefined, [Validators.required]],
			password2: [undefined, [Validators.required]],
		});
		this.validations = {
			campo1: [
				{
					type: 'required',
					message: 'VALIDATION.REQUIRED',
				},
			],
			campo2: [
				{
					type: 'required',
					message: 'VALIDATION.REQUIRED',
				},
				{
					type: 'min',
					message: 'VALIDATION.NUMBER.MIN',
					params: { min: 2 },
				},
				{
					type: 'max',
					message: 'VALIDATION.NUMBER.MAX',
					params: { max: 6 },
				},
			],
			campo3: [
				{
					type: 'required',
					message: 'VALIDATION.REQUIRED',
				},
				{
					type: 'min',
					message: 'VALIDATION.NUMBER.MIN',
					params: { min: 2.05 },
				},
				{
					type: 'max',
					message: 'VALIDATION.NUMBER.MAX',
					params: { max: 12.15 },
				},
				CustomValidatorsMessages.IS_DOUBLE_PRECISION(),
			],
			campo4: [
				{
					type: 'required',
					message: 'VALIDATION.REQUIRED',
				},
				{
					type: 'min',
					message: 'VALIDATION.NUMBER.MIN',
					params: { min: 2.05 },
				},
				{
					type: 'max',
					message: 'VALIDATION.NUMBER.MAX',
					params: { max: 12.15 },
				},
				CustomValidatorsMessages.IS_SPECIFIC_PRECISION(3),
			],
			campo5: [
				{
					type: 'required',
					message: 'VALIDATION.REQUIRED',
				},
				DateValidatorsMessages.MUST_BE_GREATER_OR_EQUAL_THAN('20/10/2020 00:01:00'),
				DateValidatorsMessages.MUST_BE_LESS_OR_EQUAL_THAN('29/10/2020 23:59:00'),
			],
			campo6: [
				{
					type: 'required',
					message: 'VALIDATION.REQUIRED',
				},
				CustomValidatorsMessages.IS_INTEGER(),
				CustomValidatorsMessages.MIN(5),
			],
			campo7: [
				{
					type: 'required',
					message: 'VALIDATION.REQUIRED',
				},
				CustomValidatorsMessages.IS_INTEGER(),
			],
		};
		this.initText();
		this.initSelects();
		this.initCheckbox();
		this.initRadio();
		this.initDate();
		this.initTextarea();
		this.initFile();
		this.initAutocomplete();
		this.initPhone();
		this.initEmail();
		this.initColor();
		this.initPassword();
		this.initAutomaticValidation();
	}

	ngOnInit() {}

	ngOnDestroy(): void {
		if (this.subFile) {
			this.subFile.unsubscribe();
		}
	}

	// INIT
	initText() {
		this.text1 = new FormFieldModel(
			EnumFormType.TEXT,
			this.form1.get('text1') as FormControl,
			'Text semplice',
		)
			.validation(this.validations.campo1)
			.onInit();

		// NUMBER
		this.number1 = new FormFieldModel(
			EnumFormType.NUMBER,
			this.form1.get('number1') as FormControl,
			'Numero',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.number2 = new FormFieldModel(
			EnumFormType.NUMBER,
			this.form1.get('number2') as FormControl,
			'Numero con minimo e massimo',
		)
			.validation(this.validations.campo2)
			.onInit();

		// DECIMAL
		this.decimal1 = new FormFieldModel(
			EnumFormType.DECIMAL,
			this.form1.get('decimal1') as FormControl,
			'Decimale',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.decimal2 = new FormFieldModel(
			EnumFormType.DECIMAL,
			this.form1.get('decimal2') as FormControl,
			'Decimale con minimo e massimo',
		)
			.validation(this.validations.campo2)
			.onInit();

		this.decimal3 = new FormFieldModel(
			EnumFormType.DECIMAL,
			this.form1.get('decimal3') as FormControl,
			'Decimale con 2 digits',
		)
			.validation(this.validations.campo3)
			.onInit();

		this.decimal4 = new FormFieldModel(
			EnumFormType.DECIMAL,
			this.form1.get('decimal4') as FormControl,
			'Decimale con 3 digits',
		)
			.validation(this.validations.campo4)
			.onInit();

		this.currency1 = new FormFieldModel(
			EnumFormType.CURRENCY,
			this.form1.get('currency1') as FormControl,
			'Currency',
		)
			.validation(this.validations.campo3)
			.onInit();
	}

	initSelects() {
		this.optionSingle = [new OptionListModel(1, 'Primo')];
		this.optionList = [
			new OptionListModel(1, 'Primo'),
			new OptionListModel(2, 'Secondo'),
			new OptionListModel(3, 'Terzo'),
		];

		this.optionListHTML = [
			new OptionListModel(1, '<span class="fa fa-user mr-2"></span>Primo'),
			new OptionListModel(2, '<span class="fa fa-cog mr-2"></span>Secondo'),
			new OptionListModel(3, '<span class="fa fa-edit mr-2"></span>Terzo'),
		];

		this.select1 = new FormFieldModel(
			EnumFormType.SELECT,
			this.form1.get('select1') as FormControl,
			'Select semplice',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.select2 = new FormFieldModel(
			EnumFormType.SELECT,
			this.form1.get('select2') as FormControl,
			'Select multipla',
		)
			.validation(this.validations.campo1)
			.onInit();

		// DIV
		this.select3 = new FormFieldModel(
			EnumFormType.SELECT_DIV,
			this.form1.get('select3') as FormControl,
			'Select semplice html',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.select4 = new FormFieldModel(
			EnumFormType.SELECT_DIV,
			this.form1.get('select4') as FormControl,
			'Select multipla html',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.select5 = new FormFieldModel(
			EnumFormType.SELECT_DIV,
			this.form1.get('select5') as FormControl,
			'Select multipla con maxSelectedView',
		)
			.validation(this.validations.campo1)
			.onInit();
	}

	initCheckbox() {
		this.check1 = new FormFieldModel(
			EnumFormType.CHECKBOX,
			this.form1.get('check1') as FormControl,
			'Checkbox singola',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.check2 = new FormFieldModel(
			EnumFormType.CHECKBOX,
			this.form1.get('check2') as FormControl,
			'Checkbox multipla',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.check3 = new FormFieldModel(
			EnumFormType.CHECKBOX,
			this.form1.get('check3') as FormControl,
			'Checkbox multipla in HTML',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.check4 = new FormFieldModel(
			EnumFormType.CHECKBOX,
			this.form1.get('check4') as FormControl,
			'Checkbox multipla horizontal',
		)
			.validation(this.validations.campo1)
			.onInit();
	}

	initRadio() {
		this.radio1 = new FormFieldModel(
			EnumFormType.RADIO,
			this.form1.get('radio1') as FormControl,
			'Radio Singola',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.radio2 = new FormFieldModel(
			EnumFormType.RADIO,
			this.form1.get('radio2') as FormControl,
			'Radio Multipla',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.radio3 = new FormFieldModel(
			EnumFormType.RADIO,
			this.form1.get('radio3') as FormControl,
			'Radio Multipla HTML',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.radio4 = new FormFieldModel(
			EnumFormType.RADIO,
			this.form1.get('radio4') as FormControl,
			'Radio Multipla horizontal',
		)
			.validation(this.validations.campo1)
			.onInit();
	}

	initDate() {
		this.date1 = new FormFieldModel(
			EnumFormType.DATE,
			this.form1.get('date1') as FormControl,
			'Data',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.date2 = new FormFieldModel(
			EnumFormType.DATE,
			this.form1.get('date2') as FormControl,
			'Data con Timezone',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.date3 = new FormFieldModel(
			EnumFormType.DATE,
			this.form1.get('date3') as FormControl,
			'Data con Min, Max e Step',
		)
			.validation(this.validations.campo5)
			.onInit();
		// TIME
		this.date4 = new FormFieldModel(
			EnumFormType.DATE,
			this.form1.get('date4') as FormControl,
			'Data Time',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.date5 = new FormFieldModel(
			EnumFormType.DATE,
			this.form1.get('date5') as FormControl,
			'Data Time con Timezone',
		)
			.validation(this.validations.campo1)
			.onInit();

		this.date6 = new FormFieldModel(
			EnumFormType.DATE,
			this.form1.get('date6') as FormControl,
			'Data Time con Min, Max e Step',
		)
			.validation(this.validations.campo5)
			.onInit();
	}

	initTextarea() {
		this.textarea1 = new FormFieldModel(
			EnumFormType.TEXTAREA,
			this.form1.get('textarea1') as FormControl,
			'Textarea semplice',
		)
			.validation(this.validations.campo1)
			.onInit();
	}

	initFile() {
		this.embedFile = this.fileService.buildFileEmbed(
			'test PDF',
			'application/pdf',
			EnumTypeMime.APPLICATION,
			'pdf',
			undefined,
			'assets/test/pdf/test.pdf',
		);
		this.subFile = this.fileService.setSizeFileEmbedModel(this.embedFile).subscribe((data) => {
			this.embedFile = data;
		});
		this.file1 = new FormFieldModel(
			EnumFormType.FILE,
			this.form1.get('file1') as FormControl,
			'File semplice',
		)
			.validation(this.validationsAV.file1AV)
			.onInit();

		this.file2 = new FormFieldModel(
			EnumFormType.FILE,
			this.form1.get('file2') as FormControl,
			'File con validazioni (estensioni pdf, doc e dimensione 1MB)',
		)
			.validation(this.validationsAV.file2AV)
			.onInit();
	}

	initAutocomplete() {
		this.optionItem = new OptionListModel(1, 'primo');
		this.searchList = [
			new OptionListModel(1, 'primo'),
			new OptionListModel(2, 'secondo'),
			new OptionListModel(3, 'terzo'),
			new OptionListModel(4, 'quarto'),
			new OptionListModel(5, 'quinto'),
			new OptionListModel(6, 'sesto'),
			new OptionListModel(7, 'settimo'),
			new OptionListModel(8, 'ottavo'),
			new OptionListModel(9, 'nono'),
		];

		this.listAutocomplete1 = [];

		this.autocomplete1 = new FormFieldModel(
			EnumFormType.SEARCH,
			this.form1.get('autocomplete1') as FormControl,
			'Input Autocomplete con emitters',
		)
			.validation([...this.validations.campo1])
			.onInit();

		this.autocomplete2 = new FormFieldModel(
			EnumFormType.SEARCH,
			this.form1.get('autocomplete2') as FormControl,
			'Input Autocomplete con funzione search',
		)
			.validation([...this.validations.campo1])
			.onInit();
	}
	searchAutocomplete(term: string) {
		this.listAutocomplete1 = this.searchList.filter((el) => {
			const desc: string = TranslateUtility.get(el.text, this.translate);
			return desc.startsWith(term);
		});
	}
	selectAutocomplete(item: OptionListModel) {
		alert(
			'hai selezionato il record con chiave ' +
				item.key +
				' e testo ' +
				TranslateUtility.get(item.text, this.translate),
		);
	}
	fnSearchAutocomplete = (term: string) => {
		const list = this.searchList.filter((el) => {
			const desc: string = TranslateUtility.get(el.text, this.translate);
			return desc.startsWith(term);
		});
		return of(list);
	};

	initPhone() {
		this.optionsPrefix = [new OptionListModel('+39', '+39'), new OptionListModel('+41', '+41')];
		this.optionsPrefixHtml = [
			new OptionListModel('+39', '<span class="fa fa-flag mr-2"></span>+39'),
			new OptionListModel('+41', '<span class="fa fa-flag mr-2"></span>+41'),
		];

		this.phone1 = new FormFieldModel(
			EnumFormType.PHONE,
			this.form1.get('phone1') as FormControl,
			'Input Phone',
		)
			.validation([...this.validations.campo1])
			.onInit();

		this.phone2 = new FormFieldModel(
			EnumFormType.PHONE,
			this.form1.get('phone2') as FormControl,
			'Input Phone con dropdown',
		)
			.validation([...this.validations.campo1])
			.onInit();
	}

	initEmail() {
		this.email1 = new FormFieldModel(
			EnumFormType.EMAIL,
			this.form1.get('email1') as FormControl,
			'Input Email',
		)
			.validation([...this.validations.campo1])
			.onInit();
	}

	initColor() {
		this.color1 = new FormFieldModel(
			EnumFormType.COLOR,
			this.form1.get('color1') as FormControl,
			'Input Color',
		)
			.validation([...this.validations.campo1])
			.onInit();
	}

	initPassword() {
		this.password1 = new FormFieldModel(
			EnumFormType.PASSWORD,
			this.form1.get('password1') as FormControl,
			'Input Password',
		)
			.validation([...this.validations.campo1])
			.onInit();

		this.password2 = new FormFieldModel(
			EnumFormType.PASSWORD,
			this.form1.get('password2') as FormControl,
			'Input Password',
		)
			.validation([...this.validations.campo1])
			.onInit();
	}

	initAutomaticValidation() {
		this.text1AV = new FormFieldModel(
			EnumFormType.TEXT,
			this.form1.get('text1AV') as FormControl,
			'Text con validazione automatica minLength',
		)
			.validation(this.validations.campo6)
			.onInit();

		this.text2AV = new FormFieldModel(
			EnumFormType.TEXT,
			this.form1.get('text2AV') as FormControl,
			'Text con validazione automatica minLength e maxLength',
		)
			.validation(this.validations.campo7)
			.onInit();

		this.number1AV = new FormFieldModel(
			EnumFormType.NUMBER,
			this.form1.get('number1AV') as FormControl,
			'Number con validazione automatica min e max',
		)
			.validation(this.validationsAV.number1AV)
			.onInit();

		this.decimal1AV = new FormFieldModel(
			EnumFormType.DECIMAL,
			this.form1.get('decimal1AV') as FormControl,
			'Decimal con validazione automatica min, max e digits',
		)
			.validation(this.validationsAV.decimal1AV)
			.onInit();
	}

	setValue(val: any, name: string) {
		this.form1.get(name).setValue(val);
	}
	resetValue(name: string) {
		this.form1.get(name).reset();
	}
	readValue(name: string) {
		alert(this.form1.get(name).value);
	}
	enableDisable(field: FormFieldModel) {
		if (field.formControl.disabled) {
			field.formControl.enable();
		} else {
			field.formControl.disable();
		}
	}
}

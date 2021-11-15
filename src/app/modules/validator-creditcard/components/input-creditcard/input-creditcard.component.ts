import { Component, Input, ViewChild } from '@angular/core';
import {
	BaseComponent,
	ApplicationLoggerService,
	OptionListModel,
	MagicValidatorUtil,
	WaitElementsUtility,
	StringTranslate,
} from '@ddc/kit';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { CreditcardService } from '../../services/creditcard.service';
import { InputSelectComponent } from '../../../../shared/form/input-select/input-select.component';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { CreditcardValidator } from '../../validators/creditcard.validator';
import { Subscription, of } from 'rxjs';
import { QueryUtility, RequestUtility } from '@ddc/rest';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
	selector: 'ddc-init-input-creditcard',
	templateUrl: './input-creditcard.component.html',
	styleUrls: ['./input-creditcard.component.scss'],
})
export class InputCreditcardComponent extends BaseComponent {
	@Input() showImage: boolean;
	@Input() debounce: number = 1000;
	@Input() extControl: FormControl | AbstractControl;
	@ViewChild('types') types: InputSelectComponent;
	@ViewChild('months') months: InputSelectComponent;
	@ViewChild('years') years: InputSelectComponent;

	private _cc: any;
	@Input() set cc(value: {
		num_cc?: string;
		mm?: string;
		yy?: string;
		cvc?: string;
		type?: string;
	}) {
		this._cc = value;
	}

	ready: boolean;
	readyMonths: boolean;
	readyYears: boolean;
	loadingCC: boolean;

	formCC: FormGroup;
	messageCC: string;
	validations: any = {};
	selectTypes: FormFieldModel;
	optionTypes: OptionListModel[];
	selectMM: FormFieldModel;
	optionMM: OptionListModel[];
	selectYY: FormFieldModel;
	optionYY: OptionListModel[];
	inputCC: FormFieldModel;
	inputCvc: FormFieldModel;
	textType: string | StringTranslate;

	// sub
	subTypes: Subscription;
	subStatusCC: Subscription;
	subValueCC: Subscription;
	subCC: Subscription;
	subValues: Subscription;
	subInputs: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private creditcardService: CreditcardService,
	) {
		super(applicationLogger);
		this.showImage = true;
		this.optionTypes = [];
		this.optionMM = [];
		this.optionYY = [];
		// build form
		this.formCC = this.fb.group({
			type: new MagicValidatorUtil((this.validations.type = []), undefined).build(),
			mm: new MagicValidatorUtil((this.validations.mm = []), undefined).required().build(),
			yy: new MagicValidatorUtil((this.validations.yy = []), undefined).required().build(),
			cvc: new MagicValidatorUtil((this.validations.cvc = []), undefined).required().build(),
		});

		this.formCC.addControl(
			'num_cc',
			new MagicValidatorUtil((this.validations.num_cc = []), undefined)
				.required()
				.pushAsync(
					RequestUtility.debounceAsyncValidator(
						CreditcardValidator.validate(
							this.formCC.get('mm'),
							this.formCC.get('yy'),
							this.formCC.get('cvc'),
							this.creditcardService,
						),
						this.debounce,
					),
					CreditcardValidator.CREDITCARD(),
				)
				.buildControl(),
		);
		this.formCC.get('num_cc').disable();
		this.formCC.get('type').disable();

		// init
		let valMM: string;
		for (let i = 1; i <= 12; i++) {
			valMM = i < 10 ? '0' + i : i + '';
			this.optionMM.push(new OptionListModel(valMM, valMM));
		}
		this.readyMonths = true;

		let valYY: string;
		const now: number = new Date().getFullYear();
		let valNow: number;
		for (let i = 0; i <= 12; i++) {
			valNow = now + i;
			valYY = '' + valNow;
			this.optionYY.push(new OptionListModel(valYY, valYY));
		}
		this.readyYears = true;
	}

	ngOnInitForChildren() {
		// valuechanges
		this.subValues = this.formCC.valueChanges
			.pipe(
				distinctUntilChanged(
					(a, b) =>
						a && b && a.mm === b.mm && a.yy === b.yy && a.cvc === b.cvc && a.num_cc === b.num_cc,
				),
			)
			.subscribe((data) => {
				if (data.mm && data.yy && data.cvc) {
					this.formCC.get('num_cc').enable();
				} else {
					this.formCC.get('num_cc').disable();
				}
			});

		// manageChanges
		this.subStatusCC = this.formCC
			.get('num_cc')
			.statusChanges.pipe(distinctUntilChanged())
			.subscribe((status) => {
				this.manageStatusCC(status);
			});

		this.subValueCC = this.formCC
			.get('num_cc')
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((value) => {
				if (this.extControl) {
					this.extControl.setValue(value);
				}
			});

		// loadings
		this.startLoading();
		this.subTypes = this.creditcardService
			.tpcreditcard(
				undefined,
				QueryUtility.FN_ERROR(() => {
					this.stopLoading();
				}),
			)
			.subscribe(
				(res) => {
					res.forEach((el) => {
						this.optionTypes.push(
							new OptionListModel(el.cod, this.showImage ? el.titleHtml() : el.title, el),
						);
					});
					this.ready = true;
					this.stopLoading();
				},
				(err) => {
					this.stopLoading();
				},
			);

		// creation form
		this.selectTypes = new FormFieldModel(
			this.showImage ? EnumFormType.SELECT_DIV : EnumFormType.SELECT,
			this.formCC.get('type') as FormControl,
			'',
		)
			.validation(this.validations.type)
			.onInit();

		this.selectMM = new FormFieldModel(
			EnumFormType.SELECT,
			this.formCC.get('mm') as FormControl,
			'mm',
		)
			.validation(this.validations.mm)
			.onInit();

		this.selectYY = new FormFieldModel(
			EnumFormType.SELECT,
			this.formCC.get('yy') as FormControl,
			'yyyy',
		)
			.validation(this.validations.yy)
			.onInit();

		this.inputCvc = new FormFieldModel(
			EnumFormType.TEXT,
			this.formCC.get('cvc') as FormControl,
			'cvc/cvv/cvv2',
		)
			.validation(this.validations.cvc)
			.onInit();

		this.inputCC = new FormFieldModel(
			EnumFormType.TEXT,
			this.formCC.get('num_cc') as FormControl,
			'APP.LABEL.CREDITCARD',
		)
			.validation(this.validations.num_cc)
			.onInit();
	}
	ngAfterViewInitForChildren() {
		if (this._cc && this.formCC) {
			this.loadingCC = true;
			this.formCC.get('cvc').setValue(this._cc.cvc);

			const $obsMMYY = WaitElementsUtility.createDelayForFunction(of(true), () => {
				this.formCC.patchValue({
					yy: this._cc.yy,
					mm: this._cc.mm,
				});
			});
			const $obsCC = WaitElementsUtility.createDelayForFunction(of(true), () => {
				this.formCC.patchValue({
					num_cc: this._cc.num_cc,
				});
				this.loadingCC = false;
			});

			this.subInputs = $obsMMYY
				.pipe(
					switchMap((res) => {
						return $obsCC;
					}),
				)
				.subscribe();
		}
	}
	ngOnDestroyForChildren() {
		if (this.subTypes) {
			this.subTypes.unsubscribe();
		}
		if (this.subStatusCC) {
			this.subStatusCC.unsubscribe();
		}
		if (this.subValueCC) {
			this.subValueCC.unsubscribe();
		}
		if (this.subCC) {
			this.subCC.unsubscribe();
		}
		if (this.subValues) {
			this.subValues.unsubscribe();
		}
		if (this.subInputs) {
			this.subInputs.unsubscribe();
		}
	}
	getClassName(): string {
		return 'InputCreditcardComponent';
	}

	manageStatusCC(status) {
		if (this.formCC && this.formCC.get('num_cc') && this.formCC.get('num_cc').value) {
			switch (status) {
				case 'VALID':
					this.manageTypeInfo();
					this.loadingCC = false;
					this.messageCC = undefined;
					break;
				case 'PENDING':
					this.loadingCC = true;
					// this.messageCC = undefined;
					break;
				case 'INVALID':
					this.loadingCC = false;
					if (this.formCC.get('num_cc').hasError('creditcard')) {
						this.messageCC = this.formCC.get('num_cc').getError('creditcard');
					}
					break;
				default:
					this.loadingCC = false;
					this.messageCC = undefined;
					break;
			}
		}
	}

	manageTypeInfo() {
		const formsValue = this.formCC.getRawValue();
		this.subCC = this.creditcardService
			.creditcard(
				formsValue.num_cc,
				formsValue.mm,
				formsValue.yy,
				formsValue.cvc,
				undefined,
				undefined,
				QueryUtility.SKIP_ERROR_RES,
			)
			.subscribe((res) => {
				let item;
				if (this.optionTypes && this.optionTypes.length) {
					item = this.optionTypes.find((el) => el.key === res.type);
				}
				if (this.types) {
					this.types.selectItem(item);
				}
				this.textType = item ? item.text : undefined;
			});
	}
}

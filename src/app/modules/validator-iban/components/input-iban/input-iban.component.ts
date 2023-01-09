import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import {
	BaseComponent,
	ApplicationLoggerService,
	MagicValidatorUtil,
	OptionListModel,
	WaitElementsUtility,
} from '@ddc/kit';
import { IbanService } from '../../services/iban.service';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import { Subscription } from 'rxjs';
import { IbanValidator } from '../../validators/iban.validator';
import { ApiFast } from '../../../api/cakeutils/utility/api-fast.utility';
import { DbFilterInterface } from '../../../api/cakeutils/interfaces/db-filter.interface';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { QueryUtility, RequestUtility } from '@ddc/rest';
import { distinctUntilChanged } from 'rxjs/operators';
import { IbanUtility } from '../../utility/iban.utility';
import { InputSelectComponent } from '../../../../shared/form/input-select/input-select.component';

@Component({
	selector: 'ddc-init-input-iban',
	templateUrl: './input-iban.component.html',
	styleUrls: ['./input-iban.component.scss'],
})
export class InputIbanComponent extends BaseComponent {
	@Input() showImage: boolean;
	@Input() filters: string[];
	@Input() debounce: number = 1000;
	@Input() extControl: FormControl | AbstractControl;
	@ViewChild('nations', { static: false }) nations: InputSelectComponent;

	nationByIban: string;
	@Input() set iban(value: string) {
		if (this.formIban) {
			if (value) {
				this.nationByIban = IbanUtility.getCodIsoByIban(value);
			} else {
				this.nationByIban = undefined;
			}
			this.formIban.get('iban').setValue(value);
		}
	}

	ready: boolean;
	loadingIban: boolean;

	formIban: FormGroup;
	messageIban: string;
	validations: any = {};
	selectNations: FormFieldModel;
	optionNations: OptionListModel[];
	inputIban: FormFieldModel;
	patternIban: string;

	// sub
	subNations: Subscription;
	subStatusIban: Subscription;
	subValueIban: Subscription;
	subPattern: Subscription;
	subChildNations: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private ibanService: IbanService,
	) {
		super(applicationLogger);
		this.showImage = true;
		this.filters = undefined;
		this.optionNations = [];
		// build form
		this.formIban = this.fb.group({
			nation: new MagicValidatorUtil((this.validations.nation = []), undefined).required().build(),
		});
	}

	ngOnInitForChildren() {
		this.formIban.addControl(
			'iban',
			new MagicValidatorUtil((this.validations.iban = []), undefined)
				.required()
				.pushAsync(
					RequestUtility.debounceAsyncValidator(
						IbanValidator.validate(this.formIban.get('nation'), this.ibanService),
						this.debounce,
					),
					IbanValidator.IBAN(),
				)
				.buildControl(),
		);
		this.formIban.get('iban').disable();

		// filter
		const filters: DbFilterInterface[] = [];
		if (this.filters && this.filters.length) {
			filters.push(ApiFast.queryField('cod', this.filters));
		}
		this.startLoading();
		this.subNations = this.ibanService
			.tpiban(
				{
					filters: filters,
					orders: [
						{ key: 'priority', value: 'desc' },
						{ key: 'name', value: 'asc' },
					],
					paginate: undefined,
				},
				undefined,
				QueryUtility.FN_ERROR(() => {
					this.stopLoading();
				}),
			)
			.subscribe(
				(res) => {
					res.forEach((el) => {
						this.optionNations.push(
							new OptionListModel(el.cod_iso3166, this.showImage ? el.titleHtml() : el.name, el),
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
		this.selectNations = new FormFieldModel(
			this.showImage ? EnumFormType.SELECT_DIV : EnumFormType.SELECT,
			this.formIban.get('nation') as FormControl,
			'APP.LABEL.NATION',
		)
			.validation(this.validations.nation)
			.onInit();

		this.inputIban = new FormFieldModel(
			EnumFormType.TEXT,
			this.formIban.get('iban') as FormControl,
			'APP.LABEL.IBAN',
		)
			.validation(this.validations.iban)
			.onInit();

		// manageChanges
		this.subStatusIban = this.formIban
			.get('iban')
			.statusChanges.pipe(distinctUntilChanged())
			.subscribe((status) => {
				this.manageStatusIban(status);
			});

		this.subValueIban = this.formIban
			.get('iban')
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((value) => {
				if (this.extControl) {
					this.extControl.setValue(value);
				}
			});
	}
	ngAfterViewInitForChildren() {
		this.subChildNations = WaitElementsUtility.waitWhileViewChildIsReady(this, 'nations').subscribe(
			() => {
				if (this.nationByIban) {
					this.nations.selectItem(this.optionNations.find((el) => el.key === this.nationByIban));
				}
			},
		);
	}
	ngOnDestroyForChildren() {
		if (this.subNations) {
			this.subNations.unsubscribe();
		}
		if (this.subStatusIban) {
			this.subStatusIban.unsubscribe();
		}
		if (this.subValueIban) {
			this.subValueIban.unsubscribe();
		}
		if (this.subPattern) {
			this.subPattern.unsubscribe();
		}
		if (this.subChildNations) {
			this.subChildNations.unsubscribe();
		}
	}
	getClassName(): string {
		return 'InputIbanComponent';
	}

	manageChangeNation(value: string) {
		if (!value) {
			this.formIban.get('iban').disable();
		} else {
			this.formIban.get('iban').enable();
		}
	}

	manageStatusIban(status) {
		if (this.formIban && this.formIban.get('iban') && this.formIban.get('iban').value) {
			switch (status) {
				case 'VALID':
					this.managePatternInfo();
					this.loadingIban = false;
					this.messageIban = undefined;
					break;
				case 'PENDING':
					this.patternIban = undefined;
					this.loadingIban = true;
					// this.messageIban = undefined;
					break;
				case 'INVALID':
					this.patternIban = undefined;
					this.loadingIban = false;
					if (this.formIban.get('iban').hasError('iban')) {
						this.messageIban = this.formIban.get('iban').getError('iban');
					}
					break;
				default:
					this.patternIban = undefined;
					this.loadingIban = false;
					this.messageIban = undefined;
					break;
			}
		}
	}

	managePatternInfo() {
		const formsValue = this.formIban.getRawValue();
		this.subPattern = this.ibanService
			.iban(formsValue.iban, formsValue.nation, undefined, QueryUtility.SKIP_ERROR_RES)
			.subscribe((res) => {
				this.patternIban = res.patternDecompose(' <strong> | </strong>');
				if (formsValue.iban.includes(' ')) {
					this.formIban
						.get('iban')
						.setValue(formsValue.iban.replaceAll(' ', ''), { emitEvent: false });
				}
			});
	}
}

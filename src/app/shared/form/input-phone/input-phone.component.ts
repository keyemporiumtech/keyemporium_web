import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	ApplicationLoggerService,
	CustomValidators,
	CustomValidatorsMessages,
	MessageValidatorInterface,
	OptionListModel,
	StringTranslate,
	TranslateUtility,
} from '@ddc/kit';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { component } from '../../../../environments/template/component';
import { template } from '../../../../environments/template/template';
import { FormValidatorsUtil } from '../../utils/form-validators.util';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-phone',
	templateUrl: './input-phone.component.html',
	styleUrls: ['./input-phone.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneComponent extends BaseInputComponent {
	@Input() prefixes: OptionListModel[];
	@Input() defaultPrefixText: string | StringTranslate;
	@Input() dropdownPrefix: boolean;
	@Input() cssDropdownClass: any;
	@Input() cssDropdownStyle: any;
	@Input() cssDropdownButtonClass: any;
	cssInputPrefix: any;
	iconClassPrefix: any;
	iconColorPrefix: string;
	cssInputPhone: any;
	iconClassPhone: any;
	iconColorPhone: string;
	currentPrefix: OptionListModel;
	// control
	form: FormGroup;
	subPrefix: Subscription;
	subPhone: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private fb: FormBuilder,
		private translateService: TranslateService,
	) {
		super(applicationLogger);
		this.prefixes = [];
		this.form = this.fb.group({
			prefix: [undefined],
			phone: [undefined],
		});
	}

	ngOnInitForChildren() {
		if (!this.cssDropdownButtonClass) {
			this.cssDropdownButtonClass = component.phone.prefixButton;
		}
		if (!this.defaultPrefixText) {
			this.defaultPrefixText = '---';
		}
		super.ngOnInitForChildren();
		this.manageInfo();
		this.manageMessages();
		this.applySubscription();
		this.applySubscriptionStatus();
		this.subPrefix = this.form
			.get('prefix')
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((prefix) => {
				this.currentPrefix = this.prefixes.find((el) => el.key === prefix);
				if (prefix && this.form.get('phone').value) {
					const value = prefix + ' ' + this.form.get('phone').value;
					this.field.formControl.setValue(value);
				} else {
					this.quitReplace(undefined);
					this.manageMessages();
				}
			});
		this.subPhone = this.form
			.get('phone')
			.valueChanges.pipe(distinctUntilChanged())
			.subscribe((phone) => {
				if (phone && this.form.get('prefix').value) {
					const value = this.form.get('prefix').value + ' ' + phone;
					this.field.formControl.setValue(value);
				} else {
					this.quitReplace(undefined);
					this.manageMessages();
				}
			});
	}

	behaviourOnSubscribe(value: any) {
		if (value) {
			this.prefixes.forEach((element) => {
				if (value.startsWith(TranslateUtility.get(element.text, this.translateService))) {
					this.form.get('prefix').setValue(element.key);
					const num = value.replace(
						TranslateUtility.get(element.text, this.translateService) + ' ',
						'',
					);
					this.form.get('phone').setValue(num);
				}
			});
		} else {
			this.form.get('prefix').setValue(undefined);
			this.form.get('phone').setValue(undefined);
		}
		this.manageMessages();
	}

	behaviourOnSubscribeStatus(status: any) {
		if (status === 'DISABLED') {
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
		if (this.subPrefix) {
			this.subPrefix.unsubscribe();
		}
		if (this.subPhone) {
			this.subPhone.unsubscribe();
		}
	}
	getClassName(): string {
		return 'InputPhoneComponent';
	}

	setAutomaticValidations() {
		this.form.get('phone').setValidators([CustomValidators.isInteger]);
		this.field.validations.push(CustomValidatorsMessages.IS_INTEGER());
		this.inAutomatic = true;
	}

	setPropertiesFromField() {
		this.prefixes = this.field.property.prefixes;
		this.defaultPrefixText = this.field.property.defaultPrefixText;
		this.dropdownPrefix = this.field.property.dropdownPrefix;
		this.cssDropdownClass = this.field.property.cssDropdownClass;
		this.cssDropdownStyle = this.field.property.cssDropdownStyle;
		this.cssDropdownButtonClass = this.field.property.cssDropdownButtonClass;
	}

	// OVERRIDES
	manageMessages() {
		if (
			FormValidatorsUtil.isCome(
				this.field.formControl,
				this.field.flgOnInitValidation,
				this.field.flgOnSubmitValidation,
				this.field.submitted as boolean,
			)
		) {
			this.errorMessages = this.buildErrors(this.field.formControl, this.field.validations) || [];
			const errorPhone =
				FormValidatorsUtil.buildErrors(
					this.form.get('phone') as FormControl,
					this.field.validations,
				) || [];
			errorPhone.forEach((validation) => {
				this.errorMessages.push(validation);
			});

			this.validMessages =
				FormValidatorsUtil.buildValids(
					this.field.showValid,
					this.field.formControl,
					this.field.valids,
				) || [];
			this.styleMessages = FormValidatorsUtil.buildStyleMessages(
				this.field.formControl,
				this.field.styles,
			);
			this.evalInputStyles();
		}
	}

	private buildErrors(
		formControl: FormControl,
		validations: MessageValidatorInterface[],
	): (string | StringTranslate)[] {
		let errorMessages: (string | StringTranslate)[];
		if (validations && validations.length) {
			errorMessages = [];
			validations.forEach((validation) => {
				if (formControl.hasError(validation.type)) {
					if (validation.type === 'required') {
						const prefix = this.form.get('prefix').value;
						const phone = this.form.get('phone').value;
						if (!prefix && !phone) {
							errorMessages.push(new StringTranslate('VALIDATION.REFERENCE.PREFIX_AND_PHONE'));
						} else if (!prefix && phone) {
							errorMessages.push(new StringTranslate('VALIDATION.REFERENCE.PREFIX'));
						} else if (prefix && !phone) {
							errorMessages.push(new StringTranslate('VALIDATION.REFERENCE.PHONE'));
						}
					} else {
						errorMessages.push(new StringTranslate(validation.message, validation.params));
					}
				}
			});
		}
		return errorMessages;
	}

	evalInputStyles() {
		super.evalInputStyles();

		this.cssInputPrefix = {};
		if (
			(this.field.formControl.hasError('required') && !this.form.get('prefix').value) ||
			this.form.get('prefix').errors
		) {
			this.iconClassPrefix = template.icons.iconInvalid + ' input-invalid-icon';
			this.cssInputPrefix['input-invalid'] = true;
		} else {
			this.iconClassPrefix = undefined;
			this.cssInputPrefix = undefined;
		}

		this.cssInputPhone = {};
		if (
			(this.field.formControl.hasError('required') && !this.form.get('phone').value) ||
			this.form.get('phone').errors
		) {
			this.iconClassPhone = template.icons.iconInvalid + ' input-invalid-icon';
			this.cssInputPhone['input-invalid'] = true;
		} else {
			this.iconClassPhone = undefined;
			this.cssInputPhone = undefined;
		}
	}
}

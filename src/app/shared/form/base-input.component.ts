import { Input, EventEmitter, Output, Directive } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import {
	ApplicationLoggerService,
	BaseComponent,
	CustomValidatorsMessages,
	ObjectUtility,
	StringTranslate,
} from '@ddc/kit';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { template } from '../../../environments/template/template';
import { FormInputValidationStyleInterface } from '../interfaces/form/form-input-validation-style.interface';
import { FormFieldModel } from '../models/form/form-field.model';
import { FormValidatorsUtil } from '../utils/form-validators.util';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseInputComponent extends BaseComponent {
	@Input() control: FormControl;
	@Input() field: FormFieldModel;
	@Input() noMargin: boolean;
	/**
	 * Se true aggiunge alcuni Validators al control sulla base di alcuni Input
	 * Esempio per min,max di date e numeri
	 */
	private _automaticValidators: boolean;
	@Input() set automaticValidators(val: boolean) {
		this._automaticValidators = val;
		this.commonAutomaticValidations();
	}
	get automaticValidators(): boolean {
		return this._automaticValidators;
	}
	inAutomatic: boolean;
	fieldValidator: ValidatorFn;
	otherValidations: ValidatorFn[] = [];
	// INPUT FOR VALIDATIONS
	@Input() pattern: string | RegExp;

	// MESSAGES WITHOUT DDC-VALIDATION
	errorMessages: (string | StringTranslate)[];
	validMessages: (string | StringTranslate)[];
	styleMessages: FormInputValidationStyleInterface[];
	cssInput: any = {};
	iconClass: any;
	iconColor: string;
	// subscription
	subInput: Subscription;
	subStatus: Subscription;
	// emitters
	@Output() emitValueChanged: EventEmitter<any> = new EventEmitter<any>();
	@Output() emitStatusChanged: EventEmitter<any> = new EventEmitter<any>();

	// MANAGE EVENTS
	@Input() events: ('blur' | 'focus' | 'keyup' | 'keydown' | 'mouseup' | 'mousedown')[];
	@Output() blurEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() focusEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() keyupEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() keydownEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() mouseupEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() mousedownEvent: EventEmitter<any> = new EventEmitter<any>();

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (this.control && this.field) {
			this.field.formControl = this.control;
		} else if (!this.control && this.field) {
			this.control = this.field.formControl;
		} else {
			throw new Error(
				'Nessun field passato per il componente ' + this.getClassName() + ' id ' + this.id,
			);
		}
		// manageProperties
		if (this.field && this.field.property) {
			this.setPropertiesFromField();
		}
	}
	ngAfterViewInitForChildren() {
		this.setAutomaticValidations();
		this.evalUpdateValidations();
	}
	ngOnDestroyForChildren() {
		if (this.subInput) {
			this.subInput.unsubscribe();
		}
		if (this.subStatus) {
			this.subStatus.unsubscribe();
		}
	}

	// subscription
	applySubscription() {
		this.subInput = this.field.formControl.valueChanges
			.pipe(distinctUntilChanged())
			.subscribe((value) => {
				this.behaviourOnSubscribe(value);
				this.emitValueChanged.emit(value);
			});
	}
	behaviourOnSubscribe(value: any) {}

	applySubscriptionStatus() {
		this.subInput = this.field.formControl.statusChanges
			.pipe(distinctUntilChanged())
			.subscribe((status) => {
				this.behaviourOnSubscribeStatus(status);
				this.emitStatusChanged.emit(status);
			});
	}
	behaviourOnSubscribeStatus(status: any) {}

	// ----------------PROPERTIES
	/**
	 * Viene eseguito solo se nel field esistono delle property
	 */
	abstract setPropertiesFromField();

	// ----------------VALIDATIONS
	/**
	 * Serve a gestire le validazioni automatiche all'init del componente.
	 * Da tenere presente che le validazioni saranno eseguite solo se inAutomatic è true.
	 */
	abstract setAutomaticValidations();

	commonAutomaticValidations() {
		if (this.automaticValidators) {
			if (this.pattern) {
				this.addOtherValidation(Validators.pattern(this.pattern));
				this.field.validations.push(CustomValidatorsMessages.PATTERN(this.pattern));
				this.inAutomatic = true;
			}
		}
	}
	addOtherValidation(validator: ValidatorFn) {
		this.otherValidations.push(validator);
	}
	evalUpdateValidations() {
		if (this.inAutomatic) {
			this.fieldValidator = this.field.formControl.validator;
			if (this.fieldValidator) {
				this.addOtherValidation(this.fieldValidator);
			}
			this.field.formControl.setValidators(this.otherValidations);
			this.field.formControl.updateValueAndValidity({ onlySelf: true, emitEvent: false });
		}
	}

	// ------------------WITHOUT DDC-VALIDATION
	quitReplace(value: any) {
		this.field.formControl.setValue(value, { emitEvent: false });
	}
	manageInfo() {
		if (!this.field.supports || this.field.supports.length === 0) {
			this.field.supports = [];
		}
	}
	manageMessages() {
		if (
			FormValidatorsUtil.isCome(
				this.field.formControl,
				this.field.flgOnInitValidation,
				this.field.flgOnSubmitValidation,
				this.field.submitted as boolean,
			)
		) {
			this.errorMessages =
				FormValidatorsUtil.buildErrors(this.field.formControl, this.field.validations) || [];
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
	evalInputStyles() {
		this.cssInput = {};
		if (this.field.cssClass) {
			if (typeof this.field.cssClass === 'string') {
				this.cssInput[this.field.cssClass] = true;
			} else {
				this.cssInput = this.field.cssClass;
			}
		}
		this.iconClass = undefined;
		this.iconColor = undefined;
		if (this.errorMessages && this.errorMessages.length) {
			this.iconClass = template.icons.iconInvalid + ' input-invalid-icon';
			this.cssInput['input-invalid'] = true;
		} else if (this.styleMessages && this.styleMessages.length) {
			const el = this.styleMessages[this.styleMessages.length - 1];
			this.iconClass = el.icon;
			this.iconColor = el.color;
			if (el.class) {
				if (typeof el.class === 'string') {
					this.cssInput[el.class] = true;
				} else {
					this.cssInput = ObjectUtility.unionObjects(this.cssInput, el.class);
				}
			} else {
				this.cssInput['input-generic'] = true;
			}
		} else if (
			this.field.formControl.valid &&
			(this.field.showValid || (this.validMessages && this.validMessages.length))
		) {
			this.iconClass = template.icons.iconValid + ' input-valid-icon';
			this.cssInput['input-valid'] = true;
		} else if (this.field.supports && this.field.supports.length) {
			this.iconClass = undefined;
			this.cssInput['input-support'] = true;
		} else {
			this.iconClass = undefined;
			this.cssInput = undefined;
		}
	}

	// MANAGE EVENTS
	onBlur(target: any) {
		if (this.checkEvent('blur')) {
			this.blurEvent.emit(target);
		}
	}

	onFocus(target: any) {
		if (this.checkEvent('focus')) {
			this.focusEvent.emit(target);
		}
	}

	onKeyup(target: any) {
		if (this.checkEvent('keyup')) {
			this.keyupEvent.emit(target);
		}
	}

	onKeydown(target: any) {
		if (this.checkEvent('keydown')) {
			this.keydownEvent.emit(target);
		}
	}

	onMouseup(target: any) {
		if (this.checkEvent('mouseup')) {
			this.mouseupEvent.emit(target);
		}
	}

	onMousedown(target: any) {
		if (this.checkEvent('mousedown')) {
			this.mousedownEvent.emit(target);
		}
	}

	private checkEvent(name: string): boolean {
		if (this.events && this.events.length) {
			return this.events.find((el) => el === name) ? true : false;
		}
		return false;
	}
}

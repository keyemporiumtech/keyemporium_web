import { Component, Input } from '@angular/core';
import {
	ApplicationLoggerService,
	DateModel,
	DateValidators,
	DateValidatorsMessages,
} from '@ddc/kit';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-date',
	templateUrl: './input-date.component.html',
	styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent extends BaseInputComponent {
	private _min: any | Date | string | number | DateModel;
	@Input() set min(val: any | Date | string | number | DateModel) {
		this._min = val;
		this.minDate = this.getDateModelForMinMax(val);
		this.minValue = this.getValueForMinMax(val);
	}
	get min(): any | Date | string | number | DateModel {
		return this._min;
	}
	private _max: any | Date | string | number | DateModel;
	@Input() set max(val: any | Date | string | number | DateModel) {
		this._max = val;
		this.maxDate = this.getDateModelForMinMax(val);
		this.maxValue = this.getValueForMinMax(val);
	}
	get max(): any | Date | string | number | DateModel {
		return this._max;
	}
	@Input() step: number = 1;
	@Input() timezoneName: string;
	@Input() isTime: boolean;
	minValue: string;
	maxValue: string;
	minDate: DateModel;
	maxDate: DateModel;
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		if (!this.timezoneName) {
			this.timezoneName = localStorage.getItem('timezoneNameServer');
		}
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'InputDateComponent';
	}

	setAutomaticValidations() {
		if (this.automaticValidators) {
			this.inAutomatic = true;
			this.addOtherValidation(DateValidators.isDate);
			this.field.validations.push(DateValidatorsMessages.IS_DATE());
			if (this.min) {
				this.addOtherValidation(DateValidators.mustBeGreaterOrEqualThan(this.minDate));
				this.field.validations.push(
					DateValidatorsMessages.MUST_BE_GREATER_OR_EQUAL_THAN(
						this.minDate.toString(this.isTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'),
					),
				);
			}
			if (this.max) {
				this.addOtherValidation(DateValidators.mustBeLessOrEqualThan(this.maxDate));
				this.field.validations.push(
					DateValidatorsMessages.MUST_BE_LESS_OR_EQUAL_THAN(
						this.maxDate.toString(this.isTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'),
					),
				);
			}
		}
	}

	setPropertiesFromField() {
		this.min = this.field.property.min;
		this.max = this.field.property.max;
		if (this.field.property.step && typeof this.field.property.step === 'number') {
			this.step = this.field.property.step;
		}
		this.timezoneName = this.field.property.timezoneName;
		this.isTime = this.field.property.isTime;
	}

	private getDateModelForMinMax(value: any | Date | string | number | DateModel): DateModel {
		if (value) {
			let date: DateModel;
			if (value instanceof DateModel) {
				date = value;
			} else {
				date = new DateModel(value);
			}
			return date;
		}
		return undefined;
	}
	private getValueForMinMax(value: any | Date | string | number | DateModel): string {
		if (value) {
			let date: DateModel;
			if (value instanceof DateModel) {
				date = value;
			} else {
				date = new DateModel(value);
			}
			return this.isTime
				? date.toString('YYYY-MM-DDTHH:mm:ss', this.timezoneName)
				: date.toString('YYYY-MM-DD', this.timezoneName);
		}
		return undefined;
	}
}

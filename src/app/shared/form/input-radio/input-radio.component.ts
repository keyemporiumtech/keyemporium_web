import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ApplicationLoggerService, OptionListModel } from '@ddc/kit';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-radio',
	templateUrl: './input-radio.component.html',
	styleUrls: ['./input-radio.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRadioComponent extends BaseInputComponent {
	@Input() options: OptionListModel[];
	@Input() isHorizontal: boolean;
	get selectedOption(): OptionListModel {
		if (this.field && this.field.formControl) {
			return this.options && this.options.find((el) => el.key === this.field.formControl.value);
		}
		return undefined;
	}
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.options = [];
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'InputRadioComponent';
	}
	setAutomaticValidations() {}
	setPropertiesFromField() {
		this.isHorizontal = this.field.property.isHorizontal;
	}

	selectItem(option: OptionListModel) {
		if (this.field && this.field.formControl.enabled) {
			if (this.field.formControl.value !== option.key) {
				this.field.formControl.setValue(option.key);
			} else {
				this.field.formControl.setValue(undefined);
			}
		}
	}
}

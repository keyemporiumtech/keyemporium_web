import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ApplicationLoggerService } from '@ddc/kit';
import { InputSelectComponent } from '../input-select/input-select.component';

@Component({
	selector: 'ddc-init-input-checkbox',
	templateUrl: './input-checkbox.component.html',
	styleUrls: ['./input-checkbox.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCheckboxComponent extends InputSelectComponent {
	@Input() isHorizontal: boolean;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'InputCheckboxComponent';
	}

	setAutomaticValidations() {}
	setPropertiesFromField() {
		this.isHorizontal = this.field.property.isHorizontal;
		this.options = this.field.property.options;
	}
}

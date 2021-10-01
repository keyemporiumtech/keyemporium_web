import { Component } from '@angular/core';
import { ApplicationLoggerService } from '@ddc/kit';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-color',
	templateUrl: './input-color.component.html',
	styleUrls: ['./input-color.component.scss'],
})
export class InputColorComponent extends BaseInputComponent {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'InputColorComponent';
	}

	setPropertiesFromField() {}
	setAutomaticValidations() {}
}

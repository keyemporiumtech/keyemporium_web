import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ApplicationLoggerService } from '@ddc/kit';
import { component } from '../../../../environments/template/component';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
	selector: 'ddc-init-input-textarea',
	templateUrl: './input-textarea.component.html',
	styleUrls: ['./input-textarea.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextareaComponent extends InputTextComponent {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		if (!this.maxLength && component.textarea.maxLength) {
			this.maxLength = component.textarea.maxLength;
		}
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'InputTextareaComponent';
	}
}

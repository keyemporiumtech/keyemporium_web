import { Component, Input } from '@angular/core';
import { ApplicationLoggerService, OptionListModel } from '@ddc/kit';
import { InputSelectComponent } from '../input-select/input-select.component';

@Component({
	selector: 'ddc-init-form-select-div',
	templateUrl: './form-select-div.component.html',
	styleUrls: ['./form-select-div.component.scss'],
})
export class FormSelectDivComponent extends InputSelectComponent {
	@Input() cssClassDisabled: any;
	@Input() cssStyleDisabled: any;
	@Input() cssClassSelected: any;
	@Input() cssStyleSelected: any;
	open: boolean = false;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.bindCheckedSubscription = true;
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'FormSelectDivComponent';
	}

	setAutomaticValidations() {}

	clickOpenClose() {
		this.open = !this.open;
	}
	selectItem(option: OptionListModel) {
		super.selectItem(option);
		this.open = false;
	}
}

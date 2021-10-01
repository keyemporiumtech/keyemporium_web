import { Component, Input } from '@angular/core';
import { ApplicationLoggerService, OptionListModel } from '@ddc/kit';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-select',
	templateUrl: './input-select.component.html',
	styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent extends BaseInputComponent {
	@Input() options: OptionListModel[];
	@Input() defaultOption: OptionListModel;
	@Input() defaultOptionText: string;
	@Input() changeIfEnable: boolean = true;
	selectedOption: OptionListModel;
	// multiple
	@Input() multiple: boolean;
	@Input() maxSelectedView: number;
	selectedOptions: OptionListModel[];
	// checked
	bindCheckedSubscription: boolean;
	checkedMap: Map<number, boolean>;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.options = [];
		this.checkedMap = new Map<number, boolean>();
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		if (!this.defaultOptionText) {
			this.defaultOptionText = '---';
		}
		if (!this.defaultOption) {
			this.defaultOption = new OptionListModel(undefined, this.defaultOptionText);
		}
		this.selectedOption = this.defaultOption;
		this.selectedOptions = [];

		this.buildCheckedMap();
		this.manageInfo();
		this.manageMessages();
		this.applySubscription();
	}
	behaviourOnCheckedSubscribe(value: any) {
		let checked: OptionListModel[] = [];
		let notChecked: OptionListModel[] = [];
		if (!value) {
			checked = [];
			notChecked = this.options;
		} else if (this.multiple) {
			checked = this.options.filter((el) => value.includes(el.key)) || [];
			notChecked = this.options.filter((el) => !value.includes(el.key)) || [];
		} else {
			checked = [this.options.find((el) => el.key === value)];
			notChecked = [this.options.find((el) => el.key !== value)];
		}
		if (checked && checked.length) {
			checked.forEach((el) => {
				if (el) {
					this.setCheckedOption(el, true);
				}
			});
		}
		if (notChecked && notChecked.length) {
			notChecked.forEach((el) => {
				if (el) {
					this.setCheckedOption(el, false);
				}
			});
		}
	}
	behaviourOnSubscribe(value: any) {
		if (this.bindCheckedSubscription) {
			this.behaviourOnCheckedSubscribe(value);
		}
		this.manageMessages();
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'FormSelectComponent';
	}
	evalInputStyles() {
		super.evalInputStyles();
		if (!this.field.cssStyle) {
			this.field.cssStyle = {};
		}
		if (!this.noMargin) {
			this.field.cssStyle['width'] = '95%';
			this.field.cssStyle['margin-top'] = '1.5rem';
		}
	}
	onReset() {
		this.quitReplace(undefined);
		this.manageMessages();
	}

	setAutomaticValidations() {}
	setPropertiesFromField() {
		this.options = this.field.property.options;
		this.defaultOption = this.field.property.defaultOption;
		this.defaultOptionText = this.field.property.defaultOptionText;
		this.multiple = this.field.property.multiple;
		this.maxSelectedView = this.field.property.maxSelectedView;
		this.changeIfEnable = this.field.property.changeIfEnable;
	}

	// checked
	buildCheckedMap() {
		for (let i = 0; i < this.options.length; i++) {
			this.checkedMap.set(i, this.isSelected(this.options[i]));
		}
	}
	setCheckedOption(option: OptionListModel, value: boolean) {
		setTimeout(() => {
			const index = this.options.findIndex((el) => el.key === option.key);
			if (index !== -1) {
				this.checkedMap.set(index, value);
			}
		}, 0);
	}

	// commons
	isSelected(option: OptionListModel): boolean {
		if (this.multiple && this.field && this.field.formControl && this.field.formControl.value) {
			return this.field.formControl.value.includes(option.key);
		} else if (this.field && this.field.formControl) {
			return this.field.formControl.value === option.key;
		} else {
			return false;
		}
	}

	selectItem(option: OptionListModel, optionsEvent?: any) {
		if (this.multiple) {
			this.checkOptionForMultiple(option, optionsEvent);
		} else {
			this.checkOptionForSingle(option, optionsEvent);
		}
	}

	// single

	/**
	 * Setta il valore al control secondo l'item option selezionato
	 * @param option item selezionato o deselezionato
	 * @param optionsEvent per gestire gli eventi sul control
	 */
	checkOptionForSingle(option: OptionListModel, optionsEvent?: any) {
		if (this.field && this.evalIfEnable()) {
			if (this.field.formControl.value !== option.key) {
				this.field.formControl.setValue(option.key, optionsEvent);
				this.selectedOption = option;
				this.selectedOptions = [option];
			}
		}
	}

	// multiple

	/**
	 * Aggiunge o toglie un item alla lista selectedOptions e
	 * Setta il valore al control secondo gli items selectedOptions
	 * @param option item selezionato
	 */
	checkOptionForMultiple(option: OptionListModel, optionsEvent?: any) {
		if (this.field && this.evalIfEnable()) {
			const val = this.field.formControl.value;
			const values = val ? (val instanceof Array ? val : [val]) : [];
			const index = values.findIndex((el) => el === option.key);
			if (index === -1) {
				values.push(option.key);
			} else {
				values.splice(index, 1);
			}
			this.field.formControl.setValue(values && values.length ? values : undefined, optionsEvent);
			this.selectedOption = this.defaultOption;
			this.selectedOptions = this.options.filter((el) => values.includes(el.key));
		}
	}

	private evalIfEnable(): boolean {
		if (this.changeIfEnable) {
			return this.field.formControl.enabled;
		}
		return true;
	}
}

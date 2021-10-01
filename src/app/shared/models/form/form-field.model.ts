import { FormControl } from '@angular/forms';
import { MessageValidatorInterface, StringTranslate } from '@ddc/kit';
import { EnumFormType } from '../../enums/form/form-type.enum';
import { FormFieldPropertyInterface } from '../../interfaces/form/form-field-property.interface';
import { FormInputValidationStyleInterface } from '../../interfaces/form/form-input-validation-style.interface';
import { BootstrapUtils } from '../../utils/bootstrap-utils';
import { BootstrapUtilModel } from '../utils/bootstrap-util.model';

export class FormFieldModel extends BootstrapUtilModel {
	type: EnumFormType;
	formControl?: FormControl;
	label?: string | StringTranslate;
	placeholder?: string | StringTranslate;
	// style
	// form-control-plaintext (senza bordo)
	// form-control form-control-lg, form-control form-control-sm
	// form-control-file
	cssClass?: any;
	cssStyle?: any;
	sizeLabel?: string;
	sizeGroup?: string;
	// directive
	supports?: (string | StringTranslate)[];
	validations?: MessageValidatorInterface[];
	styles?: FormInputValidationStyleInterface[];
	valids?: (string | StringTranslate)[];
	// form info
	showValid?: boolean;
	submitted?: boolean | ((input?: any) => boolean);
	flgOnSubmitValidation?: boolean;
	flgOnInitValidation?: boolean;
	// properties
	property: FormFieldPropertyInterface;

	constructor(
		type: EnumFormType,
		formControl?: FormControl,
		label?: string | StringTranslate,
		placeholder?: string | StringTranslate,
	) {
		super();
		this.type = type;
		this.formControl = formControl;
		this.label = label;
		this.placeholder = placeholder;
	}
	get sizeLabelCol(): string {
		return BootstrapUtils.getSize(this.sizeLabel, 'col-');
	}
	get sizeGroupCol(): string {
		return BootstrapUtils.getSize(this.sizeGroup, 'col-');
	}

	horizontal(labelSize: string, inputSize: string) {
		this.sizeLabel = labelSize;
		this.size = inputSize;
		return this;
	}
	colGroup(sizeGroup: string) {
		this.sizeGroup = sizeGroup;
		return this;
	}
	style(cssClass?: any, cssStyle?: any) {
		this.cssClass = cssClass;
		this.cssStyle = cssStyle;
		return this;
	}
	validation(
		validations?: MessageValidatorInterface[],
		supports?: (string | StringTranslate)[],
		styles?: FormInputValidationStyleInterface[],
		valids?: (string | StringTranslate)[],
		showValid?: boolean,
	) {
		this.validations = validations;
		this.supports = supports;
		this.styles = styles;
		this.valids = valids;
		this.showValid = showValid;
		return this;
	}
	onSubmit(submitted?: boolean | ((input?: any) => boolean)) {
		this.flgOnSubmitValidation = true;
		this.submitted = submitted;
		return this;
	}
	onInit() {
		this.flgOnInitValidation = true;
		return this;
	}
	appendPrepend(append: string | StringTranslate, prepend: string | StringTranslate) {
		this.append = append;
		this.prepend = prepend;
		return this;
	}
	setProperties(property: FormFieldPropertyInterface) {
		this.property = property;
		return this;
	}
	setProperty(property: string, value: any) {
		if (!this.property) {
			this.property = {};
		}
		this.property[property] = value;
		return this;
	}
}

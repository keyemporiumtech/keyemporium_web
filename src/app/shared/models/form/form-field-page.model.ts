import { MagicValidatorUtil } from '@ddc/kit';
import { FormFieldModel } from './form-field.model';

export class FormFieldPageModel {
	private _name: string;
	private _magicValidator: MagicValidatorUtil;
	private _field: FormFieldModel;
	constructor(name: string, magicValidator: MagicValidatorUtil, field: FormFieldModel) {
		this.name = name;
		this.magicValidator = magicValidator;
		this.field = field;
		this.field.validations = this.magicValidator.validations;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Getter magicValidator
	 * @return {MagicValidatorUtil}
	 */
	public get magicValidator(): MagicValidatorUtil {
		return this._magicValidator;
	}

	/**
	 * Getter field
	 * @return {FormFieldModel}
	 */
	public get field(): FormFieldModel {
		return this._field;
	}

	/**
	 * Setter magicValidator
	 * @param {MagicValidatorUtil} value
	 */
	public set magicValidator(value: MagicValidatorUtil) {
		this._magicValidator = value;
	}

	/**
	 * Setter field
	 * @param {FormFieldModel} value
	 */
	public set field(value: FormFieldModel) {
		this._field = value;
	}
}

import { ApiModel } from '../../api/cakeutils/base/api.model';
import { CreditcardRequestModel } from './creditcard-request.model';

export class CreditcardModel extends ApiModel {
	private _input: CreditcardRequestModel;
	private _pattern: string;
	private _format: string;
	private _length: number;
	private _cvcLength: number;
	private _luhn: string;
	private _type: string;

	/**
	 * Getter input
	 * @return {CreditcardRequestModel}
	 */
	public get input(): CreditcardRequestModel {
		return this._input;
	}

	/**
	 * Getter pattern
	 * @return {string}
	 */
	public get pattern(): string {
		return this._pattern;
	}

	/**
	 * Getter format
	 * @return {string}
	 */
	public get format(): string {
		return this._format;
	}

	/**
	 * Getter length
	 * @return {number}
	 */
	public get length(): number {
		return this._length;
	}

	/**
	 * Getter cvcLength
	 * @return {number}
	 */
	public get cvcLength(): number {
		return this._cvcLength;
	}

	/**
	 * Getter luhn
	 * @return {string}
	 */
	public get luhn(): string {
		return this._luhn;
	}

	/**
	 * Getter type
	 * @return {string}
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * Setter input
	 * @param {CreditcardRequestModel} value
	 */
	public set input(value: CreditcardRequestModel) {
		this._input = value;
	}

	/**
	 * Setter pattern
	 * @param {string} value
	 */
	public set pattern(value: string) {
		this._pattern = value;
	}

	/**
	 * Setter format
	 * @param {string} value
	 */
	public set format(value: string) {
		this._format = value;
	}

	/**
	 * Setter length
	 * @param {number} value
	 */
	public set length(value: number) {
		this._length = value;
	}

	/**
	 * Setter cvcLength
	 * @param {number} value
	 */
	public set cvcLength(value: number) {
		this._cvcLength = value;
	}

	/**
	 * Setter luhn
	 * @param {string} value
	 */
	public set luhn(value: string) {
		this._luhn = value;
	}

	/**
	 * Setter type
	 * @param {string} value
	 */
	public set type(value: string) {
		this._type = value;
	}
}

import { ApiModel } from '../../api/cakeutils/base/api.model';

export class CreditcardRequestModel extends ApiModel {
	private _number: string;
	private _expireMM: string;
	private _expireYY: string;
	private _cvc: string;
	private _type: string;

	/**
	 * Getter number
	 * @return {string}
	 */
	public get number(): string {
		return this._number;
	}

	/**
	 * Getter expireMM
	 * @return {string}
	 */
	public get expireMM(): string {
		return this._expireMM;
	}

	/**
	 * Getter expireYY
	 * @return {string}
	 */
	public get expireYY(): string {
		return this._expireYY;
	}

	/**
	 * Getter cvc
	 * @return {string}
	 */
	public get cvc(): string {
		return this._cvc;
	}

	/**
	 * Getter type
	 * @return {string}
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * Setter number
	 * @param {string} value
	 */
	public set number(value: string) {
		this._number = value;
	}

	/**
	 * Setter expireMM
	 * @param {string} value
	 */
	public set expireMM(value: string) {
		this._expireMM = value;
	}

	/**
	 * Setter expireYY
	 * @param {string} value
	 */
	public set expireYY(value: string) {
		this._expireYY = value;
	}

	/**
	 * Setter cvc
	 * @param {string} value
	 */
	public set cvc(value: string) {
		this._cvc = value;
	}

	/**
	 * Setter type
	 * @param {string} value
	 */
	public set type(value: string) {
		this._type = value;
	}
}

import { ApiModel } from '../../api/cakeutils/base/api.model';

export class MimetypeModel extends ApiModel {
	private _ext: string;
	private _value: string;
	private _type: string;

	/**
	 * Getter ext
	 * @return {string}
	 */
	public get ext(): string {
		return this._ext;
	}

	/**
	 * Getter value
	 * @return {string}
	 */
	public get value(): string {
		return this._value;
	}

	/**
	 * Getter type
	 * @return {string}
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * Setter ext
	 * @param {string} value
	 */
	public set ext(value: string) {
		this._ext = value;
	}

	/**
	 * Setter value
	 * @param {string} value
	 */
	public set value(value: string) {
		this._value = value;
	}

	/**
	 * Setter type
	 * @param {string} value
	 */
	public set type(value: string) {
		this._type = value;
	}
}

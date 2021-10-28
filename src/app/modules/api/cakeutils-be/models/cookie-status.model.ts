import { ApiModel } from '../../cakeutils/base/api.model';
import { EnumCookieType } from '../../../../shared/enums/cookie/cookie-type.enum';

export class CookieStatusModel extends ApiModel {
	private _isNecessary: boolean;
	private _isPreference: boolean;
	private _isStatistic: boolean;
	private _isMarketing: boolean;
	private _isNotClassified: boolean;
	private _value: boolean;

	/**
	 * Getter isNecessary
	 * @return {boolean}
	 */
	public get isNecessary(): boolean {
		return this._isNecessary;
	}

	/**
	 * Getter isPreference
	 * @return {boolean}
	 */
	public get isPreference(): boolean {
		return this._isPreference;
	}

	/**
	 * Getter isStatistic
	 * @return {boolean}
	 */
	public get isStatistic(): boolean {
		return this._isStatistic;
	}

	/**
	 * Getter isMarketing
	 * @return {boolean}
	 */
	public get isMarketing(): boolean {
		return this._isMarketing;
	}

	/**
	 * Getter isNotClassified
	 * @return {boolean}
	 */
	public get isNotClassified(): boolean {
		return this._isNotClassified;
	}

	/**
	 * Getter value
	 * @return {boolean}
	 */
	public get value(): boolean {
		return this._value;
	}

	/**
	 * Setter isNecessary
	 * @param {boolean} value
	 */
	public set isNecessary(value: boolean) {
		this._isNecessary = value;
	}

	/**
	 * Setter isPreference
	 * @param {boolean} value
	 */
	public set isPreference(value: boolean) {
		this._isPreference = value;
	}

	/**
	 * Setter isStatistic
	 * @param {boolean} value
	 */
	public set isStatistic(value: boolean) {
		this._isStatistic = value;
	}

	/**
	 * Setter isMarketing
	 * @param {boolean} value
	 */
	public set isMarketing(value: boolean) {
		this._isMarketing = value;
	}

	/**
	 * Setter isNotClassified
	 * @param {boolean} value
	 */
	public set isNotClassified(value: boolean) {
		this._isNotClassified = value;
	}

	/**
	 * Setter value
	 * @param {boolean} value
	 */
	public set value(value: boolean) {
		this._value = value;
	}
}

import { ApiModel } from '../../cakeutils/base/api.model';
import { EnumCookieType } from '../../../../shared/enums/cookie/cookie-type.enum';

export class CookieModel extends ApiModel {
	private _name: string;
	private _description: string;
	private _link: string;
	private _duration: number;
	private _durationDesc: string;
	private _protocol: string;
	private _type: string; // EnumCookieType
	private _value: any; // any
	private _hash: boolean;

	// enum
	private _typeEnum: EnumCookieType; // EnumCookieType

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter link
	 * @return {string}
	 */
	public get link(): string {
		return this._link;
	}

	/**
	 * Getter duration
	 * @return {number}
	 */
	public get duration(): number {
		return this._duration;
	}

	/**
	 * Getter durationDesc
	 * @return {string}
	 */
	public get durationDesc(): string {
		return this._durationDesc;
	}

	/**
	 * Getter protocol
	 * @return {string}
	 */
	public get protocol(): string {
		return this._protocol;
	}

	/**
	 * Getter type
	 * @return {string}
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * Getter value
	 * @return {any}
	 */
	public get value(): any {
		return this._value;
	}

	/**
	 * Getter hash
	 * @return {boolean}
	 */
	public get hash(): boolean {
		return this._hash;
	}

	/**
	 * Getter typeEnum
	 * @return {EnumCookieType}
	 */
	public get typeEnum(): EnumCookieType {
		return this._typeEnum;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter link
	 * @param {string} value
	 */
	public set link(value: string) {
		this._link = value;
	}

	/**
	 * Setter duration
	 * @param {number} value
	 */
	public set duration(value: number) {
		this._duration = value;
	}

	/**
	 * Setter durationDesc
	 * @param {string} value
	 */
	public set durationDesc(value: string) {
		this._durationDesc = value;
	}

	/**
	 * Setter protocol
	 * @param {string} value
	 */
	public set protocol(value: string) {
		this._protocol = value;
	}

	/**
	 * Setter type
	 * @param {string} value
	 */
	public set type(value: string) {
		this._type = value;
	}

	/**
	 * Setter value
	 * @param {any} value
	 */
	public set value(value: any) {
		this._value = value;
	}

	/**
	 * Setter hash
	 * @param {boolean} value
	 */
	public set hash(value: boolean) {
		this._hash = value;
	}

	/**
	 * Setter typeEnum
	 * @param {EnumCookieType} value
	 */
	public set typeEnum(value: EnumCookieType) {
		this._typeEnum = value;
	}
}

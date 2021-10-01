import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumSexType } from '../enums/sex-type.enum';

export class UserModel extends ApiModel {
	private _username: string;
	private _password: string;
	private _passclean: string;
	private _cf: string;
	private _name: string;
	private _surname: string;
	private _sex: string;
	private _born: string; // date
	// enums
	private _sexEnum: EnumSexType;

	public get bornModel(): DateModel {
		return new DateModel(this.born);
	}
	public get bornFormat(): string {
		const dateModel = new DateModel(this.born);
		return dateModel.toString();
	}

	/**
	 * Getter username
	 * @return {string}
	 */
	public get username(): string {
		return this._username;
	}

	/**
	 * Getter password
	 * @return {string}
	 */
	public get password(): string {
		return this._password;
	}

	/**
	 * Getter passclean
	 * @return {string}
	 */
	public get passclean(): string {
		return this._passclean;
	}

	/**
	 * Getter cf
	 * @return {string}
	 */
	public get cf(): string {
		return this._cf;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter surname
	 * @return {string}
	 */
	public get surname(): string {
		return this._surname;
	}

	/**
	 * Getter sex
	 * @return {string}
	 */
	public get sex(): string {
		return this._sex;
	}

	/**
	 * Getter born
	 * @return {string}
	 */
	public get born(): string {
		return this._born;
	}

	/**
	 * Setter username
	 * @param {string} value
	 */
	public set username(value: string) {
		this._username = value;
	}

	/**
	 * Setter password
	 * @param {string} value
	 */
	public set password(value: string) {
		this._password = value;
	}

	/**
	 * Setter passclean
	 * @param {string} value
	 */
	public set passclean(value: string) {
		this._passclean = value;
	}

	/**
	 * Setter cf
	 * @param {string} value
	 */
	public set cf(value: string) {
		this._cf = value;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter surname
	 * @param {string} value
	 */
	public set surname(value: string) {
		this._surname = value;
	}

	/**
	 * Setter sex
	 * @param {string} value
	 */
	public set sex(value: string) {
		this._sex = value;
	}

	/**
	 * Setter born
	 * @param {string} value
	 */
	public set born(value: string) {
		this._born = value;
	}

	/**
	 * Getter sexEnum
	 * @return {EnumSexType}
	 */
	public get sexEnum(): EnumSexType {
		return this._sexEnum;
	}

	/**
	 * Setter sexEnum
	 * @param {EnumSexType} value
	 */
	public set sexEnum(value: EnumSexType) {
		this._sexEnum = value;
	}
}

import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from './user.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EnumAddressType } from '../../localesystem/enums/address-type.enum';

export class UseraddressModel extends ApiModel {
	private _cod: string;
	private _flgprincipal: number; // boolean
	private _user: UserModel;
	private _address: AddressModel;
	private _tpaddress: TypologicalModel;
	private _group: string;
	// enums
	private _tpaddressEnum: EnumAddressType;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter flgprincipal
	 * @return {number}
	 */
	public get flgprincipal(): number {
		return this._flgprincipal;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter address
	 * @return {AddressModel}
	 */
	public get address(): AddressModel {
		return this._address;
	}

	/**
	 * Getter tpaddress
	 * @return {TypologicalModel}
	 */
	public get tpaddress(): TypologicalModel {
		return this._tpaddress;
	}

	/**
	 * Getter group
	 * @return {string}
	 */
	public get group(): string {
		return this._group;
	}

	/**
	 * Getter tpaddressEnum
	 * @return {EnumAddressType}
	 */
	public get tpaddressEnum(): EnumAddressType {
		return this._tpaddressEnum;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter flgprincipal
	 * @param {number} value
	 */
	public set flgprincipal(value: number) {
		this._flgprincipal = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter address
	 * @param {AddressModel} value
	 */
	public set address(value: AddressModel) {
		this._address = value;
	}

	/**
	 * Setter tpaddress
	 * @param {TypologicalModel} value
	 */
	public set tpaddress(value: TypologicalModel) {
		this._tpaddress = value;
	}

	/**
	 * Setter group
	 * @param {string} value
	 */
	public set group(value: string) {
		this._group = value;
	}

	/**
	 * Setter tpaddressEnum
	 * @param {EnumAddressType} value
	 */
	public set tpaddressEnum(value: EnumAddressType) {
		this._tpaddressEnum = value;
	}
}

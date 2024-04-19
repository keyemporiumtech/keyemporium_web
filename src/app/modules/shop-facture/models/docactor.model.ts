import { ApiModel } from '../../api/cakeutils/base/api.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { CityModel } from '../../localesystem/models/city.model';
import { NationModel } from '../../localesystem/models/nation.model';

export class DocactorModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _cf: string;
	private _addresstext: string;
	private _address: AddressModel;
	private _citytext: string;
	private _city: CityModel;
	private _nation: NationModel;
	private _zip: string;
	private _flgsender: boolean;
	private _flgreceiver: boolean;
	private _tel: string;
	private _fax: string;
	private _email: string;
	// virtualfields
	private _nation_val: string;
	private _nation_cod: string;
	private _city_val: string;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter cf
	 * @return {string}
	 */
	public get cf(): string {
		return this._cf;
	}

	/**
	 * Getter addresstext
	 * @return {string}
	 */
	public get addresstext(): string {
		return this._addresstext;
	}

	/**
	 * Getter address
	 * @return {AddressModel}
	 */
	public get address(): AddressModel {
		return this._address;
	}

	/**
	 * Getter citytext
	 * @return {string}
	 */
	public get citytext(): string {
		return this._citytext;
	}

	/**
	 * Getter city
	 * @return {CityModel}
	 */
	public get city(): CityModel {
		return this._city;
	}

	/**
	 * Getter nation
	 * @return {NationModel}
	 */
	public get nation(): NationModel {
		return this._nation;
	}

	/**
	 * Getter zip
	 * @return {string}
	 */
	public get zip(): string {
		return this._zip;
	}

	/**
	 * Getter flgsender
	 * @return {boolean}
	 */
	public get flgsender(): boolean {
		return this._flgsender;
	}

	/**
	 * Getter flgreceiver
	 * @return {boolean}
	 */
	public get flgreceiver(): boolean {
		return this._flgreceiver;
	}

	/**
	 * Getter tel
	 * @return {string}
	 */
	public get tel(): string {
		return this._tel;
	}

	/**
	 * Getter fax
	 * @return {string}
	 */
	public get fax(): string {
		return this._fax;
	}

	/**
	 * Getter email
	 * @return {string}
	 */
	public get email(): string {
		return this._email;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter cf
	 * @param {string} value
	 */
	public set cf(value: string) {
		this._cf = value;
	}

	/**
	 * Setter addresstext
	 * @param {string} value
	 */
	public set addresstext(value: string) {
		this._addresstext = value;
	}

	/**
	 * Setter address
	 * @param {AddressModel} value
	 */
	public set address(value: AddressModel) {
		this._address = value;
	}

	/**
	 * Setter citytext
	 * @param {string} value
	 */
	public set citytext(value: string) {
		this._citytext = value;
	}

	/**
	 * Setter city
	 * @param {CityModel} value
	 */
	public set city(value: CityModel) {
		this._city = value;
	}

	/**
	 * Setter nation
	 * @param {NationModel} value
	 */
	public set nation(value: NationModel) {
		this._nation = value;
	}

	/**
	 * Setter zip
	 * @param {string} value
	 */
	public set zip(value: string) {
		this._zip = value;
	}

	/**
	 * Setter flgsender
	 * @param {boolean} value
	 */
	public set flgsender(value: boolean) {
		this._flgsender = value;
	}

	/**
	 * Setter flgreceiver
	 * @param {boolean} value
	 */
	public set flgreceiver(value: boolean) {
		this._flgreceiver = value;
	}

	/**
	 * Setter tel
	 * @param {string} value
	 */
	public set tel(value: string) {
		this._tel = value;
	}

	/**
	 * Setter fax
	 * @param {string} value
	 */
	public set fax(value: string) {
		this._fax = value;
	}

	/**
	 * Setter email
	 * @param {string} value
	 */
	public set email(value: string) {
		this._email = value;
	}

	/**
	 * Getter nation_val
	 * @return {string}
	 */
	public get nation_val(): string {
		return this._nation_val;
	}

	/**
	 * Getter nation_cod
	 * @return {string}
	 */
	public get nation_cod(): string {
		return this._nation_cod;
	}

	/**
	 * Getter city_val
	 * @return {string}
	 */
	public get city_val(): string {
		return this._city_val;
	}

	/**
	 * Setter nation_val
	 * @param {string} value
	 */
	public set nation_val(value: string) {
		this._nation_val = value;
	}

	/**
	 * Setter nation_cod
	 * @param {string} value
	 */
	public set nation_cod(value: string) {
		this._nation_cod = value;
	}

	/**
	 * Setter city_val
	 * @param {string} value
	 */
	public set city_val(value: string) {
		this._city_val = value;
	}
}

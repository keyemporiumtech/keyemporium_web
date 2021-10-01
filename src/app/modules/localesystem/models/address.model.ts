import { ApiModel } from '../../api/cakeutils/base/api.model';
import { NationModel } from './nation.model';
import { CityModel } from './city.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EnumAddressType } from '../enums/address-type.enum';

export class AddressModel extends ApiModel {
	private _cod: string;
	private _street: string;
	private _number: string;
	private _zip: string;
	private _place: string;
	private _province: string;
	private _region: string;
	private _geo1: string;
	private _geo2: string;
	private _nation: NationModel;
	private _city: CityModel;
	private _tpaddress: TypologicalModel;
	// enums
	private _tpaddressEnum: EnumAddressType;
	// relation values
	private _nation_val: string;
	private _nation_cod: string;
	private _city_val: string;

	// calculated values
	public get html_address(): string {
		return this.text_address('<br/>');
	}
	private text_address(separator: string): string {
		let address: string = '';
		if (this.street) {
			address += this.street;
			if (this.number) {
				address += ', ' + this.number;
			}
		}
		if (this.zip) {
			address += separator + this.zip;
		}
		if (this.place) {
			address += ' - ' + this.place;
			if (this.province) {
				address += ' (' + this.province + ')';
			}
		}
		if (this.nation_val) {
			address += separator + this.nation_val;
		} else if (this.nation && this.nation.name) {
			address += separator + this.nation.name;
		}
		return address;
	}

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter street
	 * @return {string}
	 */
	public get street(): string {
		return this._street;
	}

	/**
	 * Getter string
	 * @return {string}
	 */
	public get number(): string {
		return this._number;
	}

	/**
	 * Getter zip
	 * @return {string}
	 */
	public get zip(): string {
		return this._zip;
	}

	/**
	 * Getter place
	 * @return {string}
	 */
	public get place(): string {
		return this._place;
	}

	/**
	 * Getter province
	 * @return {string}
	 */
	public get province(): string {
		return this._province;
	}

	/**
	 * Getter region
	 * @return {string}
	 */
	public get region(): string {
		return this._region;
	}

	/**
	 * Getter geo1
	 * @return {string}
	 */
	public get geo1(): string {
		return this._geo1;
	}

	/**
	 * Getter geo2
	 * @return {string}
	 */
	public get geo2(): string {
		return this._geo2;
	}

	/**
	 * Getter nation
	 * @return {NationModel}
	 */
	public get nation(): NationModel {
		return this._nation;
	}

	/**
	 * Getter city
	 * @return {CityModel}
	 */
	public get city(): CityModel {
		return this._city;
	}

	/**
	 * Getter tpaddress
	 * @return {TypologicalModel}
	 */
	public get tpaddress(): TypologicalModel {
		return this._tpaddress;
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
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter street
	 * @param {string} value
	 */
	public set street(value: string) {
		this._street = value;
	}

	/**
	 * Setter string
	 * @param {string} value
	 */
	public set number(value: string) {
		this._number = value;
	}

	/**
	 * Setter zip
	 * @param {string} value
	 */
	public set zip(value: string) {
		this._zip = value;
	}

	/**
	 * Setter place
	 * @param {string} value
	 */
	public set place(value: string) {
		this._place = value;
	}

	/**
	 * Setter province
	 * @param {string} value
	 */
	public set province(value: string) {
		this._province = value;
	}

	/**
	 * Setter region
	 * @param {string} value
	 */
	public set region(value: string) {
		this._region = value;
	}

	/**
	 * Setter geo1
	 * @param {string} value
	 */
	public set geo1(value: string) {
		this._geo1 = value;
	}

	/**
	 * Setter geo2
	 * @param {string} value
	 */
	public set geo2(value: string) {
		this._geo2 = value;
	}

	/**
	 * Setter nation
	 * @param {NationModel} value
	 */
	public set nation(value: NationModel) {
		this._nation = value;
	}

	/**
	 * Setter city
	 * @param {CityModel} value
	 */
	public set city(value: CityModel) {
		this._city = value;
	}

	/**
	 * Setter tpaddress
	 * @param {TypologicalModel} value
	 */
	public set tpaddress(value: TypologicalModel) {
		this._tpaddress = value;
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

	/**
	 * Getter tpaddressEnum
	 * @return {EnumAddressType}
	 */
	public get tpaddressEnum(): EnumAddressType {
		return this._tpaddressEnum;
	}

	/**
	 * Setter tpaddressEnum
	 * @param {EnumAddressType} value
	 */
	public set tpaddressEnum(value: EnumAddressType) {
		this._tpaddressEnum = value;
	}
}

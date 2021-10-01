import { ApiModel } from '../../api/cakeutils/base/api.model';
import { NationModel } from './nation.model';

export class CityModel extends ApiModel {
	private _cod: string;
	private _countrycod: string;
	private _postalcode: string;
	private _place: string;
	private _region: string;
	private _regioncode: string;
	private _province: string;
	private _provincecode: string;
	private _community: string;
	private _communitycode: string;
	private _geo1: string;
	private _geo2: string;
	private _nation: NationModel;
	// added
	private _nation_val: string;
	private _nation_cod: string;
	private _filter_search: string;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter countrycod
	 * @return {string}
	 */
	public get countrycod(): string {
		return this._countrycod;
	}

	/**
	 * Getter postalcode
	 * @return {string}
	 */
	public get postalcode(): string {
		return this._postalcode;
	}

	/**
	 * Getter place
	 * @return {string}
	 */
	public get place(): string {
		return this._place;
	}

	/**
	 * Getter region
	 * @return {string}
	 */
	public get region(): string {
		return this._region;
	}

	/**
	 * Getter regioncod
	 * @return {string}
	 */
	public get regioncode(): string {
		return this._regioncode;
	}

	/**
	 * Getter province
	 * @return {string}
	 */
	public get province(): string {
		return this._province;
	}

	/**
	 * Getter provincecod
	 * @return {string}
	 */
	public get provincecode(): string {
		return this._provincecode;
	}

	/**
	 * Getter community
	 * @return {string}
	 */
	public get community(): string {
		return this._community;
	}

	/**
	 * Getter communitycod
	 * @return {string}
	 */
	public get communitycode(): string {
		return this._communitycode;
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
	 * Getter filter_search
	 * @return {string}
	 */
	public get filter_search(): string {
		return this._filter_search;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter countrycod
	 * @param {string} value
	 */
	public set countrycod(value: string) {
		this._countrycod = value;
	}

	/**
	 * Setter postalcode
	 * @param {string} value
	 */
	public set postalcode(value: string) {
		this._postalcode = value;
	}

	/**
	 * Setter place
	 * @param {string} value
	 */
	public set place(value: string) {
		this._place = value;
	}

	/**
	 * Setter region
	 * @param {string} value
	 */
	public set region(value: string) {
		this._region = value;
	}

	/**
	 * Setter regioncod
	 * @param {string} value
	 */
	public set regioncode(value: string) {
		this._regioncode = value;
	}

	/**
	 * Setter province
	 * @param {string} value
	 */
	public set province(value: string) {
		this._province = value;
	}

	/**
	 * Setter provincecod
	 * @param {string} value
	 */
	public set provincecode(value: string) {
		this._provincecode = value;
	}

	/**
	 * Setter community
	 * @param {string} value
	 */
	public set community(value: string) {
		this._community = value;
	}

	/**
	 * Setter communitycod
	 * @param {string} value
	 */
	public set communitycode(value: string) {
		this._communitycode = value;
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
	 * Setter filter_search
	 * @param {string} value
	 */
	public set filter_search(value: string) {
		this._filter_search = value;
	}
}

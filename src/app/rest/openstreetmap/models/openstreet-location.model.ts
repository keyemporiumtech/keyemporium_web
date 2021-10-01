import { BaseModel } from '@ddc/kit';
import { OpenstreetAddressModel } from './openstreet-address.model';
import { OpenstreetExtratagModel } from './openstreet-extratag.model';

export class OpenstreetLocationModel extends BaseModel {
	private _place_id: number;
	private _osm_type: string;
	private _osm_id: number;
	private _boundingbox: number[];
	private _lat: number;
	private _lon: number;
	private _display_name: string;
	private _class: string;
	private _type: string;
	private _importance: number;
	private _icon: string;
	private _licence: string;
	private _address: OpenstreetAddressModel;
	private _extratags: any;
	private _namedetails: any;

	// others
	private _tags: OpenstreetExtratagModel[];

	/**
	 * Getter place_id
	 * @return {number}
	 */
	public get place_id(): number {
		return this._place_id;
	}

	/**
	 * Getter osm_type
	 * @return {string}
	 */
	public get osm_type(): string {
		return this._osm_type;
	}

	/**
	 * Getter osm_id
	 * @return {number}
	 */
	public get osm_id(): number {
		return this._osm_id;
	}

	/**
	 * Getter boundingbox
	 * @return {number[]}
	 */
	public get boundingbox(): number[] {
		return this._boundingbox;
	}

	/**
	 * Getter lat
	 * @return {number}
	 */
	public get lat(): number {
		return this._lat;
	}

	/**
	 * Getter lon
	 * @return {number}
	 */
	public get lon(): number {
		return this._lon;
	}

	/**
	 * Getter display_name
	 * @return {string}
	 */
	public get display_name(): string {
		return this._display_name;
	}

	/**
	 * Getter class
	 * @return {string}
	 */
	public get class(): string {
		return this._class;
	}

	/**
	 * Getter type
	 * @return {string}
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * Getter importance
	 * @return {number}
	 */
	public get importance(): number {
		return this._importance;
	}

	/**
	 * Getter icon
	 * @return {string}
	 */
	public get icon(): string {
		return this._icon;
	}

	/**
	 * Getter licence
	 * @return {string}
	 */
	public get licence(): string {
		return this._licence;
	}

	/**
	 * Getter address
	 * @return {OpenstreetAddressModel}
	 */
	public get address(): OpenstreetAddressModel {
		return this._address;
	}

	/**
	 * Getter extratags
	 * @return {any}
	 */
	public get extratags(): any {
		return this._extratags;
	}

	/**
	 * Setter place_id
	 * @param {number} value
	 */
	public set place_id(value: number) {
		this._place_id = value;
	}

	/**
	 * Setter osm_type
	 * @param {string} value
	 */
	public set osm_type(value: string) {
		this._osm_type = value;
	}

	/**
	 * Setter osm_id
	 * @param {number} value
	 */
	public set osm_id(value: number) {
		this._osm_id = value;
	}

	/**
	 * Setter boundingbox
	 * @param {number[]} value
	 */
	public set boundingbox(value: number[]) {
		this._boundingbox = value;
	}

	/**
	 * Setter lat
	 * @param {number} value
	 */
	public set lat(value: number) {
		this._lat = value;
	}

	/**
	 * Setter lon
	 * @param {number} value
	 */
	public set lon(value: number) {
		this._lon = value;
	}

	/**
	 * Setter display_name
	 * @param {string} value
	 */
	public set display_name(value: string) {
		this._display_name = value;
	}

	/**
	 * Setter class
	 * @param {string} value
	 */
	public set class(value: string) {
		this._class = value;
	}

	/**
	 * Setter type
	 * @param {string} value
	 */
	public set type(value: string) {
		this._type = value;
	}

	/**
	 * Setter importance
	 * @param {number} value
	 */
	public set importance(value: number) {
		this._importance = value;
	}

	/**
	 * Setter icon
	 * @param {string} value
	 */
	public set icon(value: string) {
		this._icon = value;
	}

	/**
	 * Setter licence
	 * @param {string} value
	 */
	public set licence(value: string) {
		this._licence = value;
	}

	/**
	 * Setter address
	 * @param {OpenstreetAddressModel} value
	 */
	public set address(value: OpenstreetAddressModel) {
		this._address = value;
	}

	/**
	 * Setter extratags
	 * @param {any} value
	 */
	public set extratags(value: any) {
		this._extratags = value;
	}

	/**
	 * Getter namedetails
	 * @return {any}
	 */
	public get namedetails(): any {
		return this._namedetails;
	}

	/**
	 * Getter tags
	 * @return {OpenstreetExtratagModel[]}
	 */
	public get tags(): OpenstreetExtratagModel[] {
		return this._tags;
	}

	/**
	 * Setter namedetails
	 * @param {any} value
	 */
	public set namedetails(value: any) {
		this._namedetails = value;
	}

	/**
	 * Setter tags
	 * @param {OpenstreetExtratagModel[]} value
	 */
	public set tags(value: OpenstreetExtratagModel[]) {
		this._tags = value;
	}
}

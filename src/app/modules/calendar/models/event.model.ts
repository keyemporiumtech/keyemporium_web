import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumEventType } from '../enums/event-type.enum';
import { EnumCatType } from '../../authentication/enums/cat-type.enum';
import { DateModel } from '@ddc/kit';

export class EventModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _description: string;
	private _dtainit: string; // date
	private _dtaend: string; // date
	private _tpevent: TypologicalModel;
	private _tpcat: TypologicalModel;
	private _flgdeleted: boolean;
	// enums
	private _tpcatEnum: EnumCatType;
	private _tpeventEnum: EnumEventType;

	public get dtainitModel(): DateModel {
		return new DateModel(this.dtainit);
	}
	public get dtainitFormat(): string {
		const dateModel = new DateModel(this.dtainit);
		return dateModel.toString();
	}

	public get dtaendModel(): DateModel {
		return new DateModel(this.dtaend);
	}
	public get dtaendFormat(): string {
		const dateModel = new DateModel(this.dtaend);
		return dateModel.toString();
	}

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter title
	 * @return {string}
	 */
	public get title(): string {
		return this._title;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter dtainit
	 * @return {string}
	 */
	public get dtainit(): string {
		return this._dtainit;
	}

	/**
	 * Getter dtaend
	 * @return {string}
	 */
	public get dtaend(): string {
		return this._dtaend;
	}

	/**
	 * Getter tpevent
	 * @return {TypologicalModel}
	 */
	public get tpevent(): TypologicalModel {
		return this._tpevent;
	}

	/**
	 * Getter tpcat
	 * @return {TypologicalModel}
	 */
	public get tpcat(): TypologicalModel {
		return this._tpcat;
	}

	/**
	 * Getter flgdeleted
	 * @return {boolean}
	 */
	public get flgdeleted(): boolean {
		return this._flgdeleted;
	}

	/**
	 * Getter tpcatEnum
	 * @return {EnumCatType}
	 */
	public get tpcatEnum(): EnumCatType {
		return this._tpcatEnum;
	}

	/**
	 * Getter tpeventEnum
	 * @return {EnumEventType}
	 */
	public get tpeventEnum(): EnumEventType {
		return this._tpeventEnum;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter title
	 * @param {string} value
	 */
	public set title(value: string) {
		this._title = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter dtainit
	 * @param {string} value
	 */
	public set dtainit(value: string) {
		this._dtainit = value;
	}

	/**
	 * Setter dtaend
	 * @param {string} value
	 */
	public set dtaend(value: string) {
		this._dtaend = value;
	}

	/**
	 * Setter tpevent
	 * @param {TypologicalModel} value
	 */
	public set tpevent(value: TypologicalModel) {
		this._tpevent = value;
	}

	/**
	 * Setter tpcat
	 * @param {TypologicalModel} value
	 */
	public set tpcat(value: TypologicalModel) {
		this._tpcat = value;
	}

	/**
	 * Setter flgdeleted
	 * @param {boolean} value
	 */
	public set flgdeleted(value: boolean) {
		this._flgdeleted = value;
	}

	/**
	 * Setter tpcatEnum
	 * @param {EnumCatType} value
	 */
	public set tpcatEnum(value: EnumCatType) {
		this._tpcatEnum = value;
	}

	/**
	 * Setter tpeventEnum
	 * @param {EnumEventType} value
	 */
	public set tpeventEnum(value: EnumEventType) {
		this._tpeventEnum = value;
	}
}

import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityModel } from '../../authentication/models/activity.model';
import { ProfessionModel } from './profession.model';

export class ProfessionschoolModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _description: string;
	private _profession: ProfessionModel;
	private _institute: ActivityModel;
	private _levelval: number;
	private _levelmax: number;
	private _leveldesc: string;
	private _dtainit: string; // date
	private _dtaend: string; // date

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
	 * Getter profession
	 * @return {ProfessionModel}
	 */
	public get profession(): ProfessionModel {
		return this._profession;
	}

	/**
	 * Getter institute
	 * @return {ActivityModel}
	 */
	public get institute(): ActivityModel {
		return this._institute;
	}

	/**
	 * Getter levelval
	 * @return {number}
	 */
	public get levelval(): number {
		return this._levelval;
	}

	/**
	 * Getter levelmax
	 * @return {number}
	 */
	public get levelmax(): number {
		return this._levelmax;
	}

	/**
	 * Getter leveldesc
	 * @return {string}
	 */
	public get leveldesc(): string {
		return this._leveldesc;
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
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter profession
	 * @param {ProfessionModel} value
	 */
	public set profession(value: ProfessionModel) {
		this._profession = value;
	}

	/**
	 * Setter institute
	 * @param {ActivityModel} value
	 */
	public set institute(value: ActivityModel) {
		this._institute = value;
	}

	/**
	 * Setter levelval
	 * @param {number} value
	 */
	public set levelval(value: number) {
		this._levelval = value;
	}

	/**
	 * Setter levelmax
	 * @param {number} value
	 */
	public set levelmax(value: number) {
		this._levelmax = value;
	}

	/**
	 * Setter leveldesc
	 * @param {string} value
	 */
	public set leveldesc(value: string) {
		this._leveldesc = value;
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
}

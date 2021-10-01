import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityModel } from '../../authentication/models/activity.model';
import { CityModel } from '../../localesystem/models/city.model';
import { NationModel } from '../../localesystem/models/nation.model';
import { WorkroleModel } from './workrole.model';

export class WorkexperienceModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _description: string;
	private _company: ActivityModel;
	private _role: WorkroleModel;
	private _place: string;
	private _city: CityModel;
	private _nation: NationModel;
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
	 * Getter company
	 * @return {ActivityModel}
	 */
	public get company(): ActivityModel {
		return this._company;
	}

	/**
	 * Getter role
	 * @return {WorkroleModel}
	 */
	public get role(): WorkroleModel {
		return this._role;
	}

	/**
	 * Getter place
	 * @return {string}
	 */
	public get place(): string {
		return this._place;
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
	 * Setter company
	 * @param {ActivityModel} value
	 */
	public set company(value: ActivityModel) {
		this._company = value;
	}

	/**
	 * Setter role
	 * @param {WorkroleModel} value
	 */
	public set role(value: WorkroleModel) {
		this._role = value;
	}

	/**
	 * Setter place
	 * @param {string} value
	 */
	public set place(value: string) {
		this._place = value;
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

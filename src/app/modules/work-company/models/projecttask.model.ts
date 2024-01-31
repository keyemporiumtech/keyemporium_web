import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityprojectModel } from './activityproject.model';

export class ProjecttaskModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _dtainit: string;
	private _dtaend: string;
	private _project: ActivityprojectModel;
	private _parent: ProjecttaskModel;

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
	 * Getter parent
	 * @return {ProjecttaskModel}
	 */
	public get parent(): ProjecttaskModel {
		return this._parent;
	}

	/**
	 * Setter parent
	 * @param {ProjecttaskModel} value
	 */
	public set parent(value: ProjecttaskModel) {
		this._parent = value;
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
	 * Getter project
	 * @return {ActivityprojectModel}
	 */
	public get project(): ActivityprojectModel {
		return this._project;
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
	 * Setter project
	 * @param {ActivityprojectModel} value
	 */
	public set project(value: ActivityprojectModel) {
		this._project = value;
	}
}

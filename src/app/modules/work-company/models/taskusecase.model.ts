import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ProjecttaskModel } from './projecttask.model';

export class TaskusecaseModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _task: ProjecttaskModel;

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
	 * Getter task
	 * @return {ProjecttaskModel}
	 */
	public get task(): ProjecttaskModel {
		return this._task;
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
	 * Setter task
	 * @param {ProjecttaskModel} value
	 */
	public set task(value: ProjecttaskModel) {
		this._task = value;
	}
}

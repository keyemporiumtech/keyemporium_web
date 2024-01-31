import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from '../../authentication/models/user.model';
import { ProjecttaskModel } from './projecttask.model';

export class TaskuserModel extends ApiModel {
	private _cod: string;
	private _role: string;
	private _user: UserModel;
	private _task: ProjecttaskModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter role
	 * @return {string}
	 */
	public get role(): string {
		return this._role;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
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
	 * Setter role
	 * @param {string} value
	 */
	public set role(value: string) {
		this._role = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter task
	 * @param {ProjecttaskModel} value
	 */
	public set task(value: ProjecttaskModel) {
		this._task = value;
	}
}

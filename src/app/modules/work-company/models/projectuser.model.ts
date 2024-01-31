import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from '../../authentication/models/user.model';
import { ActivityprojectModel } from './activityproject.model';

export class ProjectuserModel extends ApiModel {
	private _cod: string;
	private _role: string;
	private _user: UserModel;
	private _project: ActivityprojectModel;

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
	 * Setter project
	 * @param {ActivityprojectModel} value
	 */
	public set project(value: ActivityprojectModel) {
		this._project = value;
	}
}

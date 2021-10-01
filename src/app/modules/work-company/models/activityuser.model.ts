import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityModel } from '../../authentication/models/activity.model';
import { UserModel } from '../../authentication/models/user.model';
import { WorkroleModel } from './workrole.model';

export class ActivityuserModel extends ApiModel {
	private _cod: string;
	private _activity: ActivityModel;
	private _user: UserModel;
	private _role: WorkroleModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter activity
	 * @return {ActivityModel}
	 */
	public get activity(): ActivityModel {
		return this._activity;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter role
	 * @return {WorkroleModel}
	 */
	public get role(): WorkroleModel {
		return this._role;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter role
	 * @param {WorkroleModel} value
	 */
	public set role(value: WorkroleModel) {
		this._role = value;
	}
}

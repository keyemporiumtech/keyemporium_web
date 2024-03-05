import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityModel } from './activity.model';
import { UserModel } from './user.model';

export class ApplicationModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _keytoken: string;
	private _activity: ActivityModel;
	private _user: UserModel;

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
	 * Getter keytoken
	 * @return {string}
	 */
	public get keytoken(): string {
		return this._keytoken;
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
	 * Setter keytoken
	 * @param {string} value
	 */
	public set keytoken(value: string) {
		this._keytoken = value;
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
}

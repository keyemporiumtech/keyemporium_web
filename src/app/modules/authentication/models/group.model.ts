import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from './user.model';
import { ActivityModel } from './activity.model';

export class GroupModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _description: string;
	private _user: UserModel;
	private _activity: ActivityModel;
	private _symbol: string;
	private _flgused: boolean;

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
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter activity
	 * @return {ActivityModel}
	 */
	public get activity(): ActivityModel {
		return this._activity;
	}

	/**
	 * Getter symbol
	 * @return {string}
	 */
	public get symbol(): string {
		return this._symbol;
	}

	/**
	 * Getter flgused
	 * @return {boolean}
	 */
	public get flgused(): boolean {
		return this._flgused;
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
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Setter symbol
	 * @param {string} value
	 */
	public set symbol(value: string) {
		this._symbol = value;
	}

	/**
	 * Setter flgused
	 * @param {boolean} value
	 */
	public set flgused(value: boolean) {
		this._flgused = value;
	}
}

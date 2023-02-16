import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityModel } from './activity.model';
import { ProfileModel } from './profile.model';
import { UserModel } from './user.model';

export class UserprofileModel extends ApiModel {
	private _cod: string;
	private _user: UserModel;
	private _profile: ProfileModel;
	private _activity: ActivityModel;

	get description(): string {
		let name = '';
		if (this.profile && this.profile.name) {
			name = this.profile.name;
		}
		if (this.activity && this.activity.namecod) {
			name += ' (' + this.activity.namecod + ')';
		}
		return name;
	}

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter profile
	 * @return {ProfileModel}
	 */
	public get profile(): ProfileModel {
		return this._profile;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter profile
	 * @param {ProfileModel} value
	 */
	public set profile(value: ProfileModel) {
		this._profile = value;
	}

	/**
	 * Getter activity
	 * @return {ActivityModel}
	 */
	public get activity(): ActivityModel {
		return this._activity;
	}

	/**
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}
}

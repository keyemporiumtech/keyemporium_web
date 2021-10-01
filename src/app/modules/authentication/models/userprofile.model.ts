import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from './user.model';
import { ProfileModel } from './profile.model';

export class UserprofileModel extends ApiModel {
	private _cod: string;
	private _user: UserModel;
	private _profile: ProfileModel;

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
}

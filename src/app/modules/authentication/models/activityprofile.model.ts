import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityModel } from './activity.model';
import { ProfileModel } from './profile.model';

export class ActivityprofileModel extends ApiModel {
	private _cod: string;
	private _activity: ActivityModel;
	private _profile: ProfileModel;

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
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Setter profile
	 * @param {ProfileModel} value
	 */
	public set profile(value: ProfileModel) {
		this._profile = value;
	}
}

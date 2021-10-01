import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ProfileModel } from './profile.model';
import { PermissionModel } from './permission.model';

export class ProfilepermissionModel extends ApiModel {
	private _cod: string;
	private _profile: ProfileModel;
	private _permission: PermissionModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter profile
	 * @return {ProfileModel}
	 */
	public get profile(): ProfileModel {
		return this._profile;
	}

	/**
	 * Getter permission
	 * @return {PermissionModel}
	 */
	public get permission(): PermissionModel {
		return this._permission;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter profile
	 * @param {ProfileModel} value
	 */
	public set profile(value: ProfileModel) {
		this._profile = value;
	}

	/**
	 * Setter permission
	 * @param {PermissionModel} value
	 */
	public set permission(value: PermissionModel) {
		this._permission = value;
	}
}

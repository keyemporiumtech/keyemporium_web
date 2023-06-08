import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PermissionModel } from './permission.model';
import { UserrelationModel } from './userrelation.model';

export class UserrelationpermissionModel extends ApiModel {
	private _cod: string;
	private _userrelation: UserrelationModel;
	private _permission: PermissionModel;
	private _direction: number;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter userrelation
	 * @return {UserrelationModel}
	 */
	public get userrelation(): UserrelationModel {
		return this._userrelation;
	}

	/**
	 * Getter permission
	 * @return {PermissionModel}
	 */
	public get permission(): PermissionModel {
		return this._permission;
	}

	/**
	 * Getter direction
	 * @return {number}
	 */
	public get direction(): number {
		return this._direction;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter userrelation
	 * @param {UserrelationModel} value
	 */
	public set userrelation(value: UserrelationModel) {
		this._userrelation = value;
	}

	/**
	 * Setter permission
	 * @param {PermissionModel} value
	 */
	public set permission(value: PermissionModel) {
		this._permission = value;
	}

	/**
	 * Setter direction
	 * @param {number} value
	 */
	public set direction(value: number) {
		this._direction = value;
	}
}

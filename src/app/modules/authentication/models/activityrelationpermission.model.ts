import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityrelationModel } from './activityrelation.model';
import { PermissionModel } from './permission.model';

export class ActivityrelationpermissionModel extends ApiModel {
	private _cod: string;
	private _activityrelation: ActivityrelationModel;
	private _permission: PermissionModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter activityrelation
	 * @return {ActivityrelationModel}
	 */
	public get activityrelation(): ActivityrelationModel {
		return this._activityrelation;
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
	 * Setter activityrelation
	 * @param {ActivityrelationModel} value
	 */
	public set activityrelation(value: ActivityrelationModel) {
		this._activityrelation = value;
	}

	/**
	 * Setter permission
	 * @param {PermissionModel} value
	 */
	public set permission(value: PermissionModel) {
		this._permission = value;
	}
}

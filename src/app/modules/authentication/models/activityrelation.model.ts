import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumActivityrelationType } from '../enums/activityrelation-type.enum';
import { ActivityModel } from './activity.model';
import { UserModel } from './user.model';

export class ActivityrelationModel extends ApiModel {
	private _cod: string;
	private _user: UserModel;
	private _activity: ActivityModel;
	private _tprelation: TypologicalModel;
	private _inforelationuser: string;
	private _inforelationactivity: string;
	// enums
	private _tprelationEnum: EnumActivityrelationType;

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
	 * Getter activity
	 * @return {ActivityModel}
	 */
	public get activity(): ActivityModel {
		return this._activity;
	}

	/**
	 * Getter tprelation
	 * @return {TypologicalModel}
	 */
	public get tprelation(): TypologicalModel {
		return this._tprelation;
	}

	/**
	 * Getter inforelationuser
	 * @return {string}
	 */
	public get inforelationuser(): string {
		return this._inforelationuser;
	}

	/**
	 * Getter inforelationactivity
	 * @return {string}
	 */
	public get inforelationactivity(): string {
		return this._inforelationactivity;
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
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Setter tprelation
	 * @param {TypologicalModel} value
	 */
	public set tprelation(value: TypologicalModel) {
		this._tprelation = value;
	}

	/**
	 * Setter inforelationuser
	 * @param {string} value
	 */
	public set inforelationuser(value: string) {
		this._inforelationuser = value;
	}

	/**
	 * Setter inforelationactivity
	 * @param {string} value
	 */
	public set inforelationactivity(value: string) {
		this._inforelationactivity = value;
	}

	/**
	 * Getter tprelationEnum
	 * @return {EnumActivityrelationType}
	 */
	public get tprelationEnum(): EnumActivityrelationType {
		return this._tprelationEnum;
	}

	/**
	 * Setter tprelationEnum
	 * @param {EnumActivityrelationType} value
	 */
	public set tprelationEnum(value: EnumActivityrelationType) {
		this._tprelationEnum = value;
	}
}

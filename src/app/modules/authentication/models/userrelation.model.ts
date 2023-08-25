import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumUserrelationType } from '../enums/userrelation-type.enum';
import { UserModel } from './user.model';

export class UserrelationModel extends ApiModel {
	private _cod: string;
	private _user1: UserModel;
	private _user2: UserModel;
	private _tprelation: TypologicalModel;
	private _inforelation1: string;
	private _inforelation2: string;
	// enums
	private _tprelationEnum: EnumUserrelationType;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter user1
	 * @return {UserModel}
	 */
	public get user1(): UserModel {
		return this._user1;
	}

	/**
	 * Getter user2
	 * @return {UserModel}
	 */
	public get user2(): UserModel {
		return this._user2;
	}

	/**
	 * Getter tprelation
	 * @return {TypologicalModel}
	 */
	public get tprelation(): TypologicalModel {
		return this._tprelation;
	}

	/**
	 * Getter inforelation1
	 * @return {string}
	 */
	public get inforelation1(): string {
		return this._inforelation1;
	}

	/**
	 * Getter inforelation2
	 * @return {string}
	 */
	public get inforelation2(): string {
		return this._inforelation2;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter user1
	 * @param {UserModel} value
	 */
	public set user1(value: UserModel) {
		this._user1 = value;
	}

	/**
	 * Setter user2
	 * @param {UserModel} value
	 */
	public set user2(value: UserModel) {
		this._user2 = value;
	}

	/**
	 * Setter tprelation
	 * @param {TypologicalModel} value
	 */
	public set tprelation(value: TypologicalModel) {
		this._tprelation = value;
	}

	/**
	 * Setter inforelation1
	 * @param {string} value
	 */
	public set inforelation1(value: string) {
		this._inforelation1 = value;
	}

	/**
	 * Setter inforelation2
	 * @param {string} value
	 */
	public set inforelation2(value: string) {
		this._inforelation2 = value;
	}

	/**
	 * Getter tprelationEnum
	 * @return {EnumUserrelationType}
	 */
	public get tprelationEnum(): EnumUserrelationType {
		return this._tprelationEnum;
	}

	/**
	 * Setter tprelationEnum
	 * @param {EnumUserrelationType} value
	 */
	public set tprelationEnum(value: EnumUserrelationType) {
		this._tprelationEnum = value;
	}
}

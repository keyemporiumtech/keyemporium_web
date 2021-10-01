import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from './user.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EnumSocialreferenceType } from '../enums/socialreference-type.enum';

export class UseroauthsocialModel extends ApiModel {
	private _cod: string;
	private _user: UserModel;
	private _tpsocialreference: TypologicalModel;
	private _oauthid: string;
	// enums
	private _tpsocialreferenceEnum: EnumSocialreferenceType;

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
	 * Getter tpsocialreference
	 * @return {TypologicalModel}
	 */
	public get tpsocialreference(): TypologicalModel {
		return this._tpsocialreference;
	}

	/**
	 * Getter oauthid
	 * @return {string}
	 */
	public get oauthid(): string {
		return this._oauthid;
	}

	/**
	 * Getter tpsocialreferenceEnum
	 * @return {EnumSocialreferenceType}
	 */
	public get tpsocialreferenceEnum(): EnumSocialreferenceType {
		return this._tpsocialreferenceEnum;
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
	 * Setter tpsocialreference
	 * @param {TypologicalModel} value
	 */
	public set tpsocialreference(value: TypologicalModel) {
		this._tpsocialreference = value;
	}

	/**
	 * Setter oauthid
	 * @param {string} value
	 */
	public set oauthid(value: string) {
		this._oauthid = value;
	}

	/**
	 * Setter tpsocialreferenceEnum
	 * @param {EnumSocialreferenceType} value
	 */
	public set tpsocialreferenceEnum(value: EnumSocialreferenceType) {
		this._tpsocialreferenceEnum = value;
	}
}

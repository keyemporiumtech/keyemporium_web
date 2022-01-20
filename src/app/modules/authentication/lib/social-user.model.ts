import { UserModel } from '../models/user.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { ContactreferenceModel } from '../models/contactreference.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';

export class SocialUserModel extends ApiModel {
	private _provider: string;
	private _photoUrl: string;
	private _authToken: string;
	private _idToken: string;
	private _authorizationCode: string;
	private _user: UserModel;
	private _addresses: AddressModel[];
	private _phones: ContactreferenceModel[];

	/**
	 * Getter provider
	 * @return {string}
	 */
	public get provider(): string {
		return this._provider;
	}

	/**
	 * Getter photoUrl
	 * @return {string}
	 */
	public get photoUrl(): string {
		return this._photoUrl;
	}

	/**
	 * Getter authToken
	 * @return {string}
	 */
	public get authToken(): string {
		return this._authToken;
	}

	/**
	 * Getter idToken
	 * @return {string}
	 */
	public get idToken(): string {
		return this._idToken;
	}

	/**
	 * Getter authorizationCode
	 * @return {string}
	 */
	public get authorizationCode(): string {
		return this._authorizationCode;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter addresses
	 * @return {AddressModel[]}
	 */
	public get addresses(): AddressModel[] {
		return this._addresses;
	}

	/**
	 * Getter phones
	 * @return {ContactreferenceModel[]}
	 */
	public get phones(): ContactreferenceModel[] {
		return this._phones;
	}

	/**
	 * Setter provider
	 * @param {string} value
	 */
	public set provider(value: string) {
		this._provider = value;
	}

	/**
	 * Setter photoUrl
	 * @param {string} value
	 */
	public set photoUrl(value: string) {
		this._photoUrl = value;
	}

	/**
	 * Setter authToken
	 * @param {string} value
	 */
	public set authToken(value: string) {
		this._authToken = value;
	}

	/**
	 * Setter idToken
	 * @param {string} value
	 */
	public set idToken(value: string) {
		this._idToken = value;
	}

	/**
	 * Setter authorizationCode
	 * @param {string} value
	 */
	public set authorizationCode(value: string) {
		this._authorizationCode = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter addresses
	 * @param {AddressModel[]} value
	 */
	public set addresses(value: AddressModel[]) {
		this._addresses = value;
	}

	/**
	 * Setter phones
	 * @param {ContactreferenceModel[]} value
	 */
	public set phones(value: ContactreferenceModel[]) {
		this._phones = value;
	}
}

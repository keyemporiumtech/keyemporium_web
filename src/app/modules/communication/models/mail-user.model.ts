import { ApiModel } from '../../api/cakeutils/base/api.model';

export class MailUserModel extends ApiModel {
	private _id_user: string;
	private _name: string;
	private _email: string;
	private _nickname: string;

	/**
	 * Getter id_user
	 * @return {string}
	 */
	public get id_user(): string {
		return this._id_user;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter email
	 * @return {string}
	 */
	public get email(): string {
		return this._email;
	}

	/**
	 * Getter nickname
	 * @return {string}
	 */
	public get nickname(): string {
		return this._nickname;
	}

	/**
	 * Setter id_user
	 * @param {string} value
	 */
	public set id_user(value: string) {
		this._id_user = value;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter email
	 * @param {string} value
	 */
	public set email(value: string) {
		this._email = value;
	}

	/**
	 * Setter nickname
	 * @param {string} value
	 */
	public set nickname(value: string) {
		this._nickname = value;
	}
}

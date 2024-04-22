import { ApiModel } from '../../api/cakeutils/base/api.model';
import { NewsletterModel } from './newsletter.model';
import { UserModel } from './user.model';

export class UsernewsletterModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _user: UserModel;
	private _newsletter: NewsletterModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter title
	 * @return {string}
	 */
	public get title(): string {
		return this._title;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter newsletter
	 * @return {NewsletterModel}
	 */
	public get newsletter(): NewsletterModel {
		return this._newsletter;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter title
	 * @param {string} value
	 */
	public set title(value: string) {
		this._title = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter newsletter
	 * @param {NewsletterModel} value
	 */
	public set newsletter(value: NewsletterModel) {
		this._newsletter = value;
	}
}

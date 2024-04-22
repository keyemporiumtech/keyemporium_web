import { ApiModel } from '../../api/cakeutils/base/api.model';
import { NewsletterModel } from '../../authentication/models/newsletter.model';
import { MailModel } from './mail.model';

export class MailnewsletterModel extends ApiModel {
	private _cod: string;
	private _mail: MailModel;
	private _newsletter: NewsletterModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter mail
	 * @return {MailModel}
	 */
	public get mail(): MailModel {
		return this._mail;
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
	 * Setter mail
	 * @param {MailModel} value
	 */
	public set mail(value: MailModel) {
		this._mail = value;
	}

	/**
	 * Setter newsletter
	 * @param {NewsletterModel} value
	 */
	public set newsletter(value: NewsletterModel) {
		this._newsletter = value;
	}
}

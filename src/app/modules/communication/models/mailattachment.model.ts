import { ApiModel } from '../../api/cakeutils/base/api.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { MailModel } from './mail.model';

export class MailattachmentModel extends ApiModel {
	private _cod: string;
	private _mail: MailModel;
	private _attachment: AttachmentModel;

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
	 * Getter attachment
	 * @return {AttachmentModel}
	 */
	public get attachment(): AttachmentModel {
		return this._attachment;
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
	 * Setter attachment
	 * @param {AttachmentModel} value
	 */
	public set attachment(value: AttachmentModel) {
		this._attachment = value;
	}
}

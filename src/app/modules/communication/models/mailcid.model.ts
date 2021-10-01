import { ApiModel } from '../../api/cakeutils/base/api.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { MailModel } from './mail.model';

export class MailcidModel extends ApiModel {
	private _cid: string;
	private _mail: MailModel;
	private _attachment: AttachmentModel;

	/**
	 * Getter cid
	 * @return {string}
	 */
	public get cid(): string {
		return this._cid;
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
	 * Setter cid
	 * @param {string} value
	 */
	public set cid(value: string) {
		this._cid = value;
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

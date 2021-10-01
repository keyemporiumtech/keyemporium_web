import { ApiModel } from '../../api/cakeutils/base/api.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { MailModel } from './mail.model';
import { MailreceiverModel } from './mailreceiver.model';

export class MailDetailModel extends ApiModel {
	private _mail: MailModel;
	private _destinators: MailreceiverModel[];
	private _cc: MailreceiverModel[];
	private _ccn: MailreceiverModel[];
	private _attachments: AttachmentModel[];
	private _cids: AttachmentModel[];
	private _body: string;
	private _html: string;

	/**
	 * Getter mail
	 * @return {MailModel}
	 */
	public get mail(): MailModel {
		return this._mail;
	}

	/**
	 * Getter destinators
	 * @return {MailreceiverModel[]}
	 */
	public get destinators(): MailreceiverModel[] {
		return this._destinators;
	}

	/**
	 * Getter cc
	 * @return {MailreceiverModel[]}
	 */
	public get cc(): MailreceiverModel[] {
		return this._cc;
	}

	/**
	 * Getter ccn
	 * @return {MailreceiverModel[]}
	 */
	public get ccn(): MailreceiverModel[] {
		return this._ccn;
	}

	/**
	 * Getter attachments
	 * @return {AttachmentModel[]}
	 */
	public get attachments(): AttachmentModel[] {
		return this._attachments;
	}

	/**
	 * Getter cids
	 * @return {AttachmentModel[]}
	 */
	public get cids(): AttachmentModel[] {
		return this._cids;
	}

	/**
	 * Getter body
	 * @return {string}
	 */
	public get body(): string {
		return this._body;
	}

	/**
	 * Getter html
	 * @return {string}
	 */
	public get html(): string {
		return this._html;
	}

	/**
	 * Setter mail
	 * @param {MailModel} value
	 */
	public set mail(value: MailModel) {
		this._mail = value;
	}

	/**
	 * Setter destinators
	 * @param {MailreceiverModel[]} value
	 */
	public set destinators(value: MailreceiverModel[]) {
		this._destinators = value;
	}

	/**
	 * Setter cc
	 * @param {MailreceiverModel[]} value
	 */
	public set cc(value: MailreceiverModel[]) {
		this._cc = value;
	}

	/**
	 * Setter ccn
	 * @param {MailreceiverModel[]} value
	 */
	public set ccn(value: MailreceiverModel[]) {
		this._ccn = value;
	}

	/**
	 * Setter attachments
	 * @param {AttachmentModel[]} value
	 */
	public set attachments(value: AttachmentModel[]) {
		this._attachments = value;
	}

	/**
	 * Setter cids
	 * @param {AttachmentModel[]} value
	 */
	public set cids(value: AttachmentModel[]) {
		this._cids = value;
	}

	/**
	 * Setter body
	 * @param {string} value
	 */
	public set body(value: string) {
		this._body = value;
	}

	/**
	 * Setter html
	 * @param {string} value
	 */
	public set html(value: string) {
		this._html = value;
	}
}

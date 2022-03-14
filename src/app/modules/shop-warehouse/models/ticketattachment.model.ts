import { ApiModel } from '../../api/cakeutils/base/api.model';
import { TicketModel } from './ticket.model';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class TicketattachmentModel extends ApiModel {
	private _cod: string;
	private _ticket: TicketModel;
	private _attachment: AttachmentModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter ticket
	 * @return {TicketModel}
	 */
	public get ticket(): TicketModel {
		return this._ticket;
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
	 * Setter ticket
	 * @param {TicketModel} value
	 */
	public set ticket(value: TicketModel) {
		this._ticket = value;
	}

	/**
	 * Setter attachment
	 * @param {AttachmentModel} value
	 */
	public set attachment(value: AttachmentModel) {
		this._attachment = value;
	}
}

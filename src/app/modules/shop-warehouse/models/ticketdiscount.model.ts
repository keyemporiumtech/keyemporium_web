import { ApiModel } from '../../api/cakeutils/base/api.model';
import { TicketModel } from './ticket.model';
import { DiscountModel } from './discount.model';

export class TicketdiscountModel extends ApiModel {
	private _cod: string;
	private _ticket: TicketModel;
	private _discount: DiscountModel;

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
	 * Getter discount
	 * @return {DiscountModel}
	 */
	public get discount(): DiscountModel {
		return this._discount;
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
	 * Setter discount
	 * @param {DiscountModel} value
	 */
	public set discount(value: DiscountModel) {
		this._discount = value;
	}
}

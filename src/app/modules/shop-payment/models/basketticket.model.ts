import { ApiModel } from '../../api/cakeutils/base/api.model';
import { TicketModel } from '../../shop-warehouse/models/ticket.model';
import { BasketModel } from './basket.model';

export class BasketticketModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _ticket: TicketModel;
	private _basket: BasketModel;

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
	 * Getter ticket
	 * @return {TicketModel}
	 */
	public get ticket(): TicketModel {
		return this._ticket;
	}

	/**
	 * Getter basket
	 * @return {BasketModel}
	 */
	public get basket(): BasketModel {
		return this._basket;
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
	 * Setter ticket
	 * @param {TicketModel} value
	 */
	public set ticket(value: TicketModel) {
		this._ticket = value;
	}

	/**
	 * Setter basket
	 * @param {BasketModel} value
	 */
	public set basket(value: BasketModel) {
		this._basket = value;
	}
}

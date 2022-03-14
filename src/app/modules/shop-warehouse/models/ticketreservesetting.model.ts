import { ApiModel } from '../../api/cakeutils/base/api.model';
import { TicketModel } from './ticket.model';
import { ReservationsettingModel } from './reservationsetting.model';

export class TicketreservesettingModel extends ApiModel {
	private _cod: string;
	private _ticket: TicketModel;
	private _settings: ReservationsettingModel;

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
	 * Getter settings
	 * @return {ReservationsettingModel}
	 */
	public get settings(): ReservationsettingModel {
		return this._settings;
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
	 * Setter settings
	 * @param {ReservationsettingModel} value
	 */
	public set settings(value: ReservationsettingModel) {
		this._settings = value;
	}
}

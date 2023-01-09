import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PocketModel } from './pocket.model';
import { ReservationsettingModel } from './reservationsetting.model';

export class PocketreservesettingModel extends ApiModel {
	private _cod: string;
	private _pocket: PocketModel;
	private _settings: ReservationsettingModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter pocket
	 * @return {PocketModel}
	 */
	public get pocket(): PocketModel {
		return this._pocket;
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
	 * Setter pocket
	 * @param {PocketModel} value
	 */
	public set pocket(value: PocketModel) {
		this._pocket = value;
	}

	/**
	 * Setter settings
	 * @param {ReservationsettingModel} value
	 */
	public set settings(value: ReservationsettingModel) {
		this._settings = value;
	}
}

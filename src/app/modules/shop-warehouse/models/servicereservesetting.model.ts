import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ServiceModel } from './service.model';
import { ReservationsettingModel } from './reservationsetting.model';

export class ServicereservesettingModel extends ApiModel {
	private _cod: string;
	private _service: ServiceModel;
	private _settings: ReservationsettingModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter service
	 * @return {ServiceModel}
	 */
	public get service(): ServiceModel {
		return this._service;
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
	 * Setter service
	 * @param {ServiceModel} value
	 */
	public set service(value: ServiceModel) {
		this._service = value;
	}

	/**
	 * Setter settings
	 * @param {ReservationsettingModel} value
	 */
	public set settings(value: ReservationsettingModel) {
		this._settings = value;
	}
}

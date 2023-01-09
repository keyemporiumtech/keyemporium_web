import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ServiceModel } from './service.model';
import { DiscountModel } from './discount.model';

export class ServicediscountModel extends ApiModel {
	private _cod: string;
	private _service: ServiceModel;
	private _discount: DiscountModel;

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
	 * Setter service
	 * @param {ServiceModel} value
	 */
	public set service(value: ServiceModel) {
		this._service = value;
	}

	/**
	 * Setter discount
	 * @param {DiscountModel} value
	 */
	public set discount(value: DiscountModel) {
		this._discount = value;
	}
}

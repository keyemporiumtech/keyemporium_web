import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ServiceModel } from '../../shop-warehouse/models/service.model';
import { BasketModel } from './basket.model';

export class BasketserviceModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _service: ServiceModel;
	private _basket: BasketModel;
	private _quantity: number;
	private _dtainit: string;
	private _dtaend: string;

	public get dtainitModel(): DateModel {
		return new DateModel(this.dtainit);
	}
	public get dtainitFormat(): string {
		const dateModel = new DateModel(this.dtainit);
		return dateModel.toString();
	}

	public get dtaendModel(): DateModel {
		return new DateModel(this.dtaend);
	}
	public get dtaendFormat(): string {
		const dateModel = new DateModel(this.dtaend);
		return dateModel.toString();
	}

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
	 * Getter service
	 * @return {ServiceModel}
	 */
	public get service(): ServiceModel {
		return this._service;
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
	 * Setter service
	 * @param {ServiceModel} value
	 */
	public set service(value: ServiceModel) {
		this._service = value;
	}

	/**
	 * Setter basket
	 * @param {BasketModel} value
	 */
	public set basket(value: BasketModel) {
		this._basket = value;
	}

	/**
	 * Getter dtainit
	 * @return {string}
	 */
	public get dtainit(): string {
		return this._dtainit;
	}

	/**
	 * Getter dtaend
	 * @return {string}
	 */
	public get dtaend(): string {
		return this._dtaend;
	}

	/**
	 * Setter dtainit
	 * @param {string} value
	 */
	public set dtainit(value: string) {
		this._dtainit = value;
	}

	/**
	 * Setter dtaend
	 * @param {string} value
	 */
	public set dtaend(value: string) {
		this._dtaend = value;
	}

	/**
	 * Getter quantity
	 * @return {number}
	 */
	public get quantity(): number {
		return this._quantity;
	}

	/**
	 * Setter quantity
	 * @param {number} value
	 */
	public set quantity(value: number) {
		this._quantity = value;
	}
}

import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PocketModel } from '../../shop-warehouse/models/pocket.model';
import { BasketModel } from './basket.model';

export class BasketpocketModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _pocket: PocketModel;
	private _quantity: number;
	private _basket: BasketModel;
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
	 * Getter pocket
	 * @return {PocketModel}
	 */
	public get pocket(): PocketModel {
		return this._pocket;
	}

	/**
	 * Getter basket
	 * @return {BasketModel}
	 */
	public get basket(): BasketModel {
		return this._basket;
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
	 * Setter pocket
	 * @param {PocketModel} value
	 */
	public set pocket(value: PocketModel) {
		this._pocket = value;
	}

	/**
	 * Setter basket
	 * @param {BasketModel} value
	 */
	public set basket(value: BasketModel) {
		this._basket = value;
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

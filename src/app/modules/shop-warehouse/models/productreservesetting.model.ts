import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ProductModel } from './product.model';
import { ReservationsettingModel } from './reservationsetting.model';

export class ProductreservesettingModel extends ApiModel {
	private _cod: string;
	private _product: ProductModel;
	private _settings: ReservationsettingModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter product
	 * @return {ProductModel}
	 */
	public get product(): ProductModel {
		return this._product;
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
	 * Setter product
	 * @param {ProductModel} value
	 */
	public set product(value: ProductModel) {
		this._product = value;
	}

	/**
	 * Setter settings
	 * @param {ReservationsettingModel} value
	 */
	public set settings(value: ReservationsettingModel) {
		this._settings = value;
	}
}

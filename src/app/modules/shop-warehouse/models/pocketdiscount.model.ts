import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PocketModel } from './pocket.model';
import { DiscountModel } from './discount.model';

export class PocketdiscountModel extends ApiModel {
	private _cod: string;
	private _pocket: PocketModel;
	private _discount: DiscountModel;

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
	 * Setter pocket
	 * @param {PocketModel} value
	 */
	public set pocket(value: PocketModel) {
		this._pocket = value;
	}

	/**
	 * Setter discount
	 * @param {DiscountModel} value
	 */
	public set discount(value: DiscountModel) {
		this._discount = value;
	}
}

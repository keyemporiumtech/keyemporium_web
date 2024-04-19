import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PaymentModel } from '../../shop-payment/models/payment.model';
import { BalancedocModel } from './balancedoc.model';

export class BalancedocpaymentModel extends ApiModel {
	private _cod: string;
	private _balancedoc: BalancedocModel;
	private _payment: PaymentModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter balancedoc
	 * @return {BalancedocModel}
	 */
	public get balancedoc(): BalancedocModel {
		return this._balancedoc;
	}

	/**
	 * Getter payment
	 * @return {PaymentModel}
	 */
	public get payment(): PaymentModel {
		return this._payment;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter balancedoc
	 * @param {BalancedocModel} value
	 */
	public set balancedoc(value: BalancedocModel) {
		this._balancedoc = value;
	}

	/**
	 * Setter payment
	 * @param {PaymentModel} value
	 */
	public set payment(value: PaymentModel) {
		this._payment = value;
	}
}

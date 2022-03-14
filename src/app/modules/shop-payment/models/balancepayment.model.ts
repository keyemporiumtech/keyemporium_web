import { ApiModel } from '../../api/cakeutils/base/api.model';
import { BalanceModel } from './balance.model';
import { PaymentModel } from './payment.model';

export class BalancepaymentModel extends ApiModel {
	private _cod: string;
	private _balance: BalanceModel;
	private _payment: PaymentModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter balance
	 * @return {BalanceModel}
	 */
	public get balance(): BalanceModel {
		return this._balance;
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
	 * Setter balance
	 * @param {BalanceModel} value
	 */
	public set balance(value: BalanceModel) {
		this._balance = value;
	}

	/**
	 * Setter payment
	 * @param {PaymentModel} value
	 */
	public set payment(value: PaymentModel) {
		this._payment = value;
	}
}

import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';

export class GooglerecaptchaVerifyModel extends ApiModel {
	private _success: boolean;
	private _challenge: string;
	private _hostname: string;
	private _errors: string[];

	// other
	private _messages: string[];
	public get challengeModel(): DateModel {
		return new DateModel(this.challenge);
	}
	public get challengeFormat(): string {
		const dateModel = new DateModel(this.challenge);
		return dateModel.toString();
	}

	/**
	 * Getter messages
	 * @return {string[]}
	 */
	public get messages(): string[] {
		return this._messages;
	}

	/**
	 * Setter messages
	 * @param {string[]} value
	 */
	public set messages(value: string[]) {
		this._messages = value;
	}

	/**
	 * Getter success
	 * @return {boolean}
	 */
	public get success(): boolean {
		return this._success;
	}

	/**
	 * Getter challenge
	 * @return {string}
	 */
	public get challenge(): string {
		return this._challenge;
	}

	/**
	 * Getter hostname
	 * @return {string}
	 */
	public get hostname(): string {
		return this._hostname;
	}

	/**
	 * Getter errors
	 * @return {string[]}
	 */
	public get errors(): string[] {
		return this._errors;
	}

	/**
	 * Setter success
	 * @param {boolean} value
	 */
	public set success(value: boolean) {
		this._success = value;
	}

	/**
	 * Setter challenge
	 * @param {string} value
	 */
	public set challenge(value: string) {
		this._challenge = value;
	}

	/**
	 * Setter hostname
	 * @param {string} value
	 */
	public set hostname(value: string) {
		this._hostname = value;
	}

	/**
	 * Setter errors
	 * @param {string[]} value
	 */
	public set errors(value: string[]) {
		this._errors = value;
	}
}

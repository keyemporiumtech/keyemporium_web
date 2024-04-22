import { ApiModel } from '../../api/cakeutils/base/api.model';
import { TaskusecaseModel } from './taskusecase.model';

export class UsecaseoperationModel extends ApiModel {
	private _cod: string;
	private _operation: string;
	private _actorfrom: string;
	private _actorto: string;
	private _start: number;
	private _usecase: TaskusecaseModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter operation
	 * @return {string}
	 */
	public get operation(): string {
		return this._operation;
	}

	/**
	 * Getter actorfrom
	 * @return {string}
	 */
	public get actorfrom(): string {
		return this._actorfrom;
	}

	/**
	 * Getter actorto
	 * @return {string}
	 */
	public get actorto(): string {
		return this._actorto;
	}

	/**
	 * Getter start
	 * @return {number}
	 */
	public get start(): number {
		return this._start;
	}

	/**
	 * Getter usecase
	 * @return {TaskusecaseModel}
	 */
	public get usecase(): TaskusecaseModel {
		return this._usecase;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter operation
	 * @param {string} value
	 */
	public set operation(value: string) {
		this._operation = value;
	}

	/**
	 * Setter actorfrom
	 * @param {string} value
	 */
	public set actorfrom(value: string) {
		this._actorfrom = value;
	}

	/**
	 * Setter actorto
	 * @param {string} value
	 */
	public set actorto(value: string) {
		this._actorto = value;
	}

	/**
	 * Setter start
	 * @param {number} value
	 */
	public set start(value: number) {
		this._start = value;
	}

	/**
	 * Setter usecase
	 * @param {TaskusecaseModel} value
	 */
	public set usecase(value: TaskusecaseModel) {
		this._usecase = value;
	}
}

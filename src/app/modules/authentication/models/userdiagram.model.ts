import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumDiagramType } from '../enums/diagram-type.enum';
import { UserModel } from './user.model';

export class UserdiagramModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _jsonmodel: string;
	private _tpdiagram: TypologicalModel;
	private _user: UserModel;
	// enums
	private _tpdiagramEnum: EnumDiagramType;

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
	 * Getter jsonmodel
	 * @return {string}
	 */
	public get jsonmodel(): string {
		return this._jsonmodel;
	}

	/**
	 * Getter tpdiagram
	 * @return {TypologicalModel}
	 */
	public get tpdiagram(): TypologicalModel {
		return this._tpdiagram;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter tpdiagramEnum
	 * @return {EnumDiagramType}
	 */
	public get tpdiagramEnum(): EnumDiagramType {
		return this._tpdiagramEnum;
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
	 * Setter jsonmodel
	 * @param {string} value
	 */
	public set jsonmodel(value: string) {
		this._jsonmodel = value;
	}

	/**
	 * Setter tpdiagram
	 * @param {TypologicalModel} value
	 */
	public set tpdiagram(value: TypologicalModel) {
		this._tpdiagram = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter tpdiagramEnum
	 * @param {EnumDiagramType} value
	 */
	public set tpdiagramEnum(value: EnumDiagramType) {
		this._tpdiagramEnum = value;
	}
}

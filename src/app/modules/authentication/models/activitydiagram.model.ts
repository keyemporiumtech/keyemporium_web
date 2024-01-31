import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumDiagramType } from '../enums/diagram-type.enum';
import { ActivityModel } from './activity.model';

export class ActivitydiagramModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _jsonmodel: string;
	private _tpdiagram: TypologicalModel;
	private _activity: ActivityModel;
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
	 * Getter activity
	 * @return {ActivityModel}
	 */
	public get activity(): ActivityModel {
		return this._activity;
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
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Setter tpdiagramEnum
	 * @param {EnumDiagramType} value
	 */
	public set tpdiagramEnum(value: EnumDiagramType) {
		this._tpdiagramEnum = value;
	}
}

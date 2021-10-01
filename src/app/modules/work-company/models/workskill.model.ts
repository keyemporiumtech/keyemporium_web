import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumSkillType } from '../enums/skill-type.enum';

export class WorkskillModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _description: string;
	private _tpskill: TypologicalModel;
	private _levelmax: number;
	private _leveldesc: string;
	// enums
	private _tpskillEnum: EnumSkillType;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter tpskill
	 * @return {TypologicalModel}
	 */
	public get tpskill(): TypologicalModel {
		return this._tpskill;
	}

	/**
	 * Getter levelmax
	 * @return {number}
	 */
	public get levelmax(): number {
		return this._levelmax;
	}

	/**
	 * Getter leveldesc
	 * @return {string}
	 */
	public get leveldesc(): string {
		return this._leveldesc;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter tpskill
	 * @param {TypologicalModel} value
	 */
	public set tpskill(value: TypologicalModel) {
		this._tpskill = value;
	}

	/**
	 * Setter levelmax
	 * @param {number} value
	 */
	public set levelmax(value: number) {
		this._levelmax = value;
	}

	/**
	 * Setter leveldesc
	 * @param {string} value
	 */
	public set leveldesc(value: string) {
		this._leveldesc = value;
	}

	/**
	 * Getter tpskillEnum
	 * @return {EnumSkillType}
	 */
	public get tpskillEnum(): EnumSkillType {
		return this._tpskillEnum;
	}

	/**
	 * Setter tpskillEnum
	 * @param {EnumSkillType} value
	 */
	public set tpskillEnum(value: EnumSkillType) {
		this._tpskillEnum = value;
	}
}

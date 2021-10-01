import { TypeConverter } from '@ddc/kit';
import { TypologicalModel } from '../models/typological.model';

export class TypologycalEnumConverter<B> extends TypeConverter<TypologicalModel, B> {
	convertToEnum(typological: TypologicalModel): B {
		if (!typological) {
			return undefined;
		}
		return super.convertToB(typological.id);
	}

	convertToTypological(enumeration: B): TypologicalModel {
		if (!enumeration) {
			return undefined;
		}
		const model = new TypologicalModel();
		model.id = enumeration;
		return model;
	}

	public convertToEnumList(fromArray?: TypologicalModel[]): B[] {
		if (!fromArray || !fromArray.length) {
			return this.getEmptyEnumList();
		}
		const array: B[] = [];
		for (const entity of fromArray) {
			if (entity != null && entity !== undefined) {
				array.push(this.convertToEnum(entity));
			}
		}
		return array;
	}

	public convertToTypologicalList(fromArray?: B[]): TypologicalModel[] {
		if (!fromArray || !fromArray.length) {
			return this.getEmptyTypologicalList();
		}
		const array: TypologicalModel[] = [];
		for (const entity of fromArray) {
			if (entity != null && entity !== undefined) {
				array.push(this.convertToTypological(entity));
			}
		}
		return array;
	}

	public getEmptyEnumList(): B[] {
		const arr: B[] = [];
		// arr.push(this.getEmptyModel());
		return arr;
	}

	public getEmptyTypologicalList(): TypologicalModel[] {
		const arr: TypologicalModel[] = [];
		// arr.push(this.getEmptyModel());
		return arr;
	}
}

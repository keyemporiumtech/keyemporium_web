export class TypeConverter<A, B> {
	convertToB(entity: A): B {
		if (!entity) {
			return undefined;
		}
		return entity as unknown as B;
	}

	convertToA(entity: B): A {
		if (!entity) {
			return undefined;
		}
		return entity as unknown as A;
	}

	public convertToBList(fromArray?: A[]): B[] {
		if (!fromArray || !fromArray.length) {
			return this.getEmptyBList();
		}
		const array: B[] = [];
		for (const entity of fromArray) {
			if (entity != null && entity !== undefined) {
				array.push(this.convertToB(entity));
			}
		}
		return array;
	}

	public convertToAList(fromArray?: B[]): A[] {
		if (!fromArray || !fromArray.length) {
			return this.getEmptyAList();
		}
		const array: A[] = [];
		for (const entity of fromArray) {
			if (entity != null && entity !== undefined) {
				array.push(this.convertToA(entity));
			}
		}
		return array;
	}

	public getEmptyBList(): B[] {
		const arr: B[] = [];
		// arr.push(this.getEmptyModel());
		return arr;
	}

	public getEmptyAList(): A[] {
		const arr: A[] = [];
		// arr.push(this.getEmptyModel());
		return arr;
	}
}

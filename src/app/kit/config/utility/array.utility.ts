export class ArrayUtility {
	static sameByField(a: any[], b: any[], field: string): boolean {
		for (let i = 0; i < a.length; i++) {
			if (a[i][field] !== b[i][field]) {
				return false;
			}
		}
		return true;
	}

	static sortAscByField(items: any, field: string) {
		return items.sort(function (a, b) {
			if (a[field] && b[field]) {
				const nameA = typeof a[field] === 'string' ? a[field].toUpperCase() : a[field]; // ignora maiuscole e minuscole
				const nameB = typeof b[field] === 'string' ? b[field].toUpperCase() : b[field]; // ignora maiuscole e minuscole
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				// i nomi devono essere uguali
				return 0;
			}
		});
	}

	static sortDescByField(items: any, field: string) {
		return items.sort(function (a, b) {
			if (a[field] && b[field]) {
				const nameA = typeof a[field] === 'string' ? a[field].toUpperCase() : a[field]; // ignora maiuscole e minuscole
				const nameB = typeof b[field] === 'string' ? b[field].toUpperCase() : b[field]; // ignora maiuscole e minuscole
				if (nameA < nameB) {
					return 1;
				}
				if (nameA > nameB) {
					return -1;
				}
				// i nomi devono essere uguali
				return 0;
			}
		});
	}

	static paginate(items: any, rowsForPage: number, page: number) {
		// human-readable page numbers usually start with 1, so we reduce 1 in the first argument
		return items.slice((page - 1) * rowsForPage, page * rowsForPage);
	}

	/**
	 * Aggiunge ad tutti gli elementi di b non già contenuti in a
	 * @param a array origine
	 * @param b array di union
	 */
	static addUniqueValues(a: any[], b: any[]) {
		b.forEach((value) => {
			if (a.indexOf(value) === -1) {
				a.push(value);
			}
		});
	}

	/**
	 * Ritorna l'unione di due array
	 * @param a array primo
	 * @param b array secondo
	 */
	static union(a: any[], b: any[]) {
		return [...a, ...b];
	}

	/**
	 * Come addUniqueValue ma senza modificare l'array di origine
	 * @param a array origine
	 * @param b array di union
	 */
	static unionUnique(a: any[], b: any[]) {
		return a.concat(b.filter((el) => !a.includes(el)));
	}

	/**
	 * Ritorna tutti i valori comuni ai due array
	 * @param a array primo
	 * @param b array secondo
	 */
	static intersection(a: any[], b: any[]) {
		return a.filter((x) => b.includes(x));
	}

	/**
	 * Ritorna tutti i valori di a che non sono inclusi in b
	 * @param a array origine
	 * @param b array da confrontare
	 */
	static difference(a: any[], b: any[]) {
		return a.filter((x) => b.includes(x));
	}

	/**
	 * Ritorna tutti i valori di a che non sono inclusi in b e viceversa,
	 * ovvero tutti i valori non comuni ai due array
	 * @param a array primo
	 * @param b array secondo
	 */
	static differenceSymmetrical(a: any[], b: any[]) {
		return a.filter((x) => !b.includes(x)).concat(b.filter((x) => !a.includes(x)));
	}

	static sum(arr: any[], key: string): number {
		return arr.reduce((a, b) => a + (b[key] || 0), 0);
	}
}

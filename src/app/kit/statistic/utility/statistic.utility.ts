import { RowStatsInterface } from '../models/row-stats.interface';

export class StatisticUtility {
	//frequenza attesa
	static frequencyExpected(rows: RowStatsInterface[]) {
		this.buildTotRow(rows);

		const totTable: number = rows.map((el) => el.totRow).reduce((a, b) => a + b);

		rows.forEach((row) => {
			if (row.values && row.values.length) {
				row.values.forEach((col) => {
					if (row.totRow && col.totCol) {
						col.frequencyExpected = (row.totRow * col.totCol) / totTable;
					}
				});
			}
		});
	}

	// chisquare
	static chiSquare(rows: RowStatsInterface[]) {
		this.frequencyExpected(rows);

		rows.forEach((row) => {
			if (row.values && row.values.length) {
				row.values.forEach((col) => {
					if (col.value && col.frequencyExpected) {
						col.chiSquare = Math.pow(col.value - col.frequencyExpected, 2) / col.frequencyExpected;
					}
				});
			}
		});
	}

	// aggregations
	static buildTotRow(rows: RowStatsInterface[]) {
		let cols: number[];
		const arrCols: any[] = [];
		rows.forEach((row) => {
			if (row.values && row.values.length) {
				cols = row.values.map((el) => el.value);
				arrCols.push(cols);
				row.totRow = cols.reduce((a, b) => a + b);
			} else {
				row.totRow = 0;
			}
		});

		const totCols = this.sommaColonneFunc(arrCols);

		rows.forEach((row) => {
			if (row.values && row.values.length) {
				for (let i = 0; i < row.values.length; i++) {
					row.values[i].totCol = totCols[i];
				}
			}
		});
	}

	static sommaColonneFunc(matrix: any[]) {
		return matrix[0].map((_: any, colIndex: number) =>
			matrix.reduce((acc, currRow) => acc + currRow[colIndex], 0),
		);
	}
}

import jStat from 'jstat';
import { StatisticUtility } from '../..';
import { RowStatsInterface } from '../models/row-stats.interface';
export class ChiSquareUtility {
	static chiSquareCriticalValue(df: number, alpha: number): number {
		return jStat.chisquare.inv(1 - alpha, df).toFixed(4);
	}

	static getChiSquare(rows: RowStatsInterface[]): number {
		StatisticUtility.chiSquare(rows);

		let chiSquare: number = 0;
		rows.forEach((row) => {
			chiSquare += row.values.map((el) => el.chiSquare).reduce((a, b) => a + b);
		});
		return chiSquare;
	}

	static getDegreesFreedom(rows: RowStatsInterface[]): number {
		if (rows.length && rows[0].values && rows[0].values.length) {
			return (rows.length - 1) * (rows[0].values.length - 1);
		}
		return 0;
	}
}

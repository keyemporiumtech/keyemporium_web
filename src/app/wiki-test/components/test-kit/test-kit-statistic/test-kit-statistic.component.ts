/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { ChiSquareUtility, ColStatsInterface, RowStatsInterface } from '@ddc/kit';

@Component({
	selector: 'wiki-test-kit-statistic',
	templateUrl: './test-kit-statistic.component.html',
	styleUrls: ['./test-kit-statistic.component.scss'],
})
export class TestKitStatisticComponent {
	// tabella percentile chi quadro
	df: number = 1;
	alpha: number = 0.5;
	tablePercentile: number = 0;

	calcPercentile() {
		this.tablePercentile = ChiSquareUtility.chiSquareCriticalValue(this.df, this.alpha);
	}

	// calcolo chi quadro
	labelR1: string = '';
	labelR2: string = '';

	labelC1: string = '';
	labelC2: string = '';
	labelC3: string = '';

	val1_1: number = 0;
	val1_2: number = 0;
	val1_3: number = 0;
	val2_1: number = 0;
	val2_2: number = 0;
	val2_3: number = 0;

	chiSquare2x2: number = 0;
	tablePercentile2x2: number = 0;
	df2x2: number = 0;
	alpha2x2: number = 0.5;

	calcChiSquare2x2() {
		const col1_1: ColStatsInterface = {
			name: this.labelC1,
			value: this.val1_1,
		};
		const col1_2: ColStatsInterface = {
			name: this.labelC1,
			value: this.val1_2,
		};
		const col2_1: ColStatsInterface = {
			name: this.labelC2,
			value: this.val2_1,
		};
		const col2_2: ColStatsInterface = {
			name: this.labelC2,
			value: this.val2_2,
		};
		const row1: RowStatsInterface = {
			name: this.labelR1,
			values: [col1_1, col1_2],
		};
		const row2: RowStatsInterface = {
			name: this.labelR2,
			values: [col2_1, col2_2],
		};
		const rows = [row1, row2];
		this.chiSquare2x2 = ChiSquareUtility.getChiSquare(rows);

		this.df2x2 = ChiSquareUtility.getDegreesFreedom(rows);
		this.tablePercentile2x2 = ChiSquareUtility.chiSquareCriticalValue(this.df2x2, this.alpha2x2);
	}
}

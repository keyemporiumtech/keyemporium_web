import { RowStatsInterface } from '../models/row-stats.interface';

export interface ChisquareInterface {
	table?: RowStatsInterface[];
	chisquare?: number;
	percentile?: number;
	pvalue?: number;
}

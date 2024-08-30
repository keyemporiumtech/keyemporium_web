import { ColStatsInterface } from './col.stats.interface';

export interface RowStatsInterface {
	name?: string;
	values?: ColStatsInterface[];
	totRow?: number;
}

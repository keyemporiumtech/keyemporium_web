export interface StackOverflowFilter {
	page?: number;
	pagesize?: number;
	fromdate?: number; // date
	todate?: number; // date
	order?: 'desc' | 'asc';
	min?: number; // date
	max?: number; // date
	sort?: 'activity' | 'votes' | 'creation' | 'relevance';
	q?: string;
	accepted?: boolean;
	answer?: number;
	body?: string;
	closed?: boolean;
	migrated?: boolean;
	notice?: boolean;
	notagged?: string;
	tagged?: string;
	title?: string;
	user?: number;
	url?: string;
	views?: number;
	wiki?: boolean;
	// --- required
	site?: string;
}

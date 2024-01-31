import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface DecisionTreeModel extends GojsNodeDataModel {
	category: 'decision' | 'personality';
	title: string;
	// style
	buttonA?: {
		key?: string;
		title?: string;
		description?: string;
		background?: string;
		color?: string;
		backgroundOver?: string;
		colorOver?: string;
	};
	buttonB?: {
		key?: string;
		title?: string;
		description?: string;
		background?: string;
		color?: string;
		backgroundOver?: string;
		colorOver?: string;
	};
}

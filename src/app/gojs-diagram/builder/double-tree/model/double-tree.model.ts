import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface DoubleTreeModel extends GojsNodeDataModel {
	dir?: 'left' | 'right';
	parent?: string;
	color?: string | go.Brush;
}

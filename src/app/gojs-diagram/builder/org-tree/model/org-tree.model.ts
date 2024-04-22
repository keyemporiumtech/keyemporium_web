import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface OrgTreeModel extends GojsNodeDataModel {
	parent?: number | string;
	name: string;
	role: string;
	pic?: string;
	picContent?: string;
	matricola?: string;
	skills?: string[];
	// others
	parentObj?: OrgTreeModel;
}

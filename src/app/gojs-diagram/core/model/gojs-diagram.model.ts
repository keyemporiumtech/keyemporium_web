import { GojsLinkDataModel } from './gojs-link-data.model';
import { GojsNodeDataModel } from './gojs-node-data.model';

export interface GojsDiagramModel {
	diagramNodeData?: any | GojsNodeDataModel[];
	diagramLinkData?: any | GojsLinkDataModel[];
	diagramModelData?: any;
	skipsDiagramUpdate?: boolean;
}

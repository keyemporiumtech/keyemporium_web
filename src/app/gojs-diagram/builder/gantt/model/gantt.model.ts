import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface GanttModel extends GojsNodeDataModel {
	text: string;
	color?: string; // preferr to use hexa not name as yellow
	start?: number;
	duration?: number;
	init?: Date;
	end?: Date;
}

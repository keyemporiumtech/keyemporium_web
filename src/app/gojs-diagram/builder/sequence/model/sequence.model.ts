import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface SequenceModel extends GojsNodeDataModel {
	init?: number;
	fromGroup?: string | number | undefined;
	toGroup?: string | number | undefined;
}

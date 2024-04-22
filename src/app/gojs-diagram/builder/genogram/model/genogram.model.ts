import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface GenogramModel extends GojsNodeDataModel {
	key?: number;
	n?: string; // name
	s?: 'M' | 'F'; //gender
	m?: number; // mother
	f?: number; // father
	ux?: number; // wife
	vir?: number; // husband
	a?: string[]; // type small
	color?: string; // type
}

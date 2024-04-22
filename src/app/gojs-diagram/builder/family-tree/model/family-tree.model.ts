import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';

export interface FamilyTreeModel extends GojsNodeDataModel {
	father?: number | string;
	mother?: number | string;
	name: string;
	gender: 'M' | 'F';
	birthDate?: Date;
	deathDate?: Date;
	wife?: number | string;
	husband?: number | string;
	brothers?: (number | string)[];
}

export enum EnumFamilyLinkCategory {
	NONE = '0',
	PARENT_CHILD = '1',
	SPOUSE = '2',
	BROTHER = '3',
}

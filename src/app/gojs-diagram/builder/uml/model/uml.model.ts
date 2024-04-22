import { GojsNodeDataModel } from '../../../core/model/gojs-node-data.model';
import { UmlMethodModel } from './uml-method.model';
import { UmlPropertyModel } from './uml-property.model';

export interface UmlModel extends GojsNodeDataModel {
	name?: string;
	extends?: string;
	properties?: UmlPropertyModel[];
	methods?: UmlMethodModel[];
}

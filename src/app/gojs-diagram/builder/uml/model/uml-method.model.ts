import { UmlParameterModel } from './uml-parameter.model';

export interface UmlMethodModel {
	name?: string;
	parameters?: UmlParameterModel[];
	visibility?: string;
	type?: string;
}

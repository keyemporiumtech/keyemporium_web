import { ChartColorSchemaInterface } from './chart-color-schema.interface';

export interface ChartOptionsInterface {
	theme?: string;
	view?: any[]; // [1000, 400] - not used to fit
	colorSchemeName?:
		| 'vivid'
		| 'natural'
		| 'cool'
		| 'fire'
		| 'solar'
		| 'air'
		| 'aqua'
		| 'flame'
		| 'ocean'
		| 'forest'
		| 'horizon'
		| 'neons'
		| 'picnic'
		| 'night'
		| 'nightLights'
		| string;
	colorScheme?: ChartColorSchemaInterface;
	schemeType?: string;
	customColors?: any[];
	curveType?:
		| 'Basis'
		| 'Basis Closed'
		| 'Bundle'
		| 'Cardinal'
		| 'Cardinal Closed'
		| 'Catmull Rom'
		| 'Catmull Rom Closed'
		| 'Linear'
		| 'Linear Closed'
		| 'Monotone X'
		| 'Monotone Y'
		| 'Natural'
		| 'Step'
		| 'Step After'
		| 'Step Before'
		| 'default'
		| string;
}

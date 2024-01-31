import * as go from 'gojs';

export interface GojsLinkDataModel {
	key?: string | number | undefined;
	from?: string | number;
	to?: string | number;
	fromSpot?: go.Spot | string;
	toSpot?: go.Spot | string;
	curve?:
		| typeof go.Link.Bezier
		| typeof go.Link.JumpGap
		| typeof go.Link.JumpOver
		| typeof go.Link.None;
	routing?: typeof go.Link.Normal | typeof go.Link.Orthogonal | typeof go.Link.AvoidsNodes;
	text?: string;
	color?: string;
	size?: number;
	toArrow?: string;
	fromArrow?: string;
	arrowColor?: string;
	arrowSize?: number;
	arrowFromColor?: string;
	arrowFromSize?: number;
	category?: string;
	// personalizations
	payloads?: any;
}

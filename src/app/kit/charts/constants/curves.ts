import * as shape from 'd3-shape';

export const curves = {
	Basis: shape.curveBasis,
	'Basis Closed': shape.curveBasisClosed,
	Bundle: shape.curveBundle.beta(1),
	Cardinal: shape.curveCardinal,
	'Cardinal Closed': shape.curveCardinalClosed,
	'Catmull Rom': shape.curveCatmullRom,
	'Catmull Rom Closed': shape.curveCatmullRomClosed,
	Linear: shape.curveLinear,
	'Linear Closed': shape.curveLinearClosed,
	'Monotone X': shape.curveMonotoneX,
	'Monotone Y': shape.curveMonotoneY,
	Natural: shape.curveNatural,
	Step: shape.curveStep,
	'Step After': shape.curveStepAfter,
	'Step Before': shape.curveStepBefore,
	default: shape.curveLinear,
};

import { Component, OnInit } from '@angular/core';
import {
	EnumChartsType,
	ChartElementInterface,
	ChartOptionsInterface,
	ChartElementGroupInterface,
} from '@ddc/kit';

@Component({
	selector: 'wiki-test-kit-charts',
	templateUrl: './test-kit-charts.component.html',
	styleUrls: ['./test-kit-charts.component.scss'],
})
export class TestKitChartsComponent implements OnInit {
	chartType = EnumChartsType;
	// vertical bar
	dataVB: ChartElementInterface[] = [];
	dataVBGroup: ChartElementGroupInterface[] = [];
	optVB: ChartOptionsInterface = {};
	// currency
	dataVBCurrency: ChartElementInterface[] = [];
	dataVBCurrencyGroup: ChartElementGroupInterface[] = [];
	optVBCurrency: ChartOptionsInterface = {};

	// color and scheme
	dataVBColor: ChartElementInterface[] = [];
	optVBScheme: ChartOptionsInterface = {};
	optVB1: ChartOptionsInterface = {};
	optVB2: ChartOptionsInterface = {};

	// template
	optVBSchemeVivid: ChartOptionsInterface = {};
	optVBSchemeNatural: ChartOptionsInterface = {};
	optVBSchemeCool: ChartOptionsInterface = {};
	optVBSchemeFire: ChartOptionsInterface = {};
	optVBSchemeSolar: ChartOptionsInterface = {};
	optVBSchemeAir: ChartOptionsInterface = {};
	optVBSchemeAqua: ChartOptionsInterface = {};
	optVBSchemeFlame: ChartOptionsInterface = {};
	optVBSchemeOcean: ChartOptionsInterface = {};
	optVBSchemeForest: ChartOptionsInterface = {};
	optVBSchemeHorizon: ChartOptionsInterface = {};
	optVBSchemeNeons: ChartOptionsInterface = {};
	optVBSchemePicnic: ChartOptionsInterface = {};
	optVBSchemeNight: ChartOptionsInterface = {};
	optVBSchemeNightLights: ChartOptionsInterface = {};

	// curves
	optVBCurveBasis: ChartOptionsInterface = {};
	optVBCurveBasisClosed: ChartOptionsInterface = {};
	optVBCurveBundle: ChartOptionsInterface = {};
	optVBCurveCardinal: ChartOptionsInterface = {};
	optVBCurveCardinalClosed: ChartOptionsInterface = {};
	optVBCurveCatmullRom: ChartOptionsInterface = {};
	optVBCurveCatmullRomClosed: ChartOptionsInterface = {};
	optVBCurveLinear: ChartOptionsInterface = {};
	optVBCurveLinearClosed: ChartOptionsInterface = {};
	optVBCurveMonotoneX: ChartOptionsInterface = {};
	optVBCurveMonotoneY: ChartOptionsInterface = {};
	optVBCurveNatural: ChartOptionsInterface = {};
	optVBCurveStep: ChartOptionsInterface = {};
	optVBCurveStepAfter: ChartOptionsInterface = {};
	optVBCurveStepBefore: ChartOptionsInterface = {};
	optVBCurveStepDefault: ChartOptionsInterface = {};

	constructor() {
		this.initColorAndSchema();
		this.initSchemes();
		this.initCurves();
		this.initCurrency();
		this.initVerticalBar();
	}

	ngOnInit() {}

	private initColorAndSchema() {
		this.dataVBColor = [
			{
				name: 'Pen',
				value: 30,
				color: '#000000',
			},
			{
				name: 'Book',
				value: 50,
				color: '#777777',
			},
			{
				name: 'Table',
				value: 350,
				color: '#FF5733',
			},
		];

		this.optVBScheme.colorSchemeName = 'nightLights';
	}

	private initSchemes() {
		this.optVBSchemeVivid.colorSchemeName = 'vivid';
		this.optVBSchemeNatural.colorSchemeName = 'natural';
		this.optVBSchemeCool.colorSchemeName = 'cool';
		this.optVBSchemeFire.colorSchemeName = 'fire';
		this.optVBSchemeSolar.colorSchemeName = 'solar';
		this.optVBSchemeAir.colorSchemeName = 'air';
		this.optVBSchemeAqua.colorSchemeName = 'aqua';
		this.optVBSchemeFlame.colorSchemeName = 'flame';
		this.optVBSchemeOcean.colorSchemeName = 'ocean';
		this.optVBSchemeForest.colorSchemeName = 'forest';
		this.optVBSchemeHorizon.colorSchemeName = 'horizon';
		this.optVBSchemeNeons.colorSchemeName = 'neons';
		this.optVBSchemePicnic.colorSchemeName = 'picnic';
		this.optVBSchemeNight.colorSchemeName = 'night';
		this.optVBSchemeNightLights.colorSchemeName = 'nightLights';
	}

	private initCurves() {
		this.optVBCurveBasis.curveType = 'Basis';
		this.optVBCurveBasisClosed.curveType = 'Basis Closed';
		this.optVBCurveBundle.curveType = 'Bundle';
		this.optVBCurveCardinal.curveType = 'Cardinal';
		this.optVBCurveCardinalClosed.curveType = 'Cardinal Closed';
		this.optVBCurveCatmullRom.curveType = 'Catmull Rom';
		this.optVBCurveCatmullRomClosed.curveType = 'Catmull Rom Closed';
		this.optVBCurveLinear.curveType = 'Linear';
		this.optVBCurveLinearClosed.curveType = 'Linear Closed';
		this.optVBCurveMonotoneX.curveType = 'Monotone X';
		this.optVBCurveMonotoneY.curveType = 'Monotone Y';
		this.optVBCurveNatural.curveType = 'Natural';
		this.optVBCurveStep.curveType = 'Step';
		this.optVBCurveStepAfter.curveType = 'Step After';
		this.optVBCurveStepBefore.curveType = 'Step Before';
		this.optVBCurveStepDefault.curveType = 'default';
	}

	private initCurrency() {
		this.dataVBCurrency = [
			{
				name: 'Pen',
				value: 30,
			},
			{
				name: 'Book',
				value: 50,
			},
			{
				name: 'Table',
				value: 350,
			},
		];

		this.dataVBCurrencyGroup = [
			{
				name: 'Gruop1',
				series: [
					{
						name: 'Pen',
						value: 30,
					},
					{
						name: 'Book',
						value: 50,
					},
					{
						name: 'Table',
						value: 350,
					},
				],
			},
			{
				name: 'Gruop2',
				series: [
					{
						name: 'Sky',
						value: 300,
					},
					{
						name: 'Dazn',
						value: 150,
					},
				],
			},
		];
	}

	private initVerticalBar() {
		this.dataVB = [
			{
				name: 'Pen',
				value: 30,
			},
			{
				name: 'Book',
				value: 50,
			},
			{
				name: 'Table',
				value: 350,
			},
		];

		this.dataVBGroup = [
			{
				name: 'Gruop1',
				series: [
					{
						name: 'Pen',
						value: 30,
					},
					{
						name: 'Book',
						value: 50,
					},
					{
						name: 'Table',
						value: 350,
					},
				],
			},
			{
				name: 'Gruop2',
				series: [
					{
						name: 'Sky',
						value: 300,
					},
					{
						name: 'Dazn',
						value: 150,
					},
				],
			},
		];
	}
}

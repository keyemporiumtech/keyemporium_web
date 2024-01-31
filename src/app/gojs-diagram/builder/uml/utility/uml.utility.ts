import * as go from 'gojs';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { UmlModel } from '../model/uml.model';

export class UmlUtility {
	// -------- props
	static colorProperties: string = 'lightyellow';
	static colorMethods: string = 'lightyellow';

	static shapeEntity: ShapeModel = {
		type: EnumFigureType.ARROTONDATO,
		background: 'lightyellow',
	};

	static textStyleClassName: TextBlockModel = {
		font: 'bold 11pt Lato, Helvetica, Arial, sans-serif',
		textColor: '#000000',
	};
	static textStylePropertiesIntest: TextBlockModel = {
		font: 'italic 10pt sans-serif',
		textColor: '#000000',
	};
	static textStyleMethodsIntest: TextBlockModel = {
		font: 'italic 10pt sans-serif',
		textColor: '#000000',
	};

	// private, public, protected ...
	static textStylePropertyVisibility: TextBlockModel = {
		font: 'bold 10pt sans-serif',
		textColor: '#000000',
	};
	// int, string, String ...
	static textStylePropertyType: TextBlockModel = {
		font: 'bold 10pt sans-serif',
		textColor: '#000000',
	};
	static textStylePropertyName: TextBlockModel = {
		font: '10pt sans-serif',
		textColor: '#000000',
	};

	// private, public, protected ...
	static textStyleMethodVisibility: TextBlockModel = {
		font: 'bold 10pt sans-serif',
		textColor: '#000000',
	};
	// int, string, String ...
	static textStyleMethodType: TextBlockModel = {
		font: 'bold 10pt sans-serif',
		textColor: '#000000',
	};
	static textStyleMethodName: TextBlockModel = {
		font: '10pt sans-serif',
		textColor: '#000000',
	};

	static makeNodeTemplate() {
		const $ = go.GraphObject.make;

		return $(
			go.Node,
			'Auto',
			{
				locationSpot: go.Spot.Center,
				fromSpot: go.Spot.AllSides,
				toSpot: go.Spot.AllSides,
			},
			$(go.Shape, UmlUtility.shapeEntity.type, { fill: UmlUtility.shapeEntity.background }),
			$(
				go.Panel,
				'Table',
				{ defaultRowSeparatorStroke: 'black' },
				// header
				$(
					go.TextBlock,
					{
						row: 0,
						columnSpan: 2,
						margin: 3,
						alignment: go.Spot.Center,
						font: UmlUtility.textStyleClassName.font,
						stroke: UmlUtility.textStyleClassName.textColor,
						isMultiline: false,
						editable: true,
					},
					new go.Binding('text', 'name').makeTwoWay(),
				),
				// properties
				$(
					go.TextBlock,
					'Properties',
					{
						row: 1,
						font: UmlUtility.textStylePropertiesIntest.font,
						stroke: UmlUtility.textStylePropertiesIntest.textColor,
					},
					new go.Binding('visible', 'visible', (v) => !v).ofObject('PROPERTIES'),
				),
				$(go.Panel, 'Vertical', { name: 'PROPERTIES' }, new go.Binding('itemArray', 'properties'), {
					row: 1,
					margin: 3,
					stretch: go.GraphObject.Fill,
					defaultAlignment: go.Spot.Left,
					background: UmlUtility.colorProperties,
					itemTemplate: UmlUtility.propertyTemplate(),
				}),
				$(
					'PanelExpanderButton',
					'PROPERTIES',
					{ row: 1, column: 1, alignment: go.Spot.TopRight, visible: false },
					new go.Binding('visible', 'properties', (arr) => arr.length > 0),
				),
				// methods
				$(
					go.TextBlock,
					'Methods',
					{
						row: 2,
						font: UmlUtility.textStyleMethodsIntest.font,
						stroke: UmlUtility.textStyleMethodsIntest.textColor,
					},
					new go.Binding('visible', 'visible', (v) => !v).ofObject('METHODS'),
				),
				$(go.Panel, 'Vertical', { name: 'METHODS' }, new go.Binding('itemArray', 'methods'), {
					row: 2,
					margin: 3,
					stretch: go.GraphObject.Fill,
					defaultAlignment: go.Spot.Left,
					background: UmlUtility.colorMethods,
					itemTemplate: UmlUtility.methodTemplate(),
				}),
				$(
					'PanelExpanderButton',
					'METHODS',
					{ row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
					new go.Binding('visible', 'methods', (arr) => arr.length > 0),
				),
			),
		);
	}

	static makeComponents(classes: UmlModel[]): { nodes; links } {
		const linksDef: any[] = [];
		let entity: any;
		let link: any;

		classes.forEach((el) => {
			if (el.extends) {
				entity = classes.find((rel) => rel.name === el.extends);
				link = {
					from: el.key,
					to: entity.key,
				};
				linksDef.push(link);
			}
			if (el.properties && el.properties.length) {
				el.properties.forEach((prop) => {
					if (prop.isForeign) {
						entity = classes.find((rel) => rel.name === prop.type);
						link = {
							from: el.key,
							to: entity.key,
							relationship: 'Association',
						};
						linksDef.push(link);
					}
				});
			}
		});

		return {
			nodes: classes,
			links: linksDef,
		};
	}

	// ----------- functions

	static convertVisibility(v) {
		switch (v) {
			case 'public':
				return '+';
			case 'private':
				return '-';
			case 'protected':
				return '#';
			case 'package':
				return '~';
			default:
				return v;
		}
	}

	static linkStyle() {
		return { isTreeLink: false, fromEndSegmentLength: 0, toEndSegmentLength: 0 };
	}

	// ----------- utils

	static propertyTemplate() {
		const $ = go.GraphObject.make;
		return $(
			go.Panel,
			'Horizontal',
			// property visibility/access
			$(
				go.TextBlock,
				{
					isMultiline: false,
					editable: false,
					width: 12,
					font: UmlUtility.textStylePropertyVisibility.font,
					stroke: UmlUtility.textStylePropertyVisibility.textColor,
				},
				new go.Binding('text', 'visibility', UmlUtility.convertVisibility),
			),
			// property name, underlined if scope=="class" to indicate static property
			$(
				go.TextBlock,
				{
					isMultiline: false,
					editable: true,
					font: UmlUtility.textStylePropertyName.font,
					stroke: UmlUtility.textStylePropertyName.textColor,
				},
				new go.Binding('text', 'name').makeTwoWay(),
				new go.Binding('isUnderline', 'scope', (s) => s[0] === 'c'),
			),
			// property type, if known
			$(
				go.TextBlock,
				{
					font: UmlUtility.textStylePropertyType.font,
					stroke: UmlUtility.textStylePropertyType.textColor,
				},
				new go.Binding('text', 'type', (t) => (t ? ': ' : '')),
			),
			$(
				go.TextBlock,
				{
					isMultiline: false,
					editable: true,
					font: UmlUtility.textStylePropertyType.font,
					stroke: UmlUtility.textStylePropertyType.textColor,
				},
				new go.Binding('text', 'type').makeTwoWay(),
			),
			// property default value, if any
			$(
				go.TextBlock,
				{
					isMultiline: false,
					editable: false,
					font: UmlUtility.textStylePropertyType.font,
					stroke: UmlUtility.textStylePropertyType.textColor,
				},
				new go.Binding('text', 'default', (s) => (s ? ' = ' + s : '')),
			),
		);
	}

	static methodTemplate() {
		const $ = go.GraphObject.make;
		return $(
			go.Panel,
			'Horizontal',
			// method visibility/access
			$(
				go.TextBlock,
				{
					isMultiline: false,
					editable: false,
					width: 12,
					font: UmlUtility.textStyleMethodVisibility.font,
					stroke: UmlUtility.textStyleMethodVisibility.textColor,
				},
				new go.Binding('text', 'visibility', UmlUtility.convertVisibility),
			),
			// method name, underlined if scope=="class" to indicate static method
			$(
				go.TextBlock,
				{
					isMultiline: false,
					editable: true,
					font: UmlUtility.textStyleMethodName.font,
					stroke: UmlUtility.textStyleMethodName.textColor,
				},
				new go.Binding('text', 'name').makeTwoWay(),
				new go.Binding('isUnderline', 'scope', (s) => s[0] === 'c'),
			),
			// method parameters
			$(
				go.TextBlock,
				{
					font: UmlUtility.textStyleMethodName.font,
					stroke: UmlUtility.textStyleMethodName.textColor,
				},
				// this does not permit adding/editing/removing of parameters via inplace edits
				new go.Binding('text', 'parameters', (parr) => {
					var s = '(';
					for (var i = 0; i < parr.length; i++) {
						var param = parr[i];
						if (i > 0) s += ', ';
						s += param.name + ': ' + param.type;
					}
					return s + ')';
				}),
			),
			// method return type, if any
			$(
				go.TextBlock,
				{
					font: UmlUtility.textStyleMethodType.font,
					stroke: UmlUtility.textStyleMethodType.textColor,
				},
				new go.Binding('text', 'type', (t) => (t ? ': ' : '')),
			),
			$(
				go.TextBlock,
				{
					isMultiline: false,
					editable: true,
					font: UmlUtility.textStyleMethodType.font,
					stroke: UmlUtility.textStyleMethodType.textColor,
				},
				new go.Binding('text', 'type').makeTwoWay(),
			),
		);
	}
}

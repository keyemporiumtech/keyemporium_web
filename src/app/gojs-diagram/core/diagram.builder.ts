import * as go from 'gojs';
import { ColorBrushModel } from './model/color-brush.model';

export class DiagramBuilder {
	static makerInstance() {
		return go.GraphObject.make;
	}
	static makeDiagram(): go.Diagram {
		const $ = go.GraphObject.make;
		const dia = $(go.Diagram, {
			'undoManager.isEnabled': true,
		});
		return dia;
	}

	static makeModel(): go.GraphLinksModel {
		return new go.GraphLinksModel({
			nodeKeyProperty: 'key',
			linkToPortIdProperty: 'toPort',
			linkFromPortIdProperty: 'fromPort',
			linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksMode
		});
	}

	static makeNode(type: 'Auto' | 'Vertical' | 'Horizontal' | undefined, init?: any): go.Node {
		return new go.Node(type, init).bind('location', 'position', go.Point.parse);
	}

	static makeNodePicture(
		type: 'Auto' | 'Vertical' | 'Horizontal' | undefined,
		init?: any,
	): go.Node {
		return new go.Node(type, init).bind('location', 'position', go.Point.parse).bind('background');
	}

	static makeGroup(type: 'Auto' | 'Vertical' | 'Horizontal' | undefined) {
		return new go.Group(type)
			.add(
				new go.Panel('Auto')
					.add(this.makeShape({ parameter1: 14 }))
					.add(new go.Placeholder({ padding: 25 })),
			)
			.add(
				this.makeText({
					font: 'Bold 12pt Sans-Serif',
					margin: new go.Margin(5, 5, 5, 5),
				}),
			);
	}

	static makePart(type: 'Auto' | 'Vertical' | 'Horizontal' | undefined, init?: any): go.Part {
		return new go.Part(type, init);
	}

	static makeShape(init?: any): go.Shape {
		return new go.Shape(init)
			.bind('width')
			.bind('height')
			.bind('fill', 'background') // binds the data.color to shape.fill
			.bind('figure', 'type')
			.bind('stroke', 'borderColor')
			.bind('strokeWidth', 'borderSize')
			.bind('strokeCap', 'borderCap')
			.bind('strokeJoin', 'borderJoin')
			.bind('margin');
	}

	static makeText(init?: any): go.TextBlock {
		return new go.TextBlock(init ? init : { margin: new go.Margin(5, 5, 5, 5) })
			.bind('font')
			.bind('choices', 'possibleValues')
			.bind('isMultiline', 'multiline')
			.bind('isStrikethrough', 'lineThrough')
			.bind('isUnderline', 'underline')
			.bind('spacingAbove', 'spacing')
			.bind('text')
			.bind('textAlign', 'textAlign')
			.bind('verticalAlignment')
			.bind('margin', 'textMargin');
	}

	static makeLink(init?: any): go.Link {
		return new go.Link(init ? init : { fromSpot: go.Spot.Left, toSpot: go.Spot.Right })
			.bind('curve')
			.bind('routing')
			.bind('fromSpot')
			.bind('toSpot')
			.add(
				new go.Shape({
					strokeWidth: 1.5,
				})
					.bind('stroke', 'color')
					.bind('strokeWidth', 'size'),
			)
			.add(
				new go.Shape({
					toArrow: 'Standard',
					scale: 1.5,
				})
					.bind('fill', 'arrowColor')
					.bind('scale', 'arrowSize'),
			)
			.add(new go.TextBlock().bind('text'));
	}

	static makePicture(init?: any): go.Picture {
		return new go.Picture(init)
			.bind('margin', 'imgMargin')
			.bind('width', 'imgWidth')
			.bind('height', 'imgHeight')
			.bind('source', 'img');
	}

	static makeSourcePicture(mimetype: string, content: string) {
		return 'data:' + mimetype + ';base64,' + content;
	}

	// specifics
	static makeButton(
		clickCallBack: (data: any) => any,
		shapeImage?: { icon: string; props?: any },
		text?: string,
	): go.Adornment {
		const $ = go.GraphObject.make;
		let element: any;
		if (shapeImage && !text) {
			element = $('Button', $(go.Shape, shapeImage.icon, shapeImage.props));
		} else if (!shapeImage && text) {
			element = $(go.TextBlock, text);
		} else if (shapeImage && text) {
			element = $(
				go.Panel,
				'Table',
				{ margin: 3 },
				$(go.RowColumnDefinition, { column: 2, separatorPadding: 3 }),
				$('Button', { row: 0, column: 0 }, $(go.Shape, shapeImage.icon, shapeImage.props)),
				$(go.TextBlock, { row: 0, column: 1, margin: 3 }, text),
			);
		} else {
			element = $(go.TextBlock, 'NONE');
		}
		return $('ContextMenuButton', element, {
			click: (e, button) => {
				const task = (button.part as any).adornedPart;
				clickCallBack(task.data);
			},
		});
	}

	static makeContextMenu(buttons: go.Adornment[]) {
		const $ = go.GraphObject.make;
		return $('ContextMenu', ...buttons);
	}

	static makePort(name: string, align: go.Spot, spot: go.Spot, output: boolean, input: boolean) {
		var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
		// the port is basically just a transparent rectangle that stretches along the side of the node,
		// and becomes colored when the mouse passes over it
		const $ = go.GraphObject.make;
		return $(go.Shape, {
			fill: 'transparent', // changed to a color in the mouseEnter event handler
			strokeWidth: 0, // no stroke
			width: horizontal ? NaN : 8, // if not stretching horizontally, just 8 wide
			height: !horizontal ? NaN : 8, // if not stretching vertically, just 8 tall
			alignment: align, // align the port on the main Shape
			stretch: horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical,
			portId: name, // declare this object to be a "port"
			fromSpot: spot, // declare where links may connect at this port
			fromLinkable: output, // declare whether the user may draw links from here
			toSpot: spot, // declare where links may connect at this port
			toLinkable: input, // declare whether the user may draw links to here
			cursor: 'pointer', // show a different cursor to indicate potential link point
		});
	}

	// brush
	static makeColorBrush(brush: ColorBrushModel): go.Brush {
		const $ = go.GraphObject.make;
		return $(go.Brush, 'Linear', { 0: brush.colorStart, 1: brush.colorEnd });
	}

	static makeColorsBrush(brushes: ColorBrushModel[]): Map<string, go.Brush> {
		const map = new Map<string, go.Brush>();
		brushes.forEach((el) => {
			map.set(el.name, DiagramBuilder.makeColorBrush(el));
		});
		return map;
	}
}

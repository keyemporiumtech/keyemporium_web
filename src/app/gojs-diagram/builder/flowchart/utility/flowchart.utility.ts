import * as go from 'gojs';
import { LinkModel } from '../../../core/model/link.model';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';

export class FlowchartUtility {
	// ----------- props
	static textStyle: TextBlockModel = {
		font: 'bold 11pt Lato, Helvetica, Arial, sans-serif',
		textColor: '#F8F8F8',
	};

	static shapeStart: ShapeModel = {
		type: EnumFigureType.CERCHIO,
		background: '#282c34',
		borderColor: '#09d3ac',
		borderSize: 3.5,
		defaultText: 'Start',
	};

	static shapeConditional: ShapeModel = {
		type: EnumFigureType.ROMBO,
		background: '#282c34',
		borderColor: '#00A9C9',
		borderSize: 3.5,
		defaultText: 'If/Else',
	};

	static shapeStep: ShapeModel = {
		type: EnumFigureType.RETTANGOLO,
		background: '#282c34',
		borderColor: '#00A9C9',
		borderSize: 3.5,
		defaultText: 'Step',
	};
	static shapeEnd: ShapeModel = {
		type: EnumFigureType.CERCHIO,
		background: '#282c34',
		borderColor: '#DC3C00',
		borderSize: 3.5,
		defaultText: 'End',
	};
	static shapeComment: ShapeModel = {
		type: EnumFigureType.FILE,
		background: '#282c34',
		borderColor: '#DEE0A3',
		borderSize: 3,
		defaultText: 'Comment',
	};

	static textConditionalLink: TextBlockModel = {
		defaultText: 'Yes',
		textAlign: 'center',
		font: '10pt helvetica, arial, sans-serif',
		textColor: '#333333',
	};
	static shapeConditionalLink: ShapeModel = {
		type: EnumFigureType.ARROTONDATO,
		background: '#F8F8F8',
		borderSize: 0,
	};

	// static highlightPortColor = 'rgba(30,144,255,0.2)';
	static highlightPortColor = 'red';

	static linkHighlight: LinkModel = {
		linkColor: 'gray',
		highlightColor: 'dodgerblue',
		arrowColor: 'gray',
		arrowType: 'standard',
		arrowSize: 0,
	};

	static makeFigures(myDiagram: go.Diagram) {
		// define the Node templates for regular nodes
		const $ = go.GraphObject.make;
		myDiagram.nodeTemplateMap.add(
			'', // the default category
			$(
				go.Node,
				'Table',
				FlowchartUtility.nodeStyle(),
				// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
				$(
					go.Panel,
					'Auto',
					$(
						go.Shape,
						FlowchartUtility.shapeStep.type,
						{
							fill: FlowchartUtility.shapeStep.background,
							stroke: FlowchartUtility.shapeStep.borderColor,
							strokeWidth: FlowchartUtility.shapeStep.borderSize,
						},
						new go.Binding('figure', 'figure'),
					),
					$(
						go.TextBlock,
						{ font: FlowchartUtility.textStyle.font, stroke: FlowchartUtility.textStyle.textColor },
						{
							margin: 8,
							maxSize: new go.Size(160, NaN),
							wrap: go.TextBlock.WrapFit,
							editable: true,
						},
						new go.Binding('text').makeTwoWay(),
					),
				),
				// four named ports, one on each side:
				FlowchartUtility.makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
				FlowchartUtility.makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
				FlowchartUtility.makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
				FlowchartUtility.makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, false),
			),
		);

		myDiagram.nodeTemplateMap.add(
			'Conditional',
			$(
				go.Node,
				'Table',
				FlowchartUtility.nodeStyle(),
				// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
				$(
					go.Panel,
					'Auto',
					$(
						go.Shape,
						FlowchartUtility.shapeConditional.type,
						{
							fill: FlowchartUtility.shapeConditional.background,
							stroke: FlowchartUtility.shapeConditional.borderColor,
							strokeWidth: FlowchartUtility.shapeConditional.borderSize,
						},
						new go.Binding('figure', 'figure'),
					),
					$(
						go.TextBlock,
						{ font: FlowchartUtility.textStyle.font, stroke: FlowchartUtility.textStyle.textColor },
						{
							margin: 8,
							maxSize: new go.Size(160, NaN),
							wrap: go.TextBlock.WrapFit,
							editable: true,
						},
						new go.Binding('text').makeTwoWay(),
					),
				),
				// four named ports, one on each side:
				FlowchartUtility.makePort('T', go.Spot.Top, go.Spot.Top, false, true),
				FlowchartUtility.makePort('L', go.Spot.Left, go.Spot.Left, true, true),
				FlowchartUtility.makePort('R', go.Spot.Right, go.Spot.Right, true, true),
				FlowchartUtility.makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false),
			),
		);

		myDiagram.nodeTemplateMap.add(
			'Start',
			$(
				go.Node,
				'Table',
				FlowchartUtility.nodeStyle(),
				$(
					go.Panel,
					'Spot',
					$(go.Shape, FlowchartUtility.shapeStart.type, {
						desiredSize: new go.Size(70, 70),
						fill: FlowchartUtility.shapeStart.background,
						stroke: FlowchartUtility.shapeStart.borderColor,
						strokeWidth: FlowchartUtility.shapeStart.borderSize,
					}),
					$(
						go.TextBlock,
						FlowchartUtility.shapeStart.defaultText,
						{ font: FlowchartUtility.textStyle.font, stroke: FlowchartUtility.textStyle.textColor },
						new go.Binding('text'),
					),
				),
				// three named ports, one on each side except the top, all output only:
				FlowchartUtility.makePort('L', go.Spot.Left, go.Spot.Left, true, false),
				FlowchartUtility.makePort('R', go.Spot.Right, go.Spot.Right, true, false),
				FlowchartUtility.makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false),
			),
		);

		myDiagram.nodeTemplateMap.add(
			'End',
			$(
				go.Node,
				'Table',
				FlowchartUtility.nodeStyle(),
				$(
					go.Panel,
					'Spot',
					$(go.Shape, FlowchartUtility.shapeEnd.type, {
						desiredSize: new go.Size(60, 60),
						fill: FlowchartUtility.shapeEnd.background,
						stroke: FlowchartUtility.shapeEnd.borderColor,
						strokeWidth: FlowchartUtility.shapeEnd.borderSize,
					}),
					$(
						go.TextBlock,
						FlowchartUtility.shapeEnd.defaultText,
						{ font: FlowchartUtility.textStyle.font, stroke: FlowchartUtility.textStyle.textColor },
						new go.Binding('text'),
					),
				),
				// three named ports, one on each side except the bottom, all input only:
				FlowchartUtility.makePort('T', go.Spot.Top, go.Spot.Top, false, true),
				FlowchartUtility.makePort('L', go.Spot.Left, go.Spot.Left, false, true),
				FlowchartUtility.makePort('R', go.Spot.Right, go.Spot.Right, false, true),
			),
		);

		// taken from ../extensions/Figures.js:
		go.Shape.defineFigureGenerator('File', (shape, w, h) => {
			var geo = new go.Geometry();
			var fig = new go.PathFigure(0, 0, true); // starting point
			geo.add(fig);
			fig.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0));
			fig.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
			fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
			fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
			var fig2 = new go.PathFigure(0.75 * w, 0, false);
			geo.add(fig2);
			// The Fold
			fig2.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0.25 * h));
			fig2.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
			geo.spot1 = new go.Spot(0, 0.25);
			geo.spot2 = go.Spot.BottomRight;
			return geo;
		});

		myDiagram.nodeTemplateMap.add(
			'Comment',
			$(
				go.Node,
				'Auto',
				FlowchartUtility.nodeStyle(),
				$(go.Shape, FlowchartUtility.shapeComment.type, {
					fill: FlowchartUtility.shapeComment.background,
					stroke: FlowchartUtility.shapeComment.borderColor,
					strokeWidth: FlowchartUtility.shapeComment.borderSize,
				}),
				$(
					go.TextBlock,
					{ font: FlowchartUtility.textStyle.font, stroke: FlowchartUtility.textStyle.textColor },
					{
						margin: 8,
						maxSize: new go.Size(200, NaN),
						wrap: go.TextBlock.WrapFit,
						textAlign: 'center',
						editable: true,
					},
					new go.Binding('text').makeTwoWay(),
				),
				// no ports, because no links are allowed to connect with a comment
			),
		);
	}

	// --- utils
	static animateFadeDown(e) {
		var diagram = e.diagram;
		var animation = new go.Animation();
		animation.isViewportUnconstrained = true; // So Diagram positioning rules let the animation start off-screen
		animation.easing = go.Animation.EaseOutExpo;
		animation.duration = 900;
		// Fade "down", in other words, fade in from above
		animation.add(diagram, 'position', diagram.position.copy().offset(0, 200), diagram.position);
		animation.add(diagram, 'opacity', 0, 1);
		animation.start();
	}

	static showLinkLabel(e) {
		var label = e.subject.findObject('LABEL');
		if (label !== null) label.visible = e.subject.fromNode.data.category === 'Conditional';
	}

	static nodeStyle() {
		return [
			// The Node.location comes from the "loc" property of the node data,
			// converted by the Point.parse static method.
			// If the Node.location is changed, it updates the "loc" property of the node data,
			// converting back using the Point.stringify static method.
			new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
			{
				// the Node.location is at the center of each node
				locationSpot: go.Spot.Center,
			},
		];
	}

	static makePort(name, align, spot, output, input) {
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
			mouseEnter: (e, port) => {
				// the PORT argument will be this Shape
				if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)';
			},
			mouseLeave: (e, port) => (port.fill = 'transparent'),
		});
	}
}
